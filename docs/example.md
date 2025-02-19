```typescript
export class AccountOperations {
  constructor(private readonly wsManager: WebSocketManager) {}

  async getCurrentUserData(): Promise<IAccountDataResponse> {
    const response = (await this.wsManager.sendCommand({
      command: "getCurrentUserData",
      arguments: {},
    })) as IAccountDataResponse;

    if (!response.status || !response.returnData) {
      throw new Error(response.errorDescr || "Failed to get current user data");
    }

    return {
      status: response.status,
      returnData: response.returnData,
    };
  }
}
```