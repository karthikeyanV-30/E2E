const createCartScenario = (workerIndex = 0) => ({
  user: {
    name: 'Cart Checkout Tester',
    email: process.env.CART_TEST_EMAIL || `cart.checkout.worker${workerIndex}.20260902@example.com`,
    password: 'Test@12345',
    firstName: 'Cart',
    lastName: 'Tester',
    address: '123 Test Street',
    city: 'Chennai',
    state: 'Tamil Nadu',
    zipcode: '600001',
    country: 'India',
    mobile: '9876543210'
  },
  payment: {
    nameOnCard: 'Cart Checkout Tester',
    cardNumber: '4111111111111111',
    cvc: '311',
    expiryMonth: '12',
    expiryYear: '2030'
  },
  invalidPayment: {
    nameOnCard: 'x',
    cardNumber: '123',
    cvc: 'x',
    expiryMonth: 'xx',
    expiryYear: 'xx'
  }
});

module.exports = { createCartScenario };