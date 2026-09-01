const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginHeading = page.getByRole('heading', { name: 'Login to your account' });
    this.emailInput = page.locator('input[data-qa="login-email"]');
    this.passwordInput = page.locator('input[data-qa="login-password"]');
    this.loginButton = page.locator('button[data-qa="login-button"]');
    this.loginError = page.locator('p').filter({ hasText: 'Your email or password is incorrect!' });
    this.loggedInUser = page.getByText(/Logged in as/);
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
  }

  async open() {
    await this.page.goto('/login');
    await expect(this.page).toHaveURL(/\/login$/);
    await expect(this.loginHeading).toBeVisible();
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async fieldValidity(field) {
    const input = field === 'email' ? this.emailInput : this.passwordInput;
    return input.evaluate(element => ({
      valueMissing: element.validity.valueMissing,
      typeMismatch: element.validity.typeMismatch,
      validationMessage: element.validationMessage
    }));
  }

  async isPasswordMasked() {
    return this.passwordInput.getAttribute('type');
  }

  async logout() {
    await this.logoutLink.click();
    await expect(this.page).toHaveURL(/\/login$/);
    await expect(this.loginHeading).toBeVisible();
  }
}

module.exports = LoginPage;