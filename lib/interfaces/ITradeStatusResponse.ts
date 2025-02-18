import { IWebSocketResponse } from "../utils/WebSocketManager";

export interface ITradeStatusData {
  order: number;
  status: number;
  profit: number;
  // Add other properties as needed
}

export interface ITradeStatusResponse extends IWebSocketResponse {
  returnData?: ITradeStatusData;
}
