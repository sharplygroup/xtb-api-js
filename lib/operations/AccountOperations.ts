import { WebSocketManager } from '../utils/WebSocketManager';
import { IAccountDataResponse } from '../interfaces/IAccountDataResponse';
import { IMarginLevelResponse } from '../interfaces/IMarginLevelResponse';

export class AccountOperations {
	constructor(private readonly wsManager: WebSocketManager) {}

	async getCurrentUserData(): Promise<IAccountDataResponse> {
		const response = (await this.wsManager.sendCommand({
			command: 'getCurrentUserData',
			arguments: {}
		})) as IAccountDataResponse;

		if (!response.status || !response.returnData) {
			throw new Error(response.errorDescr || 'Failed to get current user data');
		}

		return {
      status: response.status,
      returnData: response.returnData
    };
	}

	async getMarginLevel(): Promise<IMarginLevelResponse> {
		const response = (await this.wsManager.sendCommand({
			command: 'getMarginLevel',
			arguments: {}
		})) as IMarginLevelResponse;

		if (!response.status || !response.returnData) {
			throw new Error(response.errorDescr || 'Failed to get margin level');
		}

		return {
      status: response.status,
      returnData: response.returnData
    };
	}
}
