import { TradingOperations } from "../src/operations/TradingOperations";
import { WebSocketManager } from "../src/utils/WebSocketManager";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.e2e" });

describe("TradingOperations E2E Tests", () => {
  let wsManager: WebSocketManager;
  let tradingOperations: TradingOperations;

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
    tradingOperations = new TradingOperations(wsManager);
  });

  afterEach(async () => {
    await wsManager.disconnect();
  });

  it("should start trade transaction", async () => {
    await wsManager.connect();

    const tradeTransInfo = {
      cmd: 0, // BUY
      symbol: "EURUSD",
      volume: 0.1,
      type: 0, // OPEN
      price: 1.1,
    };
    const tradeTransaction =
      await tradingOperations.tradeTransaction(tradeTransInfo);

    expect(tradeTransaction).toBeDefined();
    expect(tradeTransaction.status).toBe(true);
    expect(tradeTransaction.returnData).toBeDefined();
  });

  it("should get trade transaction status", async () => {
    await wsManager.connect();

    // First, start a trade transaction to get an order number
    const tradeTransInfo = {
      cmd: 0, // BUY
      symbol: "EURUSD",
      volume: 0.1,
      type: 0, // OPEN
      price: 1.1,
    };
    const tradeTransaction =
      await tradingOperations.tradeTransaction(tradeTransInfo);

    expect(tradeTransaction).toBeDefined();
    expect(tradeTransaction.status).toBe(true);
    expect(tradeTransaction.returnData).toBeDefined();

    const order =
      tradeTransaction.returnData && tradeTransaction.returnData.order;

    if (order) {
      const tradeStatus = await tradingOperations.tradeTransactionStatus(order);

      expect(tradeStatus).toBeDefined();
      expect(tradeStatus.status).toBe(true);
      expect(tradeStatus.returnData).toBeDefined();
    } else {
      console.warn("Order number is undefined, skipping tradeStatus test");
    }
  });
});
