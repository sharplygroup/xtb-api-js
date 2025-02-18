import { WebSocketManager } from '../utils/WebSocketManager';

export class AdditionalOperations {
	constructor(private readonly wsManager: WebSocketManager) {}

	async getCalendar(): Promise<any> {
		const response = await this.wsManager.sendCommand({
			command: 'getCalendar',
			arguments: {}
		});

		return response;
	}

	async getServerTime(): Promise<any> {
		const response = await this.wsManager.sendCommand({
			command: 'getServerTime',
			arguments: {}
		});

		return response;
	}

	async getStepRules(): Promise<any> {
		const response = await this.wsManager.sendCommand({
			command: 'getStepRules',
			arguments: {}
		});

		return response;
	}

	async getVersion(): Promise<any> {
		const response = await this.wsManager.sendCommand({
			command: 'getVersion',
			arguments: {}
		});

		return response;
	}

	async getBalance(): Promise<void> {
		await this.wsManager.sendStreamCommand({
			command: 'getBalance',
			arguments: {}
		});
	}

	async getCandles(symbol: string): Promise<void> {
		await this.wsManager.sendStreamCommand({
			command: 'getCandles',
			symbol,
			arguments: {}
		});
	}

	async getKeepAlive(): Promise<void> {
		await this.wsManager.sendStreamCommand({
			command: 'getKeepAlive',
			arguments: {}
		});
	}

	async getNews(): Promise<void> {
		await this.wsManager.sendStreamCommand({
			command: 'getNews',
			arguments: {}
		});
	}

	async getProfits(): Promise<void> {
		await this.wsManager.sendStreamCommand({
			command: 'getProfits',
			arguments: {}
		});
	}

	async getTradeStatus(): Promise<void> {
		await this.wsManager.sendStreamCommand({
			command: 'getTradeStatus',
			arguments: {}
		});
	}

	async ping(): Promise<void> {
		await this.wsManager.sendStreamCommand({
			command: 'ping',
			arguments: {}
		});
	}
}
