const buildUniqueEmail = (prefix) => `${prefix}.${Date.now()}@example.com`;

const signupData = {
  pageAccess: {
    expectedHeading: 'New User Signup!'
  },
  requiredName: {
    name: '',
    email: buildUniqueEmail('missing.name')
  },
  requiredEmail: {
    name: 'Karthikeyan',
    email: ''
  },
  invalidEmail: {
    name: 'Karthikeyan',
    email: 'invalid-email'
  },
  validUser: {
    signup: {
      name: 'Karthikeyan',
      email: buildUniqueEmail('automation.user')
    },
    account: {
      title: 'Mr.',
      password: 'Test@1234',
      day: '10',
      month: 'June',
      year: '1995',
      firstName: 'Automation',
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
    duplicateName: 'Another Karthikeyan'
  }
};

module.exports = signupData;
