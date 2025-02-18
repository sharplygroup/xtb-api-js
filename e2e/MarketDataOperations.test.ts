import { MarketDataOperations } from "../lib/operations/MarketDataOperations";
import { WebSocketManager } from "../lib/utils/WebSocketManager";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.e2e" });

describe("MarketDataOperations E2E Tests", () => {
  let wsManager: WebSocketManager;
  let marketDataOperations: MarketDataOperations;

  beforeEach(() => {
    const credentials = {
      userId: process.env.XTB_USERID || "",
      password: process.env.XTB_PASSWORD || "",
      demo: process.env.XTB_DEMO === "true",
    };
    wsManager = new WebSocketManager(credentials);
    marketDataOperations = new MarketDataOperations(wsManager);
  });

  afterEach(async () => {
    await wsManager.disconnect();
  });

  it("should get all symbols", async () => {
    await wsManager.connect();
    const response = await marketDataOperations.getAllSymbols();
    expect(response).toBeDefined();
    expect(response.status).toBe(true);
    expect(response.returnData).toBeDefined();
    await wsManager.disconnect();
  });
});
