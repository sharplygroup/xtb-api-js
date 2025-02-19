import { WebSocketManager } from "../utils/WebSocketManager";
import { IAccountDataResponse, IMarginLevelResponse } from "../interfaces";

export class AccountOperations {
  constructor(private readonly wsManager: WebSocketManager) {}

  /**
   * Returns information about account currency, and account leverage.
   * @returns {Promise<IAccountDataResponse>}
   */
  async getCurrentUserData(): Promise<IAccountDataResponse> {
    const response = (await this.wsManager.sendCommand({
      command: "getCurrentUserData",
      arguments: {},
    })) as IAccountDataResponse;

    if (!response.status || !response.returnData) {
      throw new Error(response.errorDescr || "Failed to get current user data");
    }

    return {
      status: response.status,
      returnData: response.returnData,
    };
  }

  /**
   * Returns various account indicators.
   * @returns {Promise<IMarginLevelResponse>}
   */
  async getMarginLevel(): Promise<IMarginLevelResponse> {
    const response = (await this.wsManager.sendCommand({
      command: "getMarginLevel",
      arguments: {},
    })) as IMarginLevelResponse;

    if (!response.status || !response.returnData) {
      throw new Error(response.errorDescr || "Failed to get margin level");
    }

    return {
      status: response.status,
      returnData: response.returnData,
    };
  }
}
