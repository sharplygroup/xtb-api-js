import { WebSocketManager } from '../utils/WebSocketManager';
import { ISymbolResponse } from '../interfaces/ISymbolResponse';
import { ISymbolsResponse } from '../interfaces/ISymbolsResponse';
import { IChartResponse } from '../interfaces/IChartResponse';
import { ITickPricesResponse } from '../interfaces/ITickPricesResponse';
import { ITradingHoursResponse } from '../interfaces/ITradingHoursResponse';

export class MarketDataOperations {
	constructor(private readonly wsManager: WebSocketManager) {}

	async getAllSymbols(): Promise<any> {
		const response = (await this.wsManager.sendCommand({
			command: 'getAllSymbols',
		})) as ISymbolsResponse;

		if (!response.status || !response.returnData) {
			throw new Error(response.errorDescr || 'Failed to get symbols');
		}

		return { symbols: response.returnData };
	}

	async getSymbol(symbol: string): Promise<any> {
		const response = (await this.wsManager.sendCommand({
			command: 'getSymbol',
			arguments: {
				symbol,
			},
		})) as ISymbolResponse;

		if (!response.status || !response.returnData) {
			throw new Error(response.errorDescr || 'Failed to get symbol');
		}

		return { symbolInfo: response.returnData };
	}

	async getChartData(symbol: string, period: number, start: string): Promise<any> {
		const response = (await this.wsManager.sendCommand({
			command: 'getChartLastRequest',
			arguments: {
				info: {
					period,
					start: new Date(start).getTime(),
					symbol,
				},
			},
		})) as IChartResponse;

		if (!response.status || !response.returnData) {
			throw new Error(response.errorDescr || 'Failed to get chart data');
		}

		return {
			digits: response.returnData.digits,
			candles: response.returnData.rateInfos,
		};
	}

	async getTickPrices(symbol: string): Promise<any> {
		const response = (await this.wsManager.sendCommand({
			command: 'getTickPrices',
			arguments: {
				level: 0,
				symbols: [symbol],
				timestamp: 0,
			},
		})) as ITickPricesResponse;

		if (!response.status || !response.returnData) {
			throw new Error(response.errorDescr || 'Failed to get tick prices');
		}

		return {
			data: {
				symbol,
				quotations: response.returnData.quotations,
			},
		};
	}

	async getTradingHours(symbol: string): Promise<any> {
		const response = (await this.wsManager.sendCommand({
			command: 'getTradingHours',
			arguments: {
				symbols: [symbol],
			},
		})) as ITradingHoursResponse;

		if (!response.status || !response.returnData) {
			throw new Error(response.errorDescr || 'Failed to get trading hours');
		}

		return {
			data: {
				symbol,
				hours: response.returnData,
			},
		};
	}
}
