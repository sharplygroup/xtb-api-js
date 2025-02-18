import { AccountOperations } from '../lib/operations/AccountOperations';
import { WebSocketManager } from '../lib/utils/WebSocketManager';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.e2e' });

describe('AccountOperations E2E Tests', () => {
  let wsManager: WebSocketManager;
  let accountOperations: AccountOperations;

  beforeEach(() => {
    const credentials = {
      userId: process.env.XTB_USERID || '',
      password: process.env.XTB_PASSWORD || '',
      demo: process.env.XTB_DEMO === 'true',
    };
    wsManager = new WebSocketManager(credentials);
    accountOperations = new AccountOperations(wsManager);
  });

  afterEach(async () => {
    await wsManager.disconnect();
  });

  it('should get current user data', async () => {
    await wsManager.connect();

    const userData = await accountOperations.getCurrentUserData();

    expect(userData).toBeDefined();
    expect(userData.status).toBe(true);
    expect(userData.returnData).toBeDefined();
  });

  it('should get margin level', async () => {
    await wsManager.connect();

    const marginLevel = await accountOperations.getMarginLevel();

    expect(marginLevel).toBeDefined();
    expect(marginLevel.status).toBe(true);
    expect(marginLevel.returnData).toBeDefined();
  });
});