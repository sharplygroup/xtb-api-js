import { WebSocketManager } from "../utils/WebSocketManager";

export class DmaOperations {
  constructor(private readonly wsManager: WebSocketManager) {}

  /**
   * Returns a list of step rules for DMAs.
   * @returns {Promise<any>} // TODO: Create IStepRulesResponse interface
   */
  async getStepRules(): Promise<any> {
    const response = await this.wsManager.sendCommand({
      command: "getStepRules",
      arguments: {},
    });

    if (!response.status || !response.returnData) {
      throw new Error(response.errorDescr || "Failed to get step rules");
    }

    return {
      status: response.status,
      returnData: response.returnData,
    };
  }
}
