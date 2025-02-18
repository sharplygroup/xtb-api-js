import { AdditionalOperations } from "../src/operations/AdditionalOperations";
import { WebSocketManager } from "../src/utils/WebSocketManager";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.e2e" });

describe("AdditionalOperations E2E Tests", () => {
  let wsManager: WebSocketManager;
  let additionalOperations: AdditionalOperations;

  beforeEach(() => {
    const credentials = {
      userId: process.env.XTB_USERID || "",
      password: process.env.XTB_PASSWORD || "",
      demo: process.env.XTB_DEMO === "true",
    };
    wsManager = new WebSocketManager(credentials);
    additionalOperations = new AdditionalOperations(wsManager);
  });

  afterEach(async () => {
    await wsManager.disconnect();
  });

  it("should get calendar", async () => {
    await wsManager.connect();
    const response = await additionalOperations.getCalendar();
    expect(response).toBeDefined();
    expect(response.status).toBe(true);
    expect(response.returnData).toBeDefined();
    await wsManager.disconnect();
  });

  it("should get server time", async () => {
    await wsManager.connect();
    const response = await additionalOperations.getServerTime();
    expect(response).toBeDefined();
    expect(response.status).toBe(true);
    expect(response.returnData).toBeDefined();
    await wsManager.disconnect();
  });

  it("should get step rules", async () => {
    await wsManager.connect();
    const response = await additionalOperations.getStepRules();
    expect(response).toBeDefined();
    expect(response.status).toBe(true);
    expect(response.returnData).toBeDefined();
    await wsManager.disconnect();
  });

  it("should get version", async () => {
    await wsManager.connect();
    const response = await additionalOperations.getVersion();
    expect(response).toBeDefined();
    expect(response.status).toBe(true);
    expect(response.returnData).toBeDefined();
    await wsManager.disconnect();
  });
});
