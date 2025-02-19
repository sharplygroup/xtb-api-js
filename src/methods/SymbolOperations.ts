import { WebSocketManager } from "../utils/WebSocketManager";
import { ISymbolsResponse, ISymbolResponse } from "../interfaces";

export class SymbolOperations {
  constructor(private readonly wsManager: WebSocketManager) {}

  /**
   * Returns array of all symbols available for the user.
   * @returns {Promise<ISymbolsResponse>}
   */
  async getAllSymbols(): Promise<ISymbolsResponse> {
    const response = (await this.wsManager.sendCommand({
      command: "getAllSymbols",
      arguments: {},
    })) as ISymbolsResponse;

    if (!response.status || !response.returnData) {
      throw new Error(response.errorDescr || "Failed to get all symbols");
    }

    return {
      status: response.status,
      returnData: response.returnData,
    };
  }

  /**
   * Returns information about symbol available for the user.
   * @param {string} symbol - Symbol name
   * @returns {Promise<ISymbolResponse>}
   */
  async getSymbol(symbol: string): Promise<ISymbolResponse> {
    const response = (await this.wsManager.sendCommand({
      command: "getSymbol",
      arguments: {
        symbol: symbol,
      },
    })) as ISymbolResponse;

    if (!response.status || !response.returnData) {
      throw new Error(response.errorDescr || `Failed to get symbol ${symbol}`);
    }

    return {
      status: response.status,
      returnData: response.returnData,
    };
  }
}