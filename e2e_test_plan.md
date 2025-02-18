# E2E Test Plan for WebSocketManager

This document outlines the plan for creating end-to-end (E2E) tests for the `WebSocketManager` class in `lib/utils/WebSocketManager.ts`. The tests will be executed against the real XTB API.

## 1. Project Setup & Dependencies:

*   **Goal:** Set up a testing environment with Jest.
*   **Action:**
    *   Install Jest as a dev dependency: `npm install --save-dev jest ts-jest @types/jest`
    *   Configure Jest with `ts-jest` to support TypeScript. Create a `jest.config.js` or `jest.config.ts` file.
    *   Create a dedicated directory for e2e tests (e.g., `e2e/`).
    *   Create a test file for `WebSocketManager` (e.g., `e2e/WebSocketManager.test.ts`).
    *   **Note:** Do not install `ws` package separately, as it's already a dependency of the project.

## 2. Real API Interaction:

*   **Goal:** Interact with the real XTB API.
*   **Action:**
    *   Use real credentials for a demo or real XTB account.
    *   Send real commands to the API.
    *   Receive and validate real responses from the API.

## 3. Test Cases:

*   **Goal:** Write comprehensive test cases to cover the functionality of `WebSocketManager`.
*   **Action:**
    *   **Connection and Authentication:**
        *   Test successful connection to the main socket.
        *   Test successful login.
        *   Test successful connection to the stream socket.
        *   Test handling of login errors (invalid credentials).  This requires intentionally using invalid credentials.
        *   Test handling of connection errors (server not available). This might require temporarily blocking access to the XTB API.
    *   **Command Sending:**
        *   Test sending a valid command and receiving a response.
        *   Test handling of command timeouts.
        *   Test sending a stream command.
    *   **Stream Data:**
        *   Test receiving stream data and processing it correctly.
    *   **Disconnection:**
        *   Test successful disconnection from both sockets.
        *   Test that the ping interval is cleared on disconnection.
    *   **Important Considerations:**
        *   Since this is a real API, be mindful of rate limits. Implement delays between tests if necessary.
        *   Avoid making trades or performing actions that could have real financial consequences. Focus on read-only operations where possible.
        *   Handle potential API outages or unexpected responses gracefully.

## 4. Implementation Details:

*   **Credentials:** Use environment variables or a secure configuration file to store XTB account credentials.  **Never commit real credentials to the repository.**
*   **Test Structure:** Use `describe` and `it` blocks to organize test cases.
*   **Assertions:** Use `expect` to verify the expected behavior.
*   **Asynchronous Testing:** Use `async/await` to handle asynchronous operations.
*   **Cleanup:** Ensure that sockets are properly closed after each test.

## 5. File Structure

```
xtb-api-module/
├── e2e/
│   └── WebSocketManager.test.ts
├── lib/
│   └── utils/
│       └── WebSocketManager.ts
├── jest.config.js
├── package.json
├── e2e_test_plan.md  <-- This file
├── ...