const buildUniqueEmail = () => `login.user.${Date.now()}.${Math.random().toString(36).slice(2, 8)}@example.com`;

const createLoginScenario = () => ({
  user: {
    name: 'Login Tester',
    email: buildUniqueEmail(),
    password: 'Test@12345'
  },
  invalid: {
    email: `unknown.${Date.now()}.${Math.random().toString(36).slice(2, 8)}@example.com`,
    password: 'Wrong@12345'
  }
});

module.exports = { createLoginScenario };