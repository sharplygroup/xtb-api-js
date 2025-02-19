import { DmaOperations } from "../src/operations/DmaOperations";
import { WebSocketManager } from "../src/utils/WebSocketManager";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.e2e" });

describe("DmaOperations E2E Tests", () => {
  let wsManager: WebSocketManager;
  let dmaOperations: DmaOperations;

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
    dmaOperations = new DmaOperations(wsManager);
  });

  afterEach(async () => {
    await wsManager.disconnect();
  });

  it("should get step rules", async () => {
    await wsManager.connect();

    const stepRules = await dmaOperations.getStepRules();

    expect(stepRules).toBeDefined();
    expect(stepRules.status).toBe(true);
    expect(stepRules.returnData).toBeDefined();
  });
});
