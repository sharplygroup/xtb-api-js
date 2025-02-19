import { WebSocketManager } from "../utils/WebSocketManager";

export class NewsOperations {
  constructor(private readonly wsManager: WebSocketManager) {}

  /**
   * Returns news from trading server which were sent within specified period of time.
   * @param {number} end - Time, 0 means current time for simplicity
   * @param {number} start - Time
   * @returns {Promise<any>} // TODO: Create INewsTopicResponse interface
   */
  async getNews(end: number, start: number): Promise<any> {
    const response = await this.wsManager.sendCommand({
      command: "getNews",
      arguments: {
        end: end,
        start: start,
      },
    });

    if (!response.status || !response.returnData) {
      throw new Error(response.errorDescr || "Failed to get news");
    }

    return {
      status: response.status,
      returnData: response.returnData,
    };
  }
}