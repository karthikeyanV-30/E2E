const { test, expect } = require('../fixtures/base');

async function openWithProducts(productsPage) {
  await productsPage.openDirect();
  const names = await productsPage.getProductNames();
  expect(names.length).toBeGreaterThanOrEqual(3);
  return names.slice(0, 3);
}

test.describe('Automation Exercise products flow', () => {
  test('TC_PRODUCT_AUTO_001: Products page is accessible', async ({ productsPage }) => {
    await productsPage.open();
    await expect(productsPage.productsHeading).toBeVisible();
    await expect(productsPage.productCards.first()).toBeVisible();
  });

  test('TC_PRODUCT_AUTO_002: All products have names', async ({ productsPage }) => {
    await productsPage.open();
    const names = await productsPage.getProductNames();
    expect(names.length).toBeGreaterThan(0);
    expect(names.every(name => name.trim().length > 0)).toBe(true);
  });

  test('TC_PRODUCT_AUTO_003: Product search displays results', async ({ productsPage }) => {
    const [productName] = await openWithProducts(productsPage);
    await productsPage.searchProduct(productName);
  });

  test('TC_PRODUCT_AUTO_004: Search result matches selected product', async ({ productsPage }) => {
    const [productName] = await openWithProducts(productsPage);
    await productsPage.searchProduct(productName);
    await expect(productsPage.productCard(productName).locator('p')).toHaveText(productName);
  });

  test('TC_PRODUCT_AUTO_005: Three products can be searched sequentially', async ({ productsPage }) => {
    const products = await openWithProducts(productsPage);
    for (const product of products) {
      await productsPage.searchProduct(product);
      await expect(productsPage.productCard(product).locator('p')).toHaveText(product);
      await productsPage.openDirect();
    }
  });

  test('TC_PRODUCT_AUTO_006: First searched product can be added to cart', async ({ productsPage }) => {
    const [productName] = await openWithProducts(productsPage);
    await productsPage.searchProduct(productName);
    await productsPage.addProduct(productName);
  });

  test('TC_PRODUCT_AUTO_007: Second searched product can be added to cart', async ({ productsPage }) => {
    const [, productName] = await openWithProducts(productsPage);
    await productsPage.searchProduct(productName);
    await productsPage.addProduct(productName);
  });

  test('TC_PRODUCT_AUTO_008: Third searched product can be added to cart', async ({ productsPage }) => {
    const [, , productName] = await openWithProducts(productsPage);
    await productsPage.searchProduct(productName);
    await productsPage.addProduct(productName);
  });

  test('TC_PRODUCT_AUTO_009: Success message appears after each addition', async ({ productsPage }) => {
    const products = await openWithProducts(productsPage);
    for (const product of products) {
      await productsPage.searchProduct(product);
      await productsPage.addProduct(product);
      await productsPage.continueShopping();
    }
  });

  test('TC_PRODUCT_AUTO_010: Continue Shopping returns to Products page', async ({ productsPage }) => {
    const [productName] = await openWithProducts(productsPage);
    await productsPage.searchProduct(productName);
    await productsPage.addProduct(productName);
    await productsPage.continueShopping();
  });

  test('TC_PRODUCT_AUTO_011: Multiple products can be added sequentially', async ({ productsPage }) => {
    const products = await openWithProducts(productsPage);
    for (const product of products) {
      await productsPage.searchProduct(product);
      await productsPage.addProduct(product);
      await productsPage.continueShopping();
    }
  });

  test('TC_PRODUCT_AUTO_012: Complete search and add-to-cart workflow succeeds', async ({ productsPage }) => {
    const products = await openWithProducts(productsPage);
    for (const product of products) {
      await productsPage.searchProduct(product);
      await expect(productsPage.productCard(product).locator('p')).toHaveText(product);
      await productsPage.addProduct(product);
      await productsPage.continueShopping();
    }
  });
});