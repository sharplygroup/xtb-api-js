import { WebSocketManager } from "../utils/WebSocketManager";

export class IbsOperations {
  constructor(private readonly wsManager: WebSocketManager) {}

  /**
   * Returns IBs data from the given time range.
   * @param {number} end - End of IBs history block
   * @param {number} start - Start of IBs history block
   * @returns {Promise<any>} // TODO: Create IIbsHistoryResponse interface
   */
  async getIbsHistory(end: number, start: number): Promise<any> {
    const response = await this.wsManager.sendCommand({
      command: "getIbsHistory",
      arguments: {
        end: end,
        start: start,
      },
    });

    if (!response.status || !response.returnData) {
      throw new Error(response.errorDescr || "Failed to get IBs history");
    }

    return {
      status: response.status,
      returnData: response.returnData,
    };
  }
}
