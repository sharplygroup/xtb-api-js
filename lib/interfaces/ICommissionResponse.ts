import { IWebSocketResponse } from "../utils/WebSocketManager";

export interface ICommissionResponse extends IWebSocketResponse {
  returnData?: {
    commission: number;
    rateOfExchange: number;
  };
}
