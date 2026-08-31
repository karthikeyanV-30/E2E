const { test, expect } = require('../fixtures/base');
const { createAccountScenario } = require('../test-data/account-data');

async function openAccountInformation(signupPage, scenario) {
  await signupPage.openLoginPage();
  await signupPage.signupNewUser(scenario.signup.name, scenario.signup.email);
}

test.describe('Account Information and Address Information', () => {
  test('TC_SIGNUP_AUTO_007: Account Information page is displayed after initial signup', async ({ signupPage }) => {
    const scenario = createAccountScenario();

    await openAccountInformation(signupPage, scenario);
    await expect(signupPage.accountInformationHeading).toBeVisible();
  });

  test('TC_SIGNUP_AUTO_008: Title Mr can be selected', async ({ signupPage }) => {
    const scenario = createAccountScenario();

    await openAccountInformation(signupPage, scenario);
    await signupPage.mrRadio.check();
    await expect(signupPage.mrRadio).toBeChecked();
  });

  test('TC_SIGNUP_AUTO_009: Name is required on Account Information page', async ({ signupPage }) => {
    const scenario = createAccountScenario();

    await openAccountInformation(signupPage, scenario);
    await signupPage.accountNameInput.fill('');
    await signupPage.submitAccountInformation();
    await expect.poll(() => signupPage.accountFieldValidity('name')).toMatchObject({ valueMissing: true });
  });

  test('TC_SIGNUP_AUTO_010: Initial signup email remains required and protected', async ({ signupPage }) => {
    const scenario = createAccountScenario();

    await openAccountInformation(signupPage, scenario);
    await expect(signupPage.accountEmailInput).toBeDisabled();
    await expect(signupPage.accountEmailInput).toHaveValue(scenario.signup.email);
  });

  test('TC_SIGNUP_AUTO_011: Account Information email cannot be changed to an invalid value', async ({ signupPage }) => {
    const scenario = createAccountScenario();

    await openAccountInformation(signupPage, scenario);
    await expect(signupPage.accountEmailInput).toBeDisabled();
    await expect(signupPage.accountEmailInput).toHaveValue(scenario.signup.email);
  });

  test('TC_SIGNUP_AUTO_012: Password field masks entered value', async ({ signupPage }) => {
    const scenario = createAccountScenario();

    await openAccountInformation(signupPage, scenario);
    await signupPage.passwordInput.fill(scenario.account.password);
    await expect.poll(() => signupPage.isPasswordMasked()).toBe('password');
  });

  test('TC_SIGNUP_AUTO_013: Password is required', async ({ signupPage }) => {
    const scenario = createAccountScenario();

    await openAccountInformation(signupPage, scenario);
    await signupPage.submitAccountInformation();
    await expect.poll(() => signupPage.accountFieldValidity('password')).toMatchObject({ valueMissing: true });
  });

  test('TC_SIGNUP_AUTO_014: Account is created with valid mandatory information', async ({ signupPage, page }) => {
    const scenario = createAccountScenario();

    await openAccountInformation(signupPage, scenario);
    await signupPage.fillAccountInformation(scenario.account);
    await signupPage.submitAccountCreation();
    await expect(page.locator('h2[data-qa="account-created"]')).toContainText('Account Created!');
  });

  test('TC_SIGNUP_AUTO_015: First Name is required', async ({ signupPage }) => {
    const scenario = createAccountScenario();

    await openAccountInformation(signupPage, scenario);
    await signupPage.firstNameInput.fill('');
    await signupPage.submitAccountInformation();
    await expect.poll(() => signupPage.accountFieldValidity('first_name')).toMatchObject({ valueMissing: true });
  });

  test('TC_SIGNUP_AUTO_016: Last Name is required', async ({ signupPage }) => {
    const scenario = createAccountScenario();

    await openAccountInformation(signupPage, scenario);
    await signupPage.lastNameInput.fill('');
    await signupPage.submitAccountInformation();
    await expect.poll(() => signupPage.accountFieldValidity('last_name')).toMatchObject({ valueMissing: true });
  });

  test('TC_SIGNUP_AUTO_017: Address is required', async ({ signupPage }) => {
    const scenario = createAccountScenario();

    await openAccountInformation(signupPage, scenario);
    await signupPage.addressInput.fill('');
    await signupPage.submitAccountInformation();
    await expect.poll(() => signupPage.accountFieldValidity('address')).toMatchObject({ valueMissing: true });
  });

  test('TC_SIGNUP_AUTO_018: Invalid zipcode does not create an account', async ({ signupPage, page }) => {
    const scenario = createAccountScenario();

    await openAccountInformation(signupPage, scenario);
    await signupPage.fillAccountInformation({ ...scenario.account, zipcode: scenario.invalid.zipcode });
    await signupPage.submitAccountInformation();
    await expect(page).toHaveURL(/\/signup$/);
  });

  test('TC_SIGNUP_AUTO_019: Invalid mobile number does not create an account', async ({ signupPage, page }) => {
    const scenario = createAccountScenario();

    await openAccountInformation(signupPage, scenario);
    await signupPage.fillAccountInformation({ ...scenario.account, mobile: scenario.invalid.mobile });
    await signupPage.submitAccountInformation();
    await expect(page).toHaveURL(/\/signup$/);
  });

  test('TC_SIGNUP_AUTO_020: Successful registration reaches the account state', async ({ signupPage }) => {
    const scenario = createAccountScenario();

    await openAccountInformation(signupPage, scenario);
    await signupPage.fillAccountInformation(scenario.account);
    await signupPage.submitAccountCreation();
    await signupPage.continueToHome();
    await expect(signupPage.logoutLink).toBeVisible();
  });
});
