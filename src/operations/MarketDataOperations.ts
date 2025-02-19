import { WebSocketManager } from "../utils/WebSocketManager";
import {
  IChartResponse,
  ITickPricesResponse,
  ITradingHoursResponse,
} from "../interfaces";

export class MarketDataOperations {
  constructor(private readonly wsManager: WebSocketManager) {}

  /**
   * Returns calendar with market events.
   * @returns {Promise<any>} // TODO: Create ICalendarResponse interface
   */
  async getCalendar(): Promise<any> {
    const response = await this.wsManager.sendCommand({
      command: "getCalendar",
      arguments: {},
    });

    if (!response.status || !response.returnData) {
      throw new Error(response.errorDescr || "Failed to get calendar");
    }

    return {
      status: response.status,
      returnData: response.returnData,
    };
  }

  /**
   * Returns chart info, from start date to the current time.
   * @param {any} info - CHART_LAST_INFO_RECORD
   * @returns {Promise<IChartResponse>}
   */
  async getChartLastRequest(info: any): Promise<IChartResponse> {
    const response = (await this.wsManager.sendCommand({
      command: "getChartLastRequest",
      arguments: {
        info: info,
      },
    })) as IChartResponse;

    if (!response.status || !response.returnData) {
      throw new Error(
        response.errorDescr || "Failed to get chart last request",
      );
    }

    return {
      status: response.status,
      returnData: response.returnData,
    };
  }

  /**
   * Returns chart info with data between given start and end dates.
   * @param {any} info - CHART_RANGE_INFO_RECORD
   * @returns {Promise<IChartResponse>}
   */
  async getChartRangeRequest(info: any): Promise<IChartResponse> {
    const response = (await this.wsManager.sendCommand({
      command: "getChartRangeRequest",
      arguments: {
        info: info,
      },
    })) as IChartResponse;

    if (!response.status || !response.returnData) {
      throw new Error(
        response.errorDescr || "Failed to get chart range request",
      );
    }

    return {
      status: response.status,
      returnData: response.returnData,
    };
  }

  /**
   * Returns array of current quotations for given symbols, only quotations that changed from given timestamp are returned.
   * @param {number} level - price level
   * @param {string[]} symbols - Array of symbol names (Strings)
   * @param {number} timestamp - The time from which the most recent tick should be looked for.
   * @returns {Promise<ITickPricesResponse>}
   */
  async getTickPrices(
    level: number,
    symbols: string[],
    timestamp: number,
  ): Promise<ITickPricesResponse> {
    const response = (await this.wsManager.sendCommand({
      command: "getTickPrices",
      arguments: {
        level: level,
        symbols: symbols,
        timestamp: timestamp,
      },
    })) as ITickPricesResponse;

    if (!response.status || !response.returnData) {
      throw new Error(response.errorDescr || "Failed to get tick prices");
    }

    return {
      status: response.status,
      returnData: response.returnData,
    };
  }

  /**
   * Returns quotes and trading times.
   * @param {string[]} symbols - Array of symbol names (Strings)
   * @returns {Promise<ITradingHoursResponse>}
   */
  async getTradingHours(symbols: string[]): Promise<ITradingHoursResponse> {
    const response = (await this.wsManager.sendCommand({
      command: "getTradingHours",
      arguments: {
        symbols: symbols,
      },
    })) as ITradingHoursResponse;

    if (!response.status || !response.returnData) {
      throw new Error(response.errorDescr || "Failed to get trading hours");
    }

    return {
      status: response.status,
      returnData: response.returnData,
    };
  }
}
