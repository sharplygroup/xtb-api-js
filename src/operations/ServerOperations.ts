import { WebSocketManager } from "../utils/WebSocketManager";

export class ServerOperations {
  constructor(private readonly wsManager: WebSocketManager) {}

  /**
   * Returns current time on trading server.
   * @returns {Promise<any>} // TODO: Create IServerTimeResponse interface
   */
  async getServerTime(): Promise<any> {
    const response = await this.wsManager.sendCommand({
      command: "getServerTime",
      arguments: {},
    });

    if (!response.status || !response.returnData) {
      throw new Error(response.errorDescr || "Failed to get server time");
    }

    return {
      status: response.status,
      returnData: response.returnData,
    };
  }

  /**
   * Returns the current API version.
   * @returns {Promise<any>} // TODO: Create IVersionResponse interface
   */
  async getVersion(): Promise<any> {
    const response = await this.wsManager.sendCommand({
      command: "getVersion",
      arguments: {},
    });

    if (!response.status || !response.returnData) {
      throw new Error(response.errorDescr || "Failed to get version");
    }

    return {
      status: response.status,
      returnData: response.returnData,
    };
  }

  /**
   * Regularly calling this function is enough to refresh the internal state of all the components in the system.
   * @returns {Promise<void>}
   */
  async ping(): Promise<void> {
    const response = await this.wsManager.sendCommand({
      command: "ping",
      arguments: {},
    });

    if (!response.status) {
      throw new Error(response.errorDescr || "Ping failed");
    }
  }
}
