const { test, expect } = require('../fixtures/base');
const { createAccountScenario } = require('../test-data/account-data');
const getScenario = fixtures => fixtures.cartPage.scenario;

function useFixtures(fixtures) {
  return fixtures;
}
async function loginSharedUser(loginPage, cartPage) {
  const scenario = cartPage.scenario;
  await loginPage.open();
  await loginPage.login(scenario.user.email, scenario.user.password);
  await loginPage.page.waitForLoadState('networkidle');
}

async function prepareCart({ loginPage, cartPage }) {
  await loginSharedUser(loginPage, cartPage);
  await cartPage.open();
  if (!(await cartPage.isEmpty())) {
    await cartPage.removeAllProducts();
  }
}

async function prepareGuestCart({ cartPage }) {
  await cartPage.open();
  if (!(await cartPage.isEmpty())) {
    await cartPage.removeAllProducts();
  }
}

async function addProducts({ productsPage }, count = 3) {
  await productsPage.openDirect();
  const products = (await productsPage.getProductNames()).slice(0, count);

  for (const product of products) {
    await productsPage.searchProduct(product);
    await productsPage.addProduct(product);
    await productsPage.continueShopping();
  }

  return products;
}

async function addSameProduct({ productsPage }, count = 3, productIndex = 0) {
  await productsPage.openDirect();
  const product = (await productsPage.getProductNames())[productIndex];

  for (let index = 0; index < count; index += 1) {
    await productsPage.searchProduct(product);
    await productsPage.addProduct(product);
    await productsPage.continueShopping();
  }

  return product;
}

async function addGuestProduct({ productsPage, cartPage }) {
  await productsPage.openDirect();
  const [product] = await productsPage.getProductNames();
  await productsPage.searchProduct(product);
  await productsPage.addProduct(product);
  await productsPage.continueShopping();
  await cartPage.openFromNavigation();
  return product;
}

test.describe('Automation Exercise cart and checkout flow', () => {
  test('TC_CART_AUTO_001: Cart is empty for a new guest user', async ({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage }) => {
    const fixtures = useFixtures({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage });
    await prepareGuestCart(fixtures);
    await expect(fixtures.cartPage.emptyMessage).toBeVisible();
  });

  test('TC_CART_AUTO_002: Empty cart links to Products', async ({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage }) => {
    const fixtures = useFixtures({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage });
    await prepareGuestCart(fixtures);
    await fixtures.cartPage.clickBuyProducts();
    await expect(fixtures.productsPage.productsHeading).toBeVisible();
    await expect(fixtures.productsPage.productCards.first()).toBeVisible();
  });

  test('TC_CART_AUTO_003: Three products can be added to cart', async ({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage }) => {
    const fixtures = useFixtures({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage });
    await prepareGuestCart(fixtures);
    const products = await addProducts(fixtures);
    await fixtures.cartPage.open();
    await expect(fixtures.cartPage.cartRows).toHaveCount(products.length);
  });

  test('TC_CART_AUTO_004: Added product details are correct', async ({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage }) => {
    const fixtures = useFixtures({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage });
    await prepareGuestCart(fixtures);
    const products = await addProducts(fixtures);
    await fixtures.cartPage.open();
    const items = await fixtures.cartPage.getItems();
    expect(items.map(item => item.name)).toEqual(products);
    expect(items.every(item => item.price > 0 && item.quantity === 1 && item.total === item.price)).toBe(true);
  });

  test('TC_CART_AUTO_005: A product can be removed from cart', async ({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage }) => {
    const fixtures = useFixtures({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage });
    await prepareGuestCart(fixtures);
    await addProducts(fixtures);
    await fixtures.cartPage.open();
    const [removed, ...remaining] = await fixtures.cartPage.getItems();
    await fixtures.cartPage.removeProduct(removed.id);
    expect((await fixtures.cartPage.getItems()).map(item => item.name)).toEqual(remaining.map(item => item.name));
  });

  test('TC_CART_AUTO_006: Repeated additions update quantity', async ({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage }) => {
    const fixtures = useFixtures({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage });
    await prepareGuestCart(fixtures);
    const product = await addSameProduct(fixtures);
    await fixtures.cartPage.open();
    const [item] = await fixtures.cartPage.getItems();
    expect(item.name).toBe(product);
    expect(item.quantity).toBe(3);
  });

  test('TC_CART_AUTO_007: Cart total equals price multiplied by quantity', async ({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage }) => {
    const fixtures = useFixtures({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage });
    await prepareGuestCart(fixtures);
    await addProducts(fixtures);
    await fixtures.cartPage.open();
    const items = await fixtures.cartPage.getItems();
    expect(items.reduce((sum, item) => sum + item.total, 0)).toBe(items.reduce((sum, item) => sum + item.price * item.quantity, 0));
  });

  test('TC_CART_AUTO_008: Checkout displays address and order details', async ({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage }) => {
    const fixtures = useFixtures({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage });
    await prepareCart(fixtures);
    const products = await addProducts(fixtures, 2);
    await fixtures.cartPage.open();
    await fixtures.cartPage.proceedToCheckout();
    await fixtures.checkoutPage.expectVisible();
    await expect(fixtures.checkoutPage.deliveryAddress).toContainText(`${getScenario(fixtures).user.firstName} ${getScenario(fixtures).user.lastName}`);
    await expect(fixtures.checkoutPage.deliveryAddress).toContainText(getScenario(fixtures).user.address);
    await expect(fixtures.checkoutPage.deliveryAddress).toContainText(`${getScenario(fixtures).user.city} ${getScenario(fixtures).user.state}`);
    await expect(fixtures.checkoutPage.deliveryAddress).toContainText(getScenario(fixtures).user.zipcode);
    await expect(fixtures.checkoutPage.deliveryAddress).toContainText(getScenario(fixtures).user.country);
    await expect(fixtures.checkoutPage.deliveryAddress).toContainText(getScenario(fixtures).user.mobile);
    expect((await fixtures.checkoutPage.getOrderItems()).map(item => item.name)).toEqual(products);
  });

  test('TC_CART_AUTO_009: Valid payment details place an order', async ({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage }) => {
    const fixtures = useFixtures({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage });
    await prepareCart(fixtures);
    await addProducts(fixtures, 1);
    await fixtures.cartPage.open();
    await fixtures.cartPage.proceedToCheckout();
    await fixtures.checkoutPage.placeOrder();
    await fixtures.paymentPage.fillPayment(getScenario(fixtures).payment);
    await fixtures.paymentPage.submit();
    await fixtures.paymentPage.expectOrderPlaced();
  });

  test('TC_CART_AUTO_010: Order confirmation Continue returns home', async ({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage }) => {
    const fixtures = useFixtures({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage });
    await prepareCart(fixtures);
    await addProducts(fixtures, 1);
    await fixtures.cartPage.open();
    await fixtures.cartPage.proceedToCheckout();
    await fixtures.checkoutPage.placeOrder();
    await fixtures.paymentPage.fillPayment(getScenario(fixtures).payment);
    await fixtures.paymentPage.submit();
    await fixtures.paymentPage.expectOrderPlaced();
    await fixtures.paymentPage.continue();
  });

  test('TC_CART_AUTO_011: Empty cart cannot proceed to checkout', async ({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage }) => {
    const fixtures = useFixtures({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage });
    await prepareGuestCart(fixtures);
    await expect(fixtures.cartPage.proceedToCheckoutButton).toHaveCount(0);
  });

  test('TC_CART_AUTO_012: Empty payment fields remain invalid', async ({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage }) => {
    const fixtures = useFixtures({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage });
    await prepareCart(fixtures);
    await addProducts(fixtures, 1);
    await fixtures.cartPage.open();
    await fixtures.cartPage.proceedToCheckout();
    await fixtures.checkoutPage.placeOrder();
    await fixtures.paymentPage.submit();
    await expect.poll(() => fixtures.paymentPage.fieldValidity('nameOnCard')).toMatchObject({ valueMissing: true });
    await expect(fixtures.paymentPage.page).toHaveURL(/\/payment$/);
  });

  test('TC_CART_AUTO_013: Invalid payment details are handled', async ({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage }) => {
    const fixtures = useFixtures({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage });
    await prepareCart(fixtures);
    await addProducts(fixtures, 1);
    await fixtures.cartPage.open();
    await fixtures.cartPage.proceedToCheckout();
    await fixtures.checkoutPage.placeOrder();
    await fixtures.paymentPage.fillPayment(getScenario(fixtures).invalidPayment);
    await fixtures.paymentPage.submit();
    await expect(fixtures.paymentPage.page).toHaveURL(/\/payment(?:_done\/\d+)?$/);
  });

  test('TC_CART_AUTO_014: Removed product is absent at checkout', async ({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage }) => {
    const fixtures = useFixtures({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage });
    await prepareCart(fixtures);
    await addProducts(fixtures);
    await fixtures.cartPage.open();
    const [removed] = await fixtures.cartPage.getItems();
    await fixtures.cartPage.removeProduct(removed.id);
    await fixtures.cartPage.proceedToCheckout();
    await expect(fixtures.checkoutPage.orderRows.filter({ hasText: removed.name })).toHaveCount(0);
  });

  test('TC_CART_AUTO_015: Cart contents persist between Cart and Products', async ({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage }) => {
    const fixtures = useFixtures({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage });
    await prepareGuestCart(fixtures);
    const products = await addProducts(fixtures, 2);
    await fixtures.cartPage.open();
    await fixtures.cartPage.continueShopping();
    await fixtures.cartPage.open();
    expect((await fixtures.cartPage.getItems()).map(item => item.name)).toEqual(products);
  });

  test('TC_CART_AUTO_016: Complete Cart to Order workflow succeeds', async ({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage }) => {
    const fixtures = useFixtures({ loginPage, signupPage, cartPage, productsPage, checkoutPage, paymentPage });
    await prepareCart(fixtures);
    const products = await addProducts(fixtures);
    await fixtures.cartPage.open();
    const [removed] = await fixtures.cartPage.getItems();
    await fixtures.cartPage.removeProduct(removed.id);
    const repeatedProduct = await addSameProduct(fixtures, 3, 1);
    await fixtures.cartPage.open();
    const items = await fixtures.cartPage.getItems();
    expect(items.find(item => item.name === repeatedProduct).quantity).toBeGreaterThanOrEqual(3);
    await fixtures.cartPage.proceedToCheckout();
    expect((await fixtures.checkoutPage.getOrderItems()).some(item => item.name === removed.name)).toBe(false);
    await fixtures.checkoutPage.placeOrder();
    await fixtures.paymentPage.fillPayment(getScenario(fixtures).payment);
    await fixtures.paymentPage.submit();
    await fixtures.paymentPage.expectOrderPlaced();
    await fixtures.paymentPage.continue();
    expect(products.length).toBe(3);
  });
});

test.describe('Automation Exercise guest cart flow', () => {
  test('TC_CART_AUTO_017: Guest is prompted to login at checkout', async ({ productsPage, cartPage }) => {
    await addGuestProduct({ productsPage, cartPage });
    await cartPage.promptGuestCheckout();
  });

  test('TC_CART_AUTO_018: Guest checkout prompt opens Login page', async ({ productsPage, cartPage }) => {
    await addGuestProduct({ productsPage, cartPage });
    await cartPage.promptGuestCheckout();
    await cartPage.openLoginFromCheckoutPrompt();
  });

  test('TC_CART_AUTO_019: Guest cart product remains after login', async ({ loginPage, signupPage, productsPage, cartPage }) => {
    const product = await addGuestProduct({ productsPage, cartPage });
    await cartPage.promptGuestCheckout();
    await cartPage.openLoginFromCheckoutPrompt();
    await loginSharedUser(loginPage, cartPage);
    await cartPage.open();
    const [item] = await cartPage.getItems();
    expect(item.name).toBe(product);
    expect(item.quantity).toBe(1);
  });

  test('TC_CART_AUTO_020: Guest cart reaches checkout after login', async ({ loginPage, signupPage, productsPage, cartPage, checkoutPage }) => {
    const product = await addGuestProduct({ productsPage, cartPage });
    await cartPage.promptGuestCheckout();
    await cartPage.openLoginFromCheckoutPrompt();
    await loginSharedUser(loginPage, cartPage);
    await cartPage.open();
    await expect(cartPage.cartRows).toHaveCount(1);
    await cartPage.proceedToCheckout();
    await checkoutPage.expectVisible();
    expect((await checkoutPage.getOrderItems()).map(item => item.name)).toEqual([product]);
  });
});