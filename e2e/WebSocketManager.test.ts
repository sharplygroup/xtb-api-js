import { WebSocketManager } from "../lib/utils/WebSocketManager";
import WebSocket from "ws";
import * as dotenv from "dotenv";
import { XtbLoginError } from "../lib/errors/XtbLoginError";

dotenv.config({ path: ".env.e2e" });

describe("WebSocketManager E2E Tests", () => {
  it("should connect to the main socket", async () => {
    const credentials = {
      userId: process.env.XTB_USERID || "",
      password: process.env.XTB_PASSWORD || "",
      demo: process.env.XTB_DEMO === "true",
    };
    const wsManager = new WebSocketManager(credentials);

    await wsManager.connect();

    expect(wsManager["mainSocket"]).toBeInstanceOf(WebSocket);
    expect(wsManager["mainSocket"]?.readyState).toBe(WebSocket.OPEN);

    await wsManager.disconnect();
  });

  it("should login successfully", async () => {
    const credentials = {
      userId: process.env.XTB_USERID || "",
      password: process.env.XTB_PASSWORD || "",
      demo: process.env.XTB_DEMO === "true",
    };
    const wsManager = new WebSocketManager(credentials);
    const loginSpy = jest.spyOn(wsManager, "login");

    await wsManager.connect();

    expect(loginSpy).toHaveBeenCalled();
    expect(wsManager["streamSessionId"]).toBeDefined();

    await wsManager.disconnect();
  });

  it("should connect to the stream socket", async () => {
    const credentials = {
      userId: process.env.XTB_USERID || "",
      password: process.env.XTB_PASSWORD || "",
      demo: process.env.XTB_DEMO === "true",
    };
    const wsManager = new WebSocketManager(credentials);

    await wsManager.connect();

    expect(wsManager["streamSocket"]).toBeInstanceOf(WebSocket);
    expect(wsManager["streamSocket"]?.readyState).toBe(WebSocket.OPEN);

    await wsManager.disconnect();
  });

  it("should handle login errors", async () => {
    const credentials = {
      userId: "invalid_user",
      password: "invalid_password",
      demo: true,
    };
    const wsManager = new WebSocketManager(credentials);

    await expect(wsManager.connect()).rejects.toThrow(XtbLoginError);
  });

  it("should send a command and receive a response", async () => {
    const credentials = {
      userId: process.env.XTB_USERID || "",
      password: process.env.XTB_PASSWORD || "",
      demo: process.env.XTB_DEMO === "true",
    };
    const wsManager = new WebSocketManager(credentials);
    const sendCommandSpy = jest.spyOn(wsManager, "sendCommand");

    await wsManager.connect();

    const response = await wsManager.sendCommand({
      command: "ping",
      arguments: {},
    });

    expect(sendCommandSpy).toHaveBeenCalledWith({
      command: "ping",
      arguments: {},
    });
    expect(response.status).toBe(true);

    await wsManager.disconnect();
  });

  it("should receive stream data", async () => {
    const credentials = {
      userId: process.env.XTB_USERID || "",
      password: process.env.XTB_PASSWORD || "",
      demo: process.env.XTB_DEMO === "true",
    };
    const wsManager = new WebSocketManager(credentials);

    await wsManager.connect();

    const streamData = { command: "getTickPrices", data: { symbol: "EURUSD" } };
    const callback = jest.fn();

    wsManager.onStreamMessage(callback);
    wsManager["streamSocket"]?.emit("message", JSON.stringify(streamData));

    expect(callback).toHaveBeenCalledWith(streamData);

    await wsManager.disconnect();
  });

  it("should disconnect successfully", async () => {
    const credentials = {
      userId: process.env.XTB_USERID || "",
      password: process.env.XTB_PASSWORD || "",
      demo: process.env.XTB_DEMO === "true",
    };
    const wsManager = new WebSocketManager(credentials);
    const sendCommandSpy = jest.spyOn(wsManager, "sendCommand");

    await wsManager.connect();
    await wsManager.disconnect();

    expect(sendCommandSpy).toHaveBeenCalledWith({
      command: "logout",
      arguments: {},
    });
    expect(wsManager["mainSocket"]).toBeNull();
    expect(wsManager["streamSocket"]).toBeNull();
    expect(wsManager["streamSessionId"]).toBeNull();
  });
});
