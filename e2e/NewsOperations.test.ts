import { NewsOperations } from "../src/operations/NewsOperations";
import { WebSocketManager } from "../src/utils/WebSocketManager";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.e2e" });

describe("NewsOperations E2E Tests", () => {
  let wsManager: WebSocketManager;
  let newsOperations: NewsOperations;

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
    newsOperations = new NewsOperations(wsManager);
  });

  afterEach(async () => {
    await wsManager.disconnect();
  });

  it("should get news", async () => {
    await wsManager.connect();

    const end = Date.now();
    const start = Date.now() - 24 * 60 * 60 * 1000; // Last day
    const news = await newsOperations.getNews(end, start);

    expect(news).toBeDefined();
    expect(news.status).toBe(true);
    expect(news.returnData).toBeDefined();
  });
});
