import { WebSocketManager } from '../utils/WebSocketManager';
import { IAccountDataResponse } from '../interfaces/IAccountDataResponse';
import { IMarginLevelResponse } from '../interfaces/IMarginLevelResponse';
import { IMarginTradeResponse } from '../interfaces/IMarginTradeResponse';
import { ICommissionResponse } from '../interfaces/ICommissionResponse';
import { IProfitCalculationResponse } from '../interfaces/IProfitCalculationResponse';

export class AccountOperations {
	constructor(private readonly wsManager: WebSocketManager) {}

	async getAccountData(): Promise<any> {
		const response = (await this.wsManager.sendCommand({
			command: 'getCurrentUserData',
		})) as IAccountDataResponse;

		if (!response.status || !response.returnData) {
			throw new Error(response.errorDescr || 'Failed to get account data');
		}

		return response.returnData;
	}

	async getMarginLevel(): Promise<any> {
		const response = (await this.wsManager.sendCommand({
			command: 'getMarginLevel',
		})) as IMarginLevelResponse;

		if (!response.status || !response.returnData) {
			throw new Error(response.errorDescr || 'Failed to get margin level');
		}

		return response.returnData;
	}

	async getMarginTrade(symbol: string, volume: number): Promise<any> {
		const response = (await this.wsManager.sendCommand({
			command: 'getMarginTrade',
			arguments: {
				symbol,
				volume,
			},
		})) as IMarginTradeResponse;

		if (!response.status || !response.returnData) {
			throw new Error(response.errorDescr || 'Failed to get margin trade');
		}

		return { margin: response.returnData.margin };
	}

	async getCommission(symbol: string, volume: number): Promise<any> {
		const response = (await this.wsManager.sendCommand({
			command: 'getCommissionDef',
			arguments: {
				symbol,
				volume,
			},
		})) as ICommissionResponse;

		if (!response.status || !response.returnData) {
			throw new Error(response.errorDescr || 'Failed to get commission');
		}

		return {
			commission: response.returnData.commission,
			rateOfExchange: response.returnData.rateOfExchange,
		};
	}

	async calculateProfit(
		symbol: string,
		volume: number,
		openPrice: number,
		closePrice: number,
		cmd: number,
	): Promise<any> {
		const response = (await this.wsManager.sendCommand({
			command: 'getProfitCalculation',
			arguments: {
				closePrice,
				cmd,
				openPrice,
				symbol,
				volume,
			},
		})) as IProfitCalculationResponse;

		if (!response.status || !response.returnData) {
			throw new Error(response.errorDescr || 'Failed to calculate profit');
		}

		return { profit: response.returnData.profit };
	}
}
