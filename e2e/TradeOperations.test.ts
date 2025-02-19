import { TradeOperations } from "../src/operations/TradeOperations";
import { TradingOperations } from "../src/operations/TradingOperations";
import { WebSocketManager } from "../src/utils/WebSocketManager";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.e2e" });

describe("TradeOperations E2E Tests", () => {
  let wsManager: WebSocketManager;
  let tradeOperations: TradeOperations;

  beforeEach(() => {
    const userId = process.env.XTB_USERID || "";
    const password = process.env.XTB_PASSWORD || "";
    const demo = process.env.XTB_DEMO === "true";

    if (!userId || !password) {
      throw new Error(
        "XTB_USERID and XTB_PASSWORD must be defined in .env.e2e",
      );
    }

    const credentials = {
      userId: userId,
      password: password,
      demo: demo,
    };
    wsManager = new WebSocketManager(credentials);
    tradeOperations = new TradeOperations(wsManager);
  });

  afterEach(async () => {
    await wsManager.disconnect();
  });

  it("should get trades", async () => {
    await wsManager.connect();

    const openedOnly = true;
    const trades = await tradeOperations.getTrades(openedOnly);

    expect(trades).toBeDefined();
    expect(trades.status).toBe(true);
    expect(trades.returnData).toBeDefined();
  });

  it("should get trade records", async () => {
    await wsManager.connect();

    const orders = [7489839, 7489841]; // Replace with actual order numbers
    const tradeRecords = await tradeOperations.getTradeRecords(orders);

    expect(tradeRecords).toBeDefined();
    expect(tradeRecords.status).toBe(true);
    expect(tradeRecords.returnData).toBeDefined();
  });

  it("should get trades history", async () => {
    await wsManager.connect();

    const end = 0; // Current time
    const start = Date.now() - 30 * 24 * 60 * 60 * 1000; // Last month
    const tradesHistory = await tradeOperations.getTradesHistory(end, start);

    expect(tradesHistory).toBeDefined();
    expect(tradesHistory.status).toBe(true);
    expect(tradesHistory.returnData).toBeDefined();
  });

  it("should get trade status", async () => {
    await wsManager.connect();

    // First, start a trade transaction to get an order number
    const tradingOperations = new TradingOperations(wsManager);
    const tradeTransInfo = {
      cmd: 0, // BUY
      symbol: "EURUSD",
      volume: 0.1,
      type: 0, // OPEN
      price: 1.1,
    };
    const tradeTransaction = await tradingOperations.tradeTransaction(tradeTransInfo);

    expect(tradeTransaction).toBeDefined();
    expect(tradeTransaction.status).toBe(true);
    expect(tradeTransaction.returnData).toBeDefined();

    const order = tradeTransaction.returnData && tradeTransaction.returnData.order;

    if (order) {
      const tradeStatus = await tradeOperations.getTradeStatus(order);

      expect(tradeStatus).toBeDefined();
      expect(tradeStatus.status).toBe(true);
      expect(tradeStatus.returnData).toBeDefined();
    } else {
      console.warn("Order number is undefined, skipping tradeStatus test");
    }
  });
});
