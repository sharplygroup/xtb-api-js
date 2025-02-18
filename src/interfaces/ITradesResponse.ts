import { IWebSocketResponse } from "../utils/WebSocketManager";

export interface ITradesResponse extends IWebSocketResponse {
  returnData?: [];
}
