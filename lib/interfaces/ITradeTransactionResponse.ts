import { IWebSocketResponse } from '../utils/WebSocketManager';

export interface ITradeTransactionData {
  order: number;
  // Add other properties as needed
}

export interface ITradeTransactionResponse extends IWebSocketResponse {
	returnData?: ITradeTransactionData;
}
