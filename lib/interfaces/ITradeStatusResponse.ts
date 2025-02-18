import { IWebSocketResponse } from '../utils/WebSocketManager';

export interface ITradeStatusResponse extends IWebSocketResponse {
	returnData?: any;
}
