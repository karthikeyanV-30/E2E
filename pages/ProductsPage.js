const { expect } = require('@playwright/test');

class ProductsPage {
  constructor(page) {
    this.page = page;
    this.productsLink = page.getByRole('link', { name: /Products/ });
    this.productsHeading = page.getByRole('heading', { name: 'All Products' });
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.productCards = page.locator('.productinfo');
    this.searchedProductsHeading = page.getByRole('heading', { name: 'Searched Products' });
    this.cartModal = page.locator('#cartModal');
    this.addedMessage = page.getByText('Your product has been added to cart.').last();
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' }).last();
  }

  async open() {
    await this.page.goto('/');
    await this.productsLink.click();
    await expect(this.page).toHaveURL(/\/products$/);
    await expect(this.productsHeading).toBeVisible();
  }

  async openDirect() {
    await this.page.goto('/products');
    await expect(this.page).toHaveURL(/\/products$/);
    await expect(this.productsHeading).toBeVisible();
  }

  async getProductNames() {
    return this.productCards.locator('p').allTextContents();
  }

  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
    await expect(this.searchedProductsHeading).toBeVisible();
    await expect(this.productCard(productName)).toBeVisible();
  }

  productCard(productName) {
    return this.productCards.filter({
      has: this.page.getByText(productName, { exact: true })
    }).first();
  }

  async addProduct(productName) {
    await this.productCard(productName).locator('a.add-to-cart').click();
    await expect(this.addedMessage).toBeVisible();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
    await expect(this.page).toHaveURL(/\/products(?:\?.*)?$/);
    await expect(this.searchInput).toBeVisible();
  }
}

module.exports = ProductsPage;