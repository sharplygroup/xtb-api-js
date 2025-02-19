import { ServerOperations } from "../src/operations/ServerOperations";
import { WebSocketManager } from "../src/utils/WebSocketManager";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.e2e" });

describe("ServerOperations E2E Tests", () => {
  let wsManager: WebSocketManager;
  let serverOperations: ServerOperations;

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
    serverOperations = new ServerOperations(wsManager);
  });

  afterEach(async () => {
    await wsManager.disconnect();
  });

  it("should get server time", async () => {
    await wsManager.connect();

    const serverTime = await serverOperations.getServerTime();

    expect(serverTime).toBeDefined();
    expect(serverTime.status).toBe(true);
    expect(serverTime.returnData).toBeDefined();
  });

  it("should get version", async () => {
    await wsManager.connect();

    const version = await serverOperations.getVersion();

    expect(version).toBeDefined();
    expect(version.status).toBe(true);
    expect(version.returnData).toBeDefined();
  });

  it("should ping", async () => {
    await wsManager.connect();

    await expect(serverOperations.ping()).resolves.toBeUndefined();
  });
});
