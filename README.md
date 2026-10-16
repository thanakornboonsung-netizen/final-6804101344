# SauceDemo Playwright Final Exam

Playwright Test suite for the SauceDemo application, written in TypeScript. The tests target `https://www.saucedemo.com/` and cover the six exam tasks in the `tests/` directory.

## Requirements

- Node.js 20 or newer
- npm

## Install and run

```bash
npm install
npx playwright install chromium
npm test
```

The configured run uses Chromium, one worker, and no retries. HTML and JSON reports are generated from the actual run:

- `playwright-report/index.html`
- `reports/results.json`
- `reports/test-summary.md`

Open the interactive HTML report with:

```bash
npm run report
```

## Test coverage

- `UT-01`: login form validation for empty credentials, missing password, and invalid credentials.
- `UT-02`: Backpack button state and cart badge as an item is added and removed.
- `IT-01`: real SauceDemo login followed by a browser-level Inventory Stub built with `page.setContent()`. Login and reaching `inventory.html` are Real; the replacement Inventory DOM and its two mock products are Stub. This is a browser-level stub, not a replacement for SauceDemo internal modules.
- `IT-02`: `driverOpenInventory()` acts as the Driver by creating a browser context, adding the `session-username` cookie, and opening `inventory.html` directly. Inventory, product actions, and Shopping Cart are Real SauceDemo UI.
- `ST-01`: purchase of Backpack and Bike Light from login through order confirmation.
- `ST-02`: checkout required-field validation and successful recovery/purchase.

The UI checks in Chapter 1 are black-box browser UI component/functional tests. They do not execute SauceDemo's internal source code as unit tests.

## Reports

The reporters write the HTML report to `playwright-report/` and the JSON report to `reports/results.json`. `reports/test-summary.md` is maintained from the most recent real Playwright run; it must not be edited to misrepresent test outcomes.
