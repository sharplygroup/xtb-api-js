import { SymbolOperations } from "../src/operations/SymbolOperations";
import { WebSocketManager } from "../src/utils/WebSocketManager";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.e2e" });

describe("SymbolOperations E2E Tests", () => {
  let wsManager: WebSocketManager;
  let symbolOperations: SymbolOperations;

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
    symbolOperations = new SymbolOperations(wsManager);
  });

  afterEach(async () => {
    await wsManager.disconnect();
  });

  it("should get all symbols", async () => {
    await wsManager.connect();

    const symbols = await symbolOperations.getAllSymbols();

    expect(symbols).toBeDefined();
    expect(symbols.status).toBe(true);
    expect(symbols.returnData).toBeDefined();
  });

  it("should get a symbol", async () => {
    await wsManager.connect();

    const symbol = "EURUSD";
    const symbolData = await symbolOperations.getSymbol(symbol);

    expect(symbolData).toBeDefined();
    expect(symbolData.status).toBe(true);
    expect(symbolData.returnData).toBeDefined();
  });
});
