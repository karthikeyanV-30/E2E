const buildUniqueEmail = () => `account.user.${Date.now()}.${Math.random().toString(36).slice(2, 8)}@example.com`;

const createAccountScenario = () => ({
  signup: {
    name: 'Karthikeyan',
    email: buildUniqueEmail()
  },
  account: {
    title: 'Mr.',
    password: 'Test@12345',
    day: '10',
    month: 'June',
    year: '1995',
    firstName: 'Karthikeyan',
    lastName: 'Tester',
    company: 'Automation Labs',
    address: '123 Test Street',
    address2: 'Apt 4B',
    country: 'India',
    state: 'Tamil Nadu',
    city: 'Chennai',
    zipcode: '600001',
    mobile: '9876543210'
  },
  invalid: {
    email: 'karthi@',
    zipcode: 'ABC@',
    mobile: 'ABCDEFGHIJ'
  }
});

module.exports = { createAccountScenario };
