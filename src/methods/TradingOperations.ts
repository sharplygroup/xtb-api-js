import { WebSocketManager } from "../utils/WebSocketManager";
import { ITradeTransactionResponse } from "../interfaces";

export class TradingOperations {
  constructor(private readonly wsManager: WebSocketManager) {}

  /**
   * Starts trade transaction.
   * @param {any} tradeTransInfo - TRADE_TRANS_INFO
   * @returns {Promise<ITradeTransactionResponse>}
   */
  async tradeTransaction(tradeTransInfo: any): Promise<ITradeTransactionResponse> {
    const response = (await this.wsManager.sendCommand({
      command: "tradeTransaction",
      arguments: {
        tradeTransInfo: tradeTransInfo,
      },
    })) as ITradeTransactionResponse;

    if (!response.status || !response.returnData) {
      throw new Error(response.errorDescr || "Failed to start trade transaction");
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
  async tradeTransactionStatus(order: number): Promise<any> {
    const response = await this.wsManager.sendCommand({
      command: "tradeTransactionStatus",
      arguments: {
        order: order,
      },
    });

    if (!response.status || !response.returnData) {
      throw new Error(response.errorDescr || "Failed to get trade transaction status");
    }

    return {
      status: response.status,
      returnData: response.returnData,
    };
  }
}