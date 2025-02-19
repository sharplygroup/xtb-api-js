import { WebSocketManager } from "../utils/WebSocketManager";
import { ITradesResponse } from "../interfaces";

export class TradeOperations {
  constructor(private readonly wsManager: WebSocketManager) {}

  /**
   * Returns array of user's trades.
   * @param {boolean} openedOnly - if true then only opened trades will be returned
   * @returns {Promise<ITradesResponse>}
   */
  async getTrades(openedOnly: boolean): Promise<ITradesResponse> {
    const response = (await this.wsManager.sendCommand({
      command: "getTrades",
      arguments: {
        openedOnly: openedOnly,
      },
    })) as ITradesResponse;

    if (!response.status || !response.returnData) {
      throw new Error(response.errorDescr || "Failed to get trades");
    }

    return {
      status: response.status,
      returnData: response.returnData,
    };
  }

  /**
   * Returns array of trades listed in `orders` argument.
   * @param {number[]} orders - Array of orders (position numbers)
   * @returns {Promise<ITradesResponse>}
   */
  async getTradeRecords(orders: number[]): Promise<ITradesResponse> {
    const response = (await this.wsManager.sendCommand({
      command: "getTradeRecords",
      arguments: {
        orders: orders,
      },
    })) as ITradesResponse;

    if (!response.status || !response.returnData) {
      throw new Error(response.errorDescr || "Failed to get trade records");
    }

    return {
      status: response.status,
      returnData: response.returnData,
    };
  }

  /**
   * Returns array of user's trades which were closed within specified period of time.
   * @param {number} end - Time, 0 means current time for simplicity
   * @param {number} start - Time, 0 means last month interval
   * @returns {Promise<ITradesResponse>}
   */
  async getTradesHistory(end: number, start: number): Promise<ITradesResponse> {
    const response = (await this.wsManager.sendCommand({
      command: "getTradesHistory",
      arguments: {
        end: end,
        start: start,
      },
    })) as ITradesResponse;

    if (!response.status || !response.returnData) {
      throw new Error(response.errorDescr || "Failed to get trades history");
    }

    return {
      status: response.status,
      returnData: response.returnData,
    };
  }

  /**
   * Returns current transaction status.
   * @param {number} order - order
   * @returns {Promise<any>} // TODO: Create ITradeStatusResponse interface
   */
  async getTradeStatus(order: number): Promise<any> {
    const response = await this.wsManager.sendCommand({
      command: "tradeTransactionStatus",
      arguments: {
        order: order,
      },
    });

    if (!response.status || !response.returnData) {
      throw new Error(response.errorDescr || "Failed to get trade status");
    }

    return {
      status: response.status,
      returnData: response.returnData,
    };
  }
}