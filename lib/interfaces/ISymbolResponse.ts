import { IWebSocketResponse } from "../utils/WebSocketManager";

export interface ISymbolData {
  symbol: string;
  description: string;
  // Add other properties as needed
}

export interface ISymbolResponse extends IWebSocketResponse {
  returnData?: ISymbolData;
}
