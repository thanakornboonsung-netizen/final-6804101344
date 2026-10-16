// import { defineConfig, devices } from '@playwright/test';
// import process from 'process';

// /**
//  * Read environment variables from file.
//  * https://github.com/motdotla/dotenv
//  */
// // import dotenv from 'dotenv';
// // import path from 'path';
// // dotenv.config({ path: path.resolve(__dirname, '.env') });

// /**
//  * See https://playwright.dev/docs/test-configuration.
//  */
// export default defineConfig({
//   testDir: './tests',
//   timeout: 30_000,
//   /* Fail the build on CI if you accidentally left test.only in the source code. */
//   forbidOnly: !!process.env.CI,
//   retries: 0,
//   workers: 1,
//   reporter: [
//     ['list'],
//     ['html', { outputFolder: 'playwright-report', open: 'never' }],
//     ['json', { outputFile: 'reports/results.json' }],
//   ],
//   use: {
//     baseURL: 'https://www.saucedemo.com',
//     screenshot: 'only-on-failure',
//     trace: 'retain-on-failure',
//     video: 'retain-on-failure',
//   },
//   projects: [
//     {
//       name: 'chromium',
//       use: { ...devices['Desktop Chrome'] },
//     },
//   ],
// });

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',

  timeout: 30_000,

  retries: 0,

  workers: 1,

  reporter: [

    ['list'],

    ['html', { outputFolder: 'playwright-report', open: 'never' }],

    ['json', { outputFile: 'reports/results.json' }],

  ],

  use: {

    baseURL: 'https://www.saucedemo.com',

    screenshot: 'only-on-failure',

    trace: 'retain-on-failure',

    video: 'retain-on-failure',

  },

  projects: [

    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },

  ],

});
