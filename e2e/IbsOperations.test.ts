import { IbsOperations } from "../src/operations/IbsOperations";
import { WebSocketManager } from "../src/utils/WebSocketManager";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.e2e" });

describe("IbsOperations E2E Tests", () => {
  let wsManager: WebSocketManager;
  let ibsOperations: IbsOperations;

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
    ibsOperations = new IbsOperations(wsManager);
  });

  afterEach(async () => {
    await wsManager.disconnect();
  });

  it("should get IBs history", async () => {
    await wsManager.connect();

    const end = Date.now();
    const start = Date.now() - 30 * 24 * 60 * 60 * 1000; // Last month
    const ibsHistory = await ibsOperations.getIbsHistory(end, start);

    expect(ibsHistory).toBeDefined();
    expect(ibsHistory.status).toBe(true);
    expect(ibsHistory.returnData).toBeDefined();
  });
});
