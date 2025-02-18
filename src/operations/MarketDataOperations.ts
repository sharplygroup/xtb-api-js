import { WebSocketManager } from "../utils/WebSocketManager";
import { ISymbolsResponse } from "../interfaces/ISymbolsResponse";

export class MarketDataOperations {
  constructor(private readonly wsManager: WebSocketManager) {}

  async getAllSymbols(): Promise<ISymbolsResponse> {
    const response = (await this.wsManager.sendCommand({
      command: "getAllSymbols",
      arguments: {},
    })) as ISymbolsResponse;

    return response;
  }
}
