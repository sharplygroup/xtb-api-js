import { IWebSocketResponse } from '../utils/WebSocketManager';

export interface ITradeTransactionResponse extends IWebSocketResponse {
	returnData?: any & {
		order: number;
	};
}
