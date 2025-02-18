import { IWebSocketResponse } from "../utils/WebSocketManager";

export interface IMarginTradeResponse extends IWebSocketResponse {
  returnData?: {
    margin: number;
  };
}
