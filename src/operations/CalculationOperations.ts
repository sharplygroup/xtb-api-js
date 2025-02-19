import { WebSocketManager } from "../utils/WebSocketManager";
import {
  ICommissionResponse,
  IMarginTradeResponse,
  IProfitCalculationResponse,
} from "../interfaces";

export class CalculationOperations {
  constructor(private readonly wsManager: WebSocketManager) {}

  /**
   * Returns calculation of commission and rate of exchange.
   * @param {string} symbol - symbol
   * @param {number} volume - volume
   * @returns {Promise<ICommissionResponse>}
   */
  async getCommissionDef(
    symbol: string,
    volume: number,
  ): Promise<ICommissionResponse> {
    const response = (await this.wsManager.sendCommand({
      command: "getCommissionDef",
      arguments: {
        symbol: symbol,
        volume: volume,
      },
    })) as ICommissionResponse;

    if (!response.status || !response.returnData) {
      throw new Error(
        response.errorDescr || "Failed to get commission definition",
      );
    }

    return {
      status: response.status,
      returnData: response.returnData,
    };
  }

  /**
   * Returns expected margin for given instrument and volume.
   * @param {string} symbol - symbol
   * @param {number} volume - volume
   * @returns {Promise<IMarginTradeResponse>}
   */
  async getMarginTrade(
    symbol: string,
    volume: number,
  ): Promise<IMarginTradeResponse> {
    const response = (await this.wsManager.sendCommand({
      command: "getMarginTrade",
      arguments: {
        symbol: symbol,
        volume: volume,
      },
    })) as IMarginTradeResponse;

    if (!response.status || !response.returnData) {
      throw new Error(response.errorDescr || "Failed to get margin trade");
    }

    return {
      status: response.status,
      returnData: response.returnData,
    };
  }

  /**
   * Calculates estimated profit for given deal data.
   * @param {number} closePrice - theoretical close price of order
   * @param {number} cmd - Operation code
   * @param {number} openPrice - theoretical open price of order
   * @param {string} symbol - symbol
   * @param {number} volume - volume
   * @returns {Promise<IProfitCalculationResponse>}
   */
  async getProfitCalculation(
    closePrice: number,
    cmd: number,
    openPrice: number,
    symbol: string,
    volume: number,
  ): Promise<IProfitCalculationResponse> {
    const response = (await this.wsManager.sendCommand({
      command: "getProfitCalculation",
      arguments: {
        closePrice: closePrice,
        cmd: cmd,
        openPrice: openPrice,
        symbol: symbol,
        volume: volume,
      },
    })) as IProfitCalculationResponse;

    if (!response.status || !response.returnData) {
      throw new Error(
        response.errorDescr || "Failed to get profit calculation",
      );
    }

    return {
      status: response.status,
      returnData: response.returnData,
    };
  }
}
