const { test, expect } = require('../fixtures/base');
const { createAccountScenario } = require('../test-data/account-data');
const { createLoginScenario } = require('../test-data/login-data');

async function registerUser(signupPage, scenario) {
  const account = createAccountScenario();
  account.signup.name = scenario.user.name;
  account.signup.email = scenario.user.email;
  account.account.password = scenario.user.password;

  await signupPage.openLoginPage();
  await signupPage.signupNewUser(account.signup.name, account.signup.email);
  await signupPage.fillAccountInformation(account.account);
  await signupPage.submitAccountCreation();
  await signupPage.continueToHome();
  await signupPage.logout();
}

test.describe('Automation Exercise login flow', () => {
  test('TC_LOGIN_AUTO_001: Login with valid registered credentials', async ({ loginPage, signupPage }) => {
    const scenario = createLoginScenario();

    await test.step('Register a user for the login scenario', async () => {
      await registerUser(signupPage, scenario);
    });

    await test.step('Log in with the registered credentials', async () => {
      await loginPage.open();
      await loginPage.login(scenario.user.email, scenario.user.password);
      await expect(loginPage.loggedInUser).toContainText(scenario.user.name);
      await expect(loginPage.logoutLink).toBeVisible();
    });
  });

  test('TC_LOGIN_AUTO_002: Login with invalid email and valid password', async ({ loginPage }) => {
    const scenario = createLoginScenario();
    await loginPage.open();
    await loginPage.login(scenario.invalid.email, scenario.user.password);
    await expect(loginPage.loginError).toBeVisible();
    await expect(loginPage.logoutLink).toHaveCount(0);
  });

  test('TC_LOGIN_AUTO_003: Login with valid email and invalid password', async ({ loginPage, signupPage }) => {
    const scenario = createLoginScenario();
    await registerUser(signupPage, scenario);
    await loginPage.open();
    await loginPage.login(scenario.user.email, scenario.invalid.password);
    await expect(loginPage.loginError).toBeVisible();
    await expect(loginPage.logoutLink).toHaveCount(0);
  });

  test('TC_LOGIN_AUTO_004: Login with invalid email and invalid password', async ({ loginPage }) => {
    const scenario = createLoginScenario();
    await loginPage.open();
    await loginPage.login(scenario.invalid.email, scenario.invalid.password);
    await expect(loginPage.loginError).toBeVisible();
    await expect(loginPage.logoutLink).toHaveCount(0);
  });

  test('TC_LOGIN_AUTO_005: Email field is mandatory', async ({ loginPage }) => {
    const scenario = createLoginScenario();
    await loginPage.open();
    await loginPage.passwordInput.fill(scenario.user.password);
    await loginPage.loginButton.click();
    await expect.poll(() => loginPage.fieldValidity('email')).toMatchObject({ valueMissing: true });
  });

  test('TC_LOGIN_AUTO_006: Password field is mandatory', async ({ loginPage }) => {
    const scenario = createLoginScenario();
    await loginPage.open();
    await loginPage.emailInput.fill(scenario.user.email);
    await loginPage.loginButton.click();
    await expect.poll(() => loginPage.fieldValidity('password')).toMatchObject({ valueMissing: true });
  });

  test('TC_LOGIN_AUTO_007: Both login fields are mandatory', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.loginButton.click();
    await expect.poll(() => loginPage.fieldValidity('email')).toMatchObject({ valueMissing: true });
    await expect.poll(() => loginPage.fieldValidity('password')).toMatchObject({ valueMissing: true });
  });

  test('TC_LOGIN_AUTO_008: Invalid email format is rejected', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.emailInput.fill('invalid-email');
    await loginPage.passwordInput.fill('Test@12345');
    await loginPage.loginButton.click();
    await expect.poll(() => loginPage.fieldValidity('email')).toMatchObject({ typeMismatch: true });
  });

  test('TC_LOGIN_AUTO_009: Password field masks entered value', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.passwordInput.fill('Test@12345');
    await expect.poll(() => loginPage.isPasswordMasked()).toBe('password');
  });

  test('TC_LOGIN_AUTO_010: Login after logout', async ({ loginPage, signupPage }) => {
    const scenario = createLoginScenario();
    await registerUser(signupPage, scenario);
    await loginPage.open();
    await loginPage.login(scenario.user.email, scenario.user.password);
    await expect(loginPage.logoutLink).toBeVisible();
    await loginPage.logout();
    await loginPage.login(scenario.user.email, scenario.user.password);
    await expect(loginPage.loggedInUser).toContainText(scenario.user.name);
  });

  test('TC_LOGIN_AUTO_011: Successful login displays logged-in user state', async ({ loginPage, signupPage }) => {
    const scenario = createLoginScenario();
    await registerUser(signupPage, scenario);
    await loginPage.open();
    await loginPage.login(scenario.user.email, scenario.user.password);
    await expect(loginPage.loggedInUser).toContainText(scenario.user.name);
    await expect(loginPage.logoutLink).toBeVisible();
  });
});