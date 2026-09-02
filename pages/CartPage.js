const { expect } = require('@playwright/test');

class CartPage {
  constructor(page, scenario) {
    this.page = page;
    this.scenario = scenario;
    this.cartLink = page.getByRole('link', { name: /Cart/ }).first();
    this.cartTable = page.locator('#cart_info_table');
    this.cartRows = page.locator('#cart_info_table tbody tr[id^="product-"]');
    this.emptyMessage = page.getByText('Cart is empty!');
    this.buyProductsLink = page.getByRole('link', { name: 'here' });
    this.proceedToCheckoutButton = page.locator('a.check_out');
    this.productsLink = page.getByRole('link', { name: /Products/ });
    this.checkoutPrompt = page.locator('#checkoutModal');
    this.registerLoginLink = this.checkoutPrompt.getByRole('link', { name: 'Register / Login' });
  }

  async open() {
    await this.page.goto('/view_cart');
    await expect(this.page).toHaveURL(/\/view_cart$/);
  }

  async openFromNavigation() {
    await this.cartLink.click();
    await expect(this.page).toHaveURL(/\/view_cart$/);
  }

  async isEmpty() {
    return this.emptyMessage.isVisible();
  }

  async getItems() {
    return this.cartRows.evaluateAll(rows => rows.map(row => ({
      id: row.id.replace('product-', ''),
      name: row.querySelector('.cart_description h4')?.innerText.trim(),
      price: Number(row.querySelector('.cart_price p')?.innerText.replace(/[^0-9]/g, '')),
      quantity: Number(row.querySelector('.cart_quantity button')?.innerText.trim()),
      total: Number(row.querySelector('.cart_total p')?.innerText.replace(/[^0-9]/g, ''))
    })));
  }

  async removeProduct(productId) {
    await this.page.locator(`a.cart_quantity_delete[data-product-id="${productId}"]`).click();
    await expect(this.page.locator(`#product-${productId}`)).toHaveCount(0);
  }

  async removeAllProducts() {
    const productIds = await this.cartRows.evaluateAll(rows => rows.map(row => row.id.replace('product-', '')));

    for (const productId of productIds) {
      const deleteLink = this.page.locator(`a.cart_quantity_delete[data-product-id="${productId}"]`);
      if (await deleteLink.count()) {
        await deleteLink.click({ force: true });
        await expect(this.page.locator(`#product-${productId}`)).toHaveCount(0);
      }
    }

    await expect(this.emptyMessage).toBeVisible();
  }

  async clickBuyProducts() {
    await this.buyProductsLink.click();
    await expect(this.page).toHaveURL(/\/products$/);
  }

  async continueShopping() {
    await this.productsLink.click();
    await expect(this.page).toHaveURL(/\/products$/);
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
    await expect(this.page).toHaveURL(/\/checkout$/);
  }

  async promptGuestCheckout() {
    await this.proceedToCheckoutButton.click();
    await expect(this.page).toHaveURL(/\/view_cart$/);
    await expect(this.checkoutPrompt).toBeVisible();
    await expect(this.checkoutPrompt).toContainText('Register / Login account to proceed on checkout.');
  }

  async openLoginFromCheckoutPrompt() {
    await this.registerLoginLink.click();
    await expect(this.page).toHaveURL(/\/login$/);
  }
}

module.exports = CartPage;