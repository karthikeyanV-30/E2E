const { expect } = require('@playwright/test');

class SignupPage {
  constructor(page) {
    this.page = page;
    this.nameInput = page.locator('input[data-qa="signup-name"]');
    this.emailInput = page.locator('input[data-qa="signup-email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.accountTitle = page.locator('h2.title.text-center');
    this.passwordInput = page.locator('input[data-qa="password"]');
    this.daySelect = page.locator('select[data-qa="days"]');
    this.monthSelect = page.locator('select[data-qa="months"]');
    this.yearSelect = page.locator('select[data-qa="years"]');
    this.mrRadio = page.locator('input#id_gender1');
    this.mrsRadio = page.locator('input#id_gender2');
    this.firstNameInput = page.locator('input[data-qa="first_name"]');
    this.lastNameInput = page.locator('input[data-qa="last_name"]');
    this.companyInput = page.locator('input[data-qa="company"]');
    this.addressInput = page.locator('input[data-qa="address"]');
    this.address2Input = page.locator('input[data-qa="address2"]');
    this.countrySelect = page.locator('select[data-qa="country"]');
    this.stateInput = page.locator('input[data-qa="state"]');
    this.cityInput = page.locator('input[data-qa="city"]');
    this.zipcodeInput = page.locator('input[data-qa="zipcode"]');
    this.mobileInput = page.locator('input[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('button[data-qa="create-account"]');
    this.continueButton = page.locator('a[data-qa="continue-button"]');
  }

  async openLoginPage() {
    await this.page.goto('/');
    await this.page.getByRole('link', { name: 'Signup / Login' }).click();
    await expect(this.page).toHaveURL(/\/login$/);
  }

  async signupNewUser(name, email) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.signupButton.click();
    await expect(this.page).toHaveURL(/\/signup$/);
  }

  async fillAccountInformation(details) {
    if (details.title === 'Mr.') {
      await this.mrRadio.check();
    } else if (details.title === 'Mrs.') {
      await this.mrsRadio.check();
    }

    await this.passwordInput.fill(details.password);
    await this.daySelect.selectOption(details.day);
    await this.monthSelect.selectOption(details.month);
    await this.yearSelect.selectOption(details.year);
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.companyInput.fill(details.company);
    await this.addressInput.fill(details.address);
    await this.address2Input.fill(details.address2);
    await this.countrySelect.selectOption(details.country);
    await this.stateInput.fill(details.state);
    await this.cityInput.fill(details.city);
    await this.zipcodeInput.fill(details.zipcode);
    await this.mobileInput.fill(details.mobile);
  }

  async submitAccountCreation() {
    await this.createAccountButton.click();
    await expect(this.page).toHaveURL(/\/account_created$/);
    await expect(this.page.locator('h2[data-qa="account-created"]')).toContainText('Account Created!');
  }

  async continueToHome() {
    await this.continueButton.click();
    await expect(this.page).toHaveURL(/\/$/);
  }

  async logout() {
    await this.page.getByRole('link', { name: 'Logout' }).click();
    await expect(this.page).toHaveURL(/\/login$/);
  }

  async openSignupForExistingEmail(name, email) {
    await this.page.goto('/login');
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.signupButton.click();
    await expect(this.page.locator('body')).toContainText('Email Address already exist!');
  }
}

module.exports = SignupPage;
