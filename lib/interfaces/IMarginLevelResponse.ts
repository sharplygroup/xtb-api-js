import { IWebSocketResponse } from '../utils/WebSocketManager';

export interface IMarginLevelResponse extends IWebSocketResponse {
	returnData?: {
		balance: number;
		equity: number;
		margin: number;
		margin_free: number;
		margin_level: number;
		credit: number;
		currency: string;
	};
}
