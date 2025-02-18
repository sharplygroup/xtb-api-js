import WebSocket from 'ws';
import { IDataObject } from 'n8n-workflow';
import { XtbLoginError } from '../errors/XtbLoginError';
import { XtbConnectionError } from '../errors/XtbConnectionError';

export interface IXtbCredentials {
	userId: string;
	password: string;
	demo: boolean;
}

export interface IWebSocketResponse {
	status: boolean;
	returnData?: IDataObject | IDataObject[];
	errorCode?: string;
	errorDescr?: string;
	streamSessionId?: string;
}

export class WebSocketManager {
	private mainSocket: WebSocket | null = null;
	private streamSocket: WebSocket | null = null;
	private pingInterval: NodeJS.Timeout | null = null;
	private streamSessionId: string | null = null;

	public getStreamSessionId(): string | null {
		return this.streamSessionId;
	}

	private readonly credentials: IXtbCredentials;
	private readonly isDemo: boolean;

	constructor(credentials: IXtbCredentials) {
		this.credentials = credentials;
		this.isDemo = credentials.demo;
	}

	private getMainSocketUrl(): string {
		const host = 'wss://ws.xapi.pro';
		return this.isDemo ? `${host}/demo` : `${host}/real`;
	}

	private getStreamSocketUrl(): string {
		const host = 'wss://ws.xapi.pro';
		return this.isDemo ? `${host}/demoStream` : `${host}/realStream`;
	}

	public async connect(): Promise<void> {
		try {
			// Connect main socket
			const mainSocket = new WebSocket(this.getMainSocketUrl());
			this.mainSocket = mainSocket;
			await this.waitForConnection(mainSocket);

			// Login
			const loginResponse = await this.login();
			if (!loginResponse.status) {
				throw new XtbLoginError(
					loginResponse.errorDescr || 'Login failed',
					loginResponse.errorCode,
				);
			}

			this.streamSessionId = loginResponse.streamSessionId || null;

			// Connect stream socket if we have streamSessionId
			if (this.streamSessionId) {
				const streamSocket = new WebSocket(this.getStreamSocketUrl());
				this.streamSocket = streamSocket;
				await this.waitForConnection(streamSocket);
			}

			// Start ping interval
			this.startPingInterval();
		} catch (error) {
			await this.disconnect();
			throw error;
		}
	}

	private waitForConnection(socket: WebSocket): Promise<void> {
		return new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				reject(new XtbConnectionError('Connection timeout'));
			}, 30000);

			socket.once('open', () => {
				clearTimeout(timeout);
				resolve();
			});

			socket.once('error', (error) => {
				clearTimeout(timeout);
				reject(new XtbConnectionError(error.message));
			});
		});
	}

	private async login(): Promise<IWebSocketResponse> {
		const command = {
			command: 'login',
			arguments: {
				userId: this.credentials.userId,
				password: this.credentials.password,
			},
		};

		return this.sendCommand(command);
	}

	private startPingInterval(): void {
		// Send ping every 10 minutes to keep connection alive
		this.pingInterval = setInterval(
			async () => {
				try {
					await this.sendCommand({ command: 'ping' });
				} catch (error) {
					// Handle ping error - maybe reconnect
					console.error('Ping failed:', error);
				}
			},
			10 * 60 * 1000,
		); // 10 minutes
	}

	public async sendCommand(command: IDataObject): Promise<IWebSocketResponse> {
		if (!this.mainSocket || this.mainSocket.readyState !== 1) {
			// 1 = OPEN
			throw new Error('Main socket not connected');
		}

		return new Promise((resolve, reject) => {
			const timeout = setTimeout(() => {
				reject(new Error('Command timeout'));
			}, 30000);

			const messageHandler = (data: WebSocket.Data) => {
				try {
					const response = JSON.parse(data.toString()) as IWebSocketResponse;
					this.mainSocket?.removeListener('message', messageHandler);
					clearTimeout(timeout);
					resolve(response);
				} catch (error) {
					this.mainSocket?.removeListener('message', messageHandler);
					clearTimeout(timeout);
					reject(error);
				}
			};

			if (this.mainSocket) {
				this.mainSocket.on('message', messageHandler);
				this.mainSocket.send(JSON.stringify(command));
			} else {
				reject(new Error('Socket is not initialized'));
			}
		});
	}

	public async sendStreamCommand(command: IDataObject): Promise<void> {
		if (!this.streamSocket || this.streamSocket.readyState !== 1) {
			// 1 = OPEN
			throw new Error('Stream socket not connected');
		}

		if (!this.streamSessionId) {
			throw new Error('No stream session ID available');
		}

		const streamCommand = {
			...command,
			streamSessionId: this.streamSessionId,
		};

		this.streamSocket.send(JSON.stringify(streamCommand));
	}

	public onStreamMessage(callback: (data: IDataObject) => void): void {
		if (!this.streamSocket) {
			throw new Error('Stream socket not connected');
		}

		this.streamSocket.on('message', (data: WebSocket.Data) => {
			try {
				const message = JSON.parse(data.toString());
				callback(message);
			} catch (error) {
				console.error('Error parsing stream message:', error);
			}
		});
	}

	public async disconnect(): Promise<void> {
		if (this.pingInterval) {
			clearInterval(this.pingInterval);
			this.pingInterval = null;
		}

		if (this.mainSocket) {
			try {
				await this.sendCommand({ command: 'logout' });
			} catch (error) {
				// Ignore logout errors
			}
			this.mainSocket.close();
			this.mainSocket = null;
		}

		if (this.streamSocket) {
			this.streamSocket.close();
			this.streamSocket = null;
		}

		this.streamSessionId = null;
	}
}
