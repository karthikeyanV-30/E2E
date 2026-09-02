const { defineConfig } = require('@playwright/test');

const baseURL = process.env.BASE_URL || 'https://www.automationexercise.com/';

module.exports = defineConfig({
  testDir: './tests',
  globalSetup: require.resolve('./global-setup'),

  baseURL,

  // Test timeout
  timeout: 60 * 1000,
  retries: 2,

  expect: {
    timeout: 45 * 1000
  },

  fullyParallel: true,

  workers: 4,

  // Store screenshots, videos and traces here
  outputDir: 'test-results',

  reporter: [
    ['list'],
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

    // Failure artifacts
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',

    actionTimeout: 30 * 1000,

    navigationTimeout: 45 * 1000
  },

  projects: [
    {
      name: 'Chromium - QA - Karthikeyan V',
      use: {
        browserName: 'chromium'
      }
    }
  ]
});