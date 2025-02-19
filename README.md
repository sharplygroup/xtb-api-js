# xtb-api-js

## Description

A NodeJS library for interacting with the XTB API. It provides functionalities for account operations, market data, trading operations, and more.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)
- [Credits](#credits)

## Installation

```bash
npm install @sharplygroup/xtb-api-js
```

or

```bash
yarn add @sharplygroup/xtb-api-js
```

## Example usage

```javascript
const {
  WebSocketManager,
  AccountOperations,
} = require("@sharplygroup/xtb-api-js");

const wsManager = new WebSocketManager({
  userId: "your_user_id", // Replace with your user ID
  password: "your_password", // Replace with your password
  demo: true, // Set to false for live account
});

async function getAccountData() {
  try {
    await wsManager.connect();
    const accountOperations = new AccountOperations(wsManager);
    const accountData = await accountOperations.getCurrentUserData();
    console.log(accountData);
  } catch (error) {
    console.error(error);
  } finally {
    await wsManager.disconnect();
  }
}

getAccountData();
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

[MIT](LICENSE)

## Support

Please open an issue on GitHub for any questions or problems.

## Credits

Acknowledgment of any contributors or dependencies.
