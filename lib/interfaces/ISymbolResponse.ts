import { IWebSocketResponse } from '../utils/WebSocketManager';

export interface ISymbolResponse extends IWebSocketResponse {
	returnData?: any;
}
