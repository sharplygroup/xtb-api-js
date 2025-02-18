import { IWebSocketResponse } from "../utils/WebSocketManager";

export interface IProfitCalculationResponse extends IWebSocketResponse {
  returnData?: {
    profit: number;
  };
}
