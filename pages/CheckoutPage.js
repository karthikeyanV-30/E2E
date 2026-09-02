const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.addressHeading = page.getByRole('heading', { name: 'Address Details' });
    this.deliveryAddress = page.getByRole('heading', { name: 'Your delivery address' }).locator('../..');
    this.billingAddress = page.getByRole('heading', { name: 'Your billing address' }).locator('../..');
    this.orderRows = page.locator('table.table-condensed tbody tr[id^="product-"]');
    this.totalAmount = page.locator('table.table-condensed tbody tr').last().locator('.cart_total p');
    this.placeOrderLink = page.getByRole('link', { name: 'Place Order' });
  }

  async expectVisible() {
    await expect(this.page).toHaveURL(/\/checkout$/);
    await expect(this.addressHeading).toBeVisible();
    await expect(this.deliveryAddress).toBeVisible();
    await expect(this.billingAddress).toBeVisible();
    await expect(this.orderRows.first()).toBeVisible();
  }

  async getOrderItems() {
    return this.orderRows.evaluateAll(rows => rows.map(row => ({
      name: row.querySelector('.cart_description h4')?.innerText.trim(),
      price: Number(row.querySelector('.cart_price p')?.innerText.replace(/[^0-9]/g, '')),
      quantity: Number(row.querySelector('.cart_quantity button')?.innerText.trim()),
      total: Number(row.querySelector('.cart_total p')?.innerText.replace(/[^0-9]/g, ''))
    })));
  }

  async placeOrder() {
    await this.placeOrderLink.click();
    await expect(this.page).toHaveURL(/\/payment$/);
  }
}

module.exports = CheckoutPage;