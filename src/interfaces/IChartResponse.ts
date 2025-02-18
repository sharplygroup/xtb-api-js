import { IWebSocketResponse } from "../utils/WebSocketManager";

export interface IChartResponse extends IWebSocketResponse {
  returnData?: {
    digits: number;
    rateInfos: [];
  };
}
