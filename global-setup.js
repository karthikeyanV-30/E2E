const { chromium } = require('@playwright/test');
const { createAccountScenario } = require('./test-data/account-data');
const { createCartScenario } = require('./test-data/cart-data');

async function globalSetup(config) {
  const browser = await chromium.launch({ headless: true });

  for (let workerIndex = 0; workerIndex < config.workers; workerIndex += 1) {
    const scenario = createCartScenario(workerIndex);
    const account = createAccountScenario();
    account.signup.name = scenario.user.name;
    account.signup.email = scenario.user.email;
    account.account.password = scenario.user.password;
    account.account.firstName = scenario.user.firstName;
    account.account.lastName = scenario.user.lastName;
    account.account.address = scenario.user.address;
    account.account.city = scenario.user.city;
    account.account.state = scenario.user.state;
    account.account.zipcode = scenario.user.zipcode;
    account.account.country = scenario.user.country;
    account.account.mobile = scenario.user.mobile;
    const page = await browser.newPage({ baseURL: config.projects[0].use.baseURL });

    await page.goto('/login');
    await page.locator('input[data-qa="login-email"]').fill(scenario.user.email);
    await page.locator('input[data-qa="login-password"]').fill(scenario.user.password);
    await page.locator('button[data-qa="login-button"]').click();

    if (await page.locator('p').filter({ hasText: 'Your email or password is incorrect!' }).isVisible()) {
    await page.locator('input[data-qa="signup-name"]').fill(account.signup.name);
    await page.locator('input[data-qa="signup-email"]').fill(account.signup.email);
    await page.locator('button[data-qa="signup-button"]').click();
    await page.locator('input#id_gender1').check();
    await page.locator('input[data-qa="password"]').fill(account.account.password);
    await page.locator('select[data-qa="days"]').selectOption(account.account.day);
    await page.locator('select[data-qa="months"]').selectOption(account.account.month);
    await page.locator('select[data-qa="years"]').selectOption(account.account.year);
    await page.locator('input[data-qa="first_name"]').fill(account.account.firstName);
    await page.locator('input[data-qa="last_name"]').fill(account.account.lastName);
    await page.locator('input[data-qa="company"]').fill(account.account.company);
    await page.locator('input[data-qa="address"]').fill(account.account.address);
    await page.locator('input[data-qa="address2"]').fill(account.account.address2);
    await page.locator('select[data-qa="country"]').selectOption(account.account.country);
    await page.locator('input[data-qa="state"]').fill(account.account.state);
    await page.locator('input[data-qa="city"]').fill(account.account.city);
    await page.locator('input[data-qa="zipcode"]').fill(account.account.zipcode);
    await page.locator('input[data-qa="mobile_number"]').fill(account.account.mobile);
    await page.locator('button[data-qa="create-account"]').click();
      await page.locator('a[data-qa="continue-button"]').click();
    }
    await page.close();
  }

  await browser.close();
}

module.exports = globalSetup;