const { test: base, expect } = require('@playwright/test');
const SignupPage = require('../pages/SignupPage');
const LoginPage = require('../pages/LoginPage');

const test = base.extend({
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  page: async ({ page, baseURL }, use) => {
    await page.route('**/*', route => {
      const url = route.request().url();
      const blocked = [
        'google-analytics',
        'doubleclick',
        'googleadservices',
        'facebook.net'
      ];

      if (blocked.some(domain => url.includes(domain))) {
        route.abort();
      } else {
        route.continue();
      }
    });

    if (baseURL) {
      await page.goto('/');
    }

    await use(page);
  }
});

module.exports = { test, expect };
