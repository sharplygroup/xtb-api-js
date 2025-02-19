import { MarketDataOperations } from "../src/operations/MarketDataOperations";
import { WebSocketManager } from "../src/utils/WebSocketManager";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.e2e" });

describe("MarketDataOperations E2E Tests", () => {
  let wsManager: WebSocketManager;
  let marketDataOperations: MarketDataOperations;

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
    marketDataOperations = new MarketDataOperations(wsManager);
  });

  afterEach(async () => {
    await wsManager.disconnect();
  });

  it("should get calendar", async () => {
    await wsManager.connect();

    const calendar = await marketDataOperations.getCalendar();

    expect(calendar).toBeDefined();
    expect(calendar.status).toBe(true);
    expect(calendar.returnData).toBeDefined();
  });

  it("should get chart last request", async () => {
    await wsManager.connect();

    const info = {
      period: 5,
      start: Date.now() - 60000,
      symbol: "EURUSD",
    };
    const chart = await marketDataOperations.getChartLastRequest(info);

    expect(chart).toBeDefined();
    expect(chart.status).toBe(true);
    expect(chart.returnData).toBeDefined();
  });

  it("should get chart range request", async () => {
    await wsManager.connect();

    const info = {
      end: Date.now(),
      period: 5,
      start: Date.now() - 60000,
      symbol: "EURUSD",
      ticks: 0,
    };
    const chart = await marketDataOperations.getChartRangeRequest(info);

    expect(chart).toBeDefined();
    expect(chart.status).toBe(true);
    expect(chart.returnData).toBeDefined();
  });

  it("should get tick prices", async () => {
    await wsManager.connect();

    const level = 0;
    const symbols = ["EURUSD"];
    const timestamp = Date.now() - 1000;
    const tickPrices = await marketDataOperations.getTickPrices(
      level,
      symbols,
      timestamp,
    );

    expect(tickPrices).toBeDefined();
    expect(tickPrices.status).toBe(true);
    expect(tickPrices.returnData).toBeDefined();
  });

  it("should get trading hours", async () => {
    await wsManager.connect();

    const symbols = ["EURUSD"];
    const tradingHours = await marketDataOperations.getTradingHours(symbols);

    expect(tradingHours).toBeDefined();
    expect(tradingHours.status).toBe(true);
    expect(tradingHours.returnData).toBeDefined();
  });
});
