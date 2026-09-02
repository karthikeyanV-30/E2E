const { test: base, expect } = require('@playwright/test');
const SignupPage = require('../pages/SignupPage');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const PaymentPage = require('../pages/PaymentPage');
const { createCartScenario } = require('../test-data/cart-data');

const test = base.extend({
  cartScenario: async ({}, use, workerInfo) => {
    await use(createCartScenario(workerInfo.workerIndex));
  },
  signupPage: async ({ page }, use) => {
    await use(new SignupPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  cartPage: async ({ page, cartScenario }, use) => {
    await use(new CartPage(page, cartScenario));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
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
