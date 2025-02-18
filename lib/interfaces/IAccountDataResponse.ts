import { IWebSocketResponse } from "../utils/WebSocketManager";

export interface IAccountDataResponse extends IWebSocketResponse {
  returnData?: {
    currency: string;
    leverage: number;
    leverageMultiplier: number;
    group: string;
    companyUnit: number;
    spreadType: string;
    ibAccount: boolean;
    trailingStop: boolean;
  };
}
