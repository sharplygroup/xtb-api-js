import { WebSocketManager } from '../utils/WebSocketManager';
import { ITradeTransactionResponse } from '../interfaces/ITradeTransactionResponse';
import { ITradeStatusResponse, ITradeStatusData } from '../interfaces/ITradeStatusResponse';
import { ITradesResponse } from '../interfaces/ITradesResponse';

export interface ITradeInfo {
  cmd: number;
  symbol: string;
  volume: number;
  price: number;
  type: number;
  [key: string]: any; // Allow additional properties
}

export class TradingOperations {
	constructor(private readonly wsManager: WebSocketManager) {}

	async handleTradeTransaction(tradeInfo: ITradeInfo): Promise<ITradeStatusData> {
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
	): Promise<ITradeStatusData> {
		const tradeInfo: ITradeInfo = {
			cmd,
			symbol,
			volume,
			price,
			type: 0, // Open
			...additionalFields,
		};

		return this.handleTradeTransaction(tradeInfo);
	}

	async closeTrade(order: number): Promise<ITradeStatusData> {
		const tradeInfo: ITradeInfo = {
			cmd: 0, // The original command will be determined by the server
			order,
			type: 2, // Close
      symbol: "",
      volume: 0,
      price: 0,
		};

		return this.handleTradeTransaction(tradeInfo);
	}

	async getTrades(): Promise<{ trades: any }> {
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
