import { IWebSocketResponse } from "../utils/WebSocketManager";

export interface ITickPricesResponse extends IWebSocketResponse {
  returnData?: {
    quotations: number[];
  };
}
