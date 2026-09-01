const { test, expect } = require('../fixtures/base');
const signupData = require('../test-data/signup-data');

test.describe('Automation Exercise signup flow', () => {
  test('TC_SIGNUP_AUTO_001: Signup/Login page is accessible', async ({ signupPage }) => {
    await signupPage.openLoginPage();
    await signupPage.expectSignupPageVisible(signupData.pageAccess.expectedHeading);
  });

  test.describe.serial('Account creation and duplicate email flow', () => {
    test('TC_SIGNUP_AUTO_002: Register a new user with valid Name and Email', async ({ signupPage }) => {
      const { signup, account } = signupData.validUser;

      await test.step('Submit valid initial signup details', async () => {
        await signupPage.openLoginPage();
        await signupPage.signupNewUser(signup.name, signup.email);
        await expect(signupPage.accountInformationHeading).toBeVisible();
      });

      await test.step('Complete account information', async () => {
        await signupPage.fillAccountInformation(account);
        await signupPage.submitAccountCreation();
        await signupPage.continueToHome();
        await signupPage.logout();
      });
    });

    test('TC_SIGNUP_AUTO_006: Duplicate email registration is rejected', async ({ signupPage }) => {
      const { signup, duplicateName } = signupData.validUser;
      await signupPage.openLoginPage();
      await signupPage.openSignupForExistingEmail(duplicateName, signup.email);
    });
  });

  test('TC_SIGNUP_AUTO_003: Name is mandatory in initial signup', async ({ signupPage, page }) => {
    const { name, email } = signupData.requiredName;
    await signupPage.openLoginPage();
    await signupPage.submitInitialSignup(name, email);
    await expect(page).toHaveURL(/\/login$/);
    await expect.poll(() => signupPage.initialFieldValidity('name')).toMatchObject({ valueMissing: true });
  });

  test('TC_SIGNUP_AUTO_004: Email is mandatory in initial signup', async ({ signupPage, page }) => {
    const { name, email } = signupData.requiredEmail;
    await signupPage.openLoginPage();
    await signupPage.submitInitialSignup(name, email);
    await expect(page).toHaveURL(/\/login$/);
    await expect.poll(() => signupPage.initialFieldValidity('email')).toMatchObject({ valueMissing: true });
  });

  test('TC_SIGNUP_AUTO_005: Invalid email is rejected in initial signup', async ({ signupPage, page }) => {
    const { name, email } = signupData.invalidEmail;
    await signupPage.openLoginPage();
    await signupPage.submitInitialSignup(name, email);
    await expect(page).toHaveURL(/\/login$/);
    await expect.poll(() => signupPage.initialFieldValidity('email')).toMatchObject({ typeMismatch: true });
  });
});
