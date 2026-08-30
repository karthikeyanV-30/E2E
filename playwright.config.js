const { defineConfig } = require('@playwright/test');

const baseURL = process.env.BASE_URL || 'https://www.automationexercise.com/';

module.exports = defineConfig({
  testDir: './tests',

  baseURL,

  timeout: 60 * 1000,

  expect: {
    timeout: 45 * 1000
  },

  fullyParallel: true,

  workers: 4,

  reporter: [
    ['list'],
    // ['allure-playwright'],
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never'
    }]
  ],

  use: {
    baseURL,

    headless: true,

    viewport: null,

    launchOptions: {
      args: ['--start-maximized']
    },

    screenshot: 'only-on-failure',

    trace: 'retain-on-failure',

    video: 'retain-on-failure',

    actionTimeout: 30 * 1000,

    navigationTimeout: 45 * 1000
  },

  projects: [
    {
      name: 'Chromium - QA - Karthikeyan V',
      use: { browserName: 'chromium' }
    }
  ]
});
