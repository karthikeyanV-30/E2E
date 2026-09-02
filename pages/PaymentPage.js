const { expect } = require('@playwright/test');

class PaymentPage {
  constructor(page) {
    this.page = page;
    this.paymentHeading = page.getByRole('heading', { name: 'Payment' });
    this.nameOnCardInput = page.locator('input[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('input[data-qa="card-number"]');
    this.cvcInput = page.locator('input[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('input[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('input[data-qa="expiry-year"]');
    this.payButton = page.locator('button[data-qa="pay-button"]');
    this.orderPlacedHeading = page.getByRole('heading', { name: 'Order Placed!' });
    this.continueButton = page.getByRole('link', { name: 'Continue' });
  }

  async expectVisible() {
    await expect(this.page).toHaveURL(/\/payment$/);
    await expect(this.paymentHeading).toBeVisible();
  }

  async fillPayment(details) {
    await this.nameOnCardInput.fill(details.nameOnCard);
    await this.cardNumberInput.fill(details.cardNumber);
    await this.cvcInput.fill(details.cvc);
    await this.expiryMonthInput.fill(details.expiryMonth);
    await this.expiryYearInput.fill(details.expiryYear);
  }

  async submit() {
    await this.payButton.click();
  }

  async fieldValidity(field) {
    const input = {
      nameOnCard: this.nameOnCardInput,
      cardNumber: this.cardNumberInput,
      cvc: this.cvcInput,
      expiryMonth: this.expiryMonthInput,
      expiryYear: this.expiryYearInput
    }[field];

    return input.evaluate(element => ({
      valueMissing: element.validity.valueMissing,
      typeMismatch: element.validity.typeMismatch,
      validationMessage: element.validationMessage
    }));
  }

  async expectOrderPlaced() {
    await expect(this.page).toHaveURL(/\/payment_done\//);
    await expect(this.orderPlacedHeading).toBeVisible();
  }

  async continue() {
    await this.continueButton.click();
    await expect(this.page).toHaveURL(/\/$/);
  }
}

module.exports = PaymentPage;