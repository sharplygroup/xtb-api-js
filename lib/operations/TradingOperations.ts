import { WebSocketManager } from '../utils/WebSocketManager';
import { ITradeTransactionResponse } from '../interfaces/ITradeTransactionResponse';
import { ITradeStatusResponse } from '../interfaces/ITradeStatusResponse';
import { ITradesResponse } from '../interfaces/ITradesResponse';

export class TradingOperations {
	constructor(private readonly wsManager: WebSocketManager) {}

	async handleTradeTransaction(tradeInfo: any): Promise<any> {
		const tradeResponse = (await this.wsManager.sendCommand({
			command: 'tradeTransaction',
			arguments: {
				tradeTransInfo: tradeInfo,
			},
		})) as ITradeTransactionResponse;

		if (!tradeResponse.status || !tradeResponse.returnData) {
			throw new Error(tradeResponse.errorDescr || 'Failed to process trade transaction');
		}

		// Get trade status
		const statusResponse = (await this.wsManager.sendCommand({
			command: 'tradeTransactionStatus',
			arguments: {
				order: tradeResponse.returnData.order,
			},
		})) as ITradeStatusResponse;

		if (!statusResponse.status || !statusResponse.returnData) {
			throw new Error(statusResponse.errorDescr || 'Failed to get trade status');
		}

		return statusResponse.returnData;
	}

	async openTrade(
		symbol: string,
		cmd: number,
		volume: number,
		price: number,
		additionalFields: any,
	): Promise<any> {
		const tradeInfo = {
			cmd,
			symbol,
			volume,
			price,
			type: 0, // Open
			...additionalFields,
		};

		return this.handleTradeTransaction(tradeInfo);
	}

	async closeTrade(order: number): Promise<any> {
		const tradeInfo = {
			cmd: 0, // The original command will be determined by the server
			order,
			type: 2, // Close
		};

		return this.handleTradeTransaction(tradeInfo);
	}

	async getTrades(): Promise<any> {
		const tradesResponse = (await this.wsManager.sendCommand({
			command: 'getTrades',
			arguments: {
				openedOnly: true,
			},
		})) as ITradesResponse;

		if (!tradesResponse.status || !tradesResponse.returnData) {
			throw new Error(tradesResponse.errorDescr || 'Failed to get trades');
		}

		return { trades: tradesResponse.returnData };
	}
}
