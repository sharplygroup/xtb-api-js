import { CalculationOperations } from "../src/operations/CalculationOperations";
import { WebSocketManager } from "../src/utils/WebSocketManager";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.e2e" });

describe("CalculationOperations E2E Tests", () => {
  let wsManager: WebSocketManager;
  let calculationOperations: CalculationOperations;

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
    calculationOperations = new CalculationOperations(wsManager);
  });

  afterEach(async () => {
    await wsManager.disconnect();
  });

  it("should get commission definition", async () => {
    await wsManager.connect();

    const symbol = "EURUSD";
    const volume = 1;
    const commissionDef = await calculationOperations.getCommissionDef(
      symbol,
      volume,
    );

    expect(commissionDef).toBeDefined();
    expect(commissionDef.status).toBe(true);
    expect(commissionDef.returnData).toBeDefined();
  });

  it("should get margin trade", async () => {
    await wsManager.connect();

    const symbol = "EURUSD";
    const volume = 1;
    const marginTrade = await calculationOperations.getMarginTrade(
      symbol,
      volume,
    );

    expect(marginTrade).toBeDefined();
    expect(marginTrade.status).toBe(true);
    expect(marginTrade.returnData).toBeDefined();
  });

  it("should get profit calculation", async () => {
    await wsManager.connect();

    const closePrice = 1.23;
    const cmd = 0; // BUY
    const openPrice = 1.2;
    const symbol = "EURUSD";
    const volume = 1;
    const profitCalculation = await calculationOperations.getProfitCalculation(
      closePrice,
      cmd,
      openPrice,
      symbol,
      volume,
    );

    expect(profitCalculation).toBeDefined();
    expect(profitCalculation.status).toBe(true);
    expect(profitCalculation.returnData).toBeDefined();
  });
});
