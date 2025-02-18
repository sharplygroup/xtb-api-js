import { TradingOperations } from '../lib/operations/TradingOperations';
import { WebSocketManager } from '../lib/utils/WebSocketManager';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.e2e' });

describe('TradingOperations E2E Tests', () => {
  let wsManager: WebSocketManager;
  let tradingOperations: TradingOperations;

  beforeEach(() => {
    const credentials = {
      userId: process.env.XTB_USERID || '',
      password: process.env.XTB_PASSWORD || '',
      demo: process.env.XTB_DEMO === 'true',
    };
    wsManager = new WebSocketManager(credentials);
    tradingOperations = new TradingOperations(wsManager);
  });

  afterEach(async () => {
    await wsManager.disconnect();
  });

  it('should handle trade transaction', async () => {
    await wsManager.connect();

    const tradeInfo = {
      cmd: 0,
      symbol: 'EURUSD',
      volume: 0.1,
      price: 1.1000,
      type: 0,
    };

    const response = await tradingOperations.handleTradeTransaction(tradeInfo);
    expect(response).toBeDefined();
    expect(response.order).toBeDefined();

    await wsManager.disconnect();
  });

  it('should open trade', async () => {
    await wsManager.connect();

    const response = await tradingOperations.openTrade('EURUSD', 0, 0.1, 1.1000, {});
    expect(response).toBeDefined();
    expect(response.order).toBeDefined();

    await wsManager.disconnect();
  });

  it.skip('should close trade', async () => {
      await wsManager.connect();
  
      const response = await tradingOperations.closeTrade(12345);
      expect(response).toBeDefined();
      expect(response.order).toBeDefined();
  
      await wsManager.disconnect();
    });

  it('should get trades', async () => {
    await wsManager.connect();

    const response = await tradingOperations.getTrades();
    expect(response).toBeDefined();
    expect(response.trades).toBeDefined();

    await wsManager.disconnect();
  });
});