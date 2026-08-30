const { test, expect } = require('../fixtures/base');
const SignupPage = require('../pages/SignupPage');
const signupData = require('../test-data/signup-data');

test.describe('Automation Exercise signup flow', () => {
  test('Create a valid account and verify duplicate email signup rejection in one flow', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const { signup, account } = signupData.positive;
    const duplicateName = 'Duplicate User';

    await test.step('Create a valid account using a unique email', async () => {
      await signupPage.openLoginPage();
      await signupPage.signupNewUser(signup.name, signup.email);
      await signupPage.fillAccountInformation(account);
      await signupPage.submitAccountCreation();
      await signupPage.continueToHome();
      await signupPage.logout();
    });

    await test.step('Attempt signup again using the same email to verify duplicate registration rejection', async () => {
      await signupPage.openLoginPage();
      await signupPage.nameInput.fill(duplicateName);
      await signupPage.emailInput.fill(signup.email);
      await signupPage.signupButton.click();
      await expect(page.locator('body')).toContainText('Email Address already exist!');
    });
  });
});
