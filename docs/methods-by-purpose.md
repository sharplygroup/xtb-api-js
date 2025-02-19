## Summarized Methods by Purpose

**Symbol Information:**

*   getAllSymbols: Returns array of all symbols available for the user.
*   getSymbol: Returns information about symbol available for the user.

**Market Data:**

*   getCalendar: Returns calendar with market events.
*   getChartLastRequest: Returns chart info, from start date to the current time.
*   getChartRangeRequest: Returns chart info with data between given start and end dates.
*   getTickPrices: Returns array of current quotations for given symbols, only quotations that changed from given timestamp are returned.
*   getTradingHours: Returns quotes and trading times.

**Account Information:**

*   getCurrentUserData: Returns information about account currency, and account leverage.
*   getMarginLevel: Returns various account indicators.

**Trade Information:**

*   getTrades: Returns array of user's trades.
*   getTradeRecords: Returns array of trades listed in `orders` argument.
*   getTradesHistory: Returns array of user's trades which were closed within specified period of time.
*   getTradeStatus: Returns current transaction status.

**Calculation:**

*   getCommissionDef: Returns calculation of commission and rate of exchange.
*   getMarginTrade: Returns expected margin for given instrument and volume.
*   getProfitCalculation: Calculates estimated profit for given deal data.

**Server Information:**

*   getServerTime: Returns current time on trading server.
*   getVersion: Returns the current API version.
*   ping: Regularly calling this function is enough to refresh the internal state of all the components in the system.

**DMA Rules:**

*   getStepRules: Returns a list of step rules for DMAs.

**Trading:**

*   tradeTransaction: Starts trade transaction.
*   tradeTransactionStatus: Returns current transaction status.

**IBs Data:**

*   getIbsHistory: Returns IBs data from the given time range.

**News:**

*   getNews: Returns news from trading server which were sent within specified period of time.