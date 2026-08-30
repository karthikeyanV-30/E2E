const buildUniqueEmail = (prefix) => `${prefix}.${Date.now()}@example.com`;

const signupData = {
  positive: {
    signup: {
      name: 'Test User',
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
    }
  },
  negative: {
    signup: {
      name: 'Duplicate User',
      email: buildUniqueEmail('duplicate.user')
    },
    account: {
      title: 'Mrs.',
      password: 'Duplicate@123',
      day: '15',
      month: 'March',
      year: '1992',
      firstName: 'Duplicate',
      lastName: 'User',
      company: 'Duplicate Labs',
      address: '99 Sample Road',
      address2: 'Floor 3',
      country: 'India',
      state: 'Karnataka',
      city: 'Bengaluru',
      zipcode: '560001',
      mobile: '9988776655'
    }
  }
};

module.exports = signupData;
