# 🎭 Playwright E2E Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-1.62.1-45ba4b)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue)
![POM](https://img.shields.io/badge/Design%20Pattern-Page%20Object%20Model-orange)

## 📌 Project Overview

This project is an **End-to-End web automation framework** built using **Playwright and JavaScript** for the [Automation Exercise](https://automationexercise.com/) web application.

The framework covers complete user journeys from **user registration and authentication to product selection, cart management, checkout, and payment**.

It follows the **Page Object Model (POM)** design pattern and uses reusable fixtures, externalized test data, dynamic test data, global setup, failure evidence, HTML reporting, and GitHub Actions CI/CD.

---

## 🛠️ Tech Stack

* **Automation:** Playwright
* **Language:** JavaScript
* **Test Framework:** Playwright Test
* **Design Pattern:** Page Object Model (POM)
* **Test Data:** Externalized JavaScript test data
* **Reporting:** Playwright HTML Report
* **CI/CD:** GitHub Actions
* **Version Control:** Git & GitHub
* **IDE:** Visual Studio Code

---

## 🧪 Test Coverage

The framework covers the following end-to-end scenarios:

### 🔐 Authentication & Account

* User signup
* Account information
* Login with valid credentials
* Login with invalid credentials
* Mandatory field validation
* Email validation
* Password validation
* Password masking
* Logout
* Re-login
* Session validation

### 🛍️ Products

* Search products
* Add products to cart
* Add multiple products
* Validate product addition
* Product selection workflows

### 🛒 Cart

* Verify empty cart
* Add products to cart
* Verify products in cart
* Verify product details
* Remove products from cart
* Add the same product multiple times
* Continue shopping
* Cart validation after login

### 👤 Guest User Cart Flow

* Add product to cart without login
* Attempt checkout without login
* Validate login requirement
* Navigate to login page
* Login successfully
* Verify previously added products remain in the cart

### 💳 Checkout & Payment

* Navigate from cart to checkout
* Validate checkout flow
* Enter payment details
* Place order
* Validate successful order completion

---

## 🏗️ Framework Structure

```text
E2E/
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│
├── fixtures/
│   └── base.js
│
├── pages/
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── LoginPage.js
│   ├── PaymentPage.js
│   ├── ProductsPage.js
│   └── SignupPage.js
│
├── test-data/
│   ├── account-data.js
│   ├── cart-data.js
│   ├── login-data.js
│   └── signup-data.js
│
├── tests/
│   ├── account-information.spec.js
│   ├── cart.spec.js
│   ├── login.spec.js
│   ├── products.spec.js
│   └── signup.spec.js
│
├── .gitignore
├── global-setup.js
├── package.json
├── package-lock.json
├── playwright.config.js
├── Signup_Automation_Test_Cases.xlsx
└── README.md
```

The current repository is organized into separate **Page Objects, fixtures, test data, test specifications, configuration, global setup, and CI workflow**, making the framework easier to maintain and extend.

---

## 🧩 Framework Design

### Page Object Model

Each major application page has a dedicated Page Object containing:

* Locators
* Page actions
* Reusable methods
* Page-specific functionality

This keeps test cases clean and improves maintainability.

### Custom Fixtures

Custom Playwright fixtures are used to create reusable test setup and workflows, reducing duplication across test cases.

### Externalized Test Data

Test data is maintained separately from test specifications for better maintainability and reusability.

Test data is organized for:

* Signup
* Login
* Account information
* Cart scenarios

### Global Setup

Global setup is used for common initialization required before test execution.

### Failure Evidence

Playwright is configured to provide debugging artifacts such as:

* Screenshots
* Videos
* Traces

These artifacts help investigate failed test executions.

---

## ▶️ Getting Started

### Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git

### Clone the Repository

```bash
git clone https://github.com/karthikeyanV-30/E2E.git
```

### Navigate to the Project

```bash
cd E2E
```

### Install Dependencies

```bash
npm install
```

### Install Playwright Browsers

```bash
npx playwright install
```

---

## ▶️ Running Tests

### Run all tests

```bash
npx playwright test
```

### Run tests in headed mode

```bash
npx playwright test --headed
```

### Run a specific test file

```bash
npx playwright test tests/login.spec.js
```

### Run tests using Chromium

```bash
npx playwright test --project=chromium
```

---

## 📊 Test Reports

After test execution, open the Playwright HTML report using:

```bash
npx playwright show-report
```

The report provides test execution results and helps identify failed scenarios.

Failure artifacts such as screenshots, videos, and traces can also be used for debugging.

---

## 🔄 CI/CD

The framework is integrated with **GitHub Actions** for automated test execution.

The CI pipeline performs the following:

1. Checkout source code
2. Setup Node.js
3. Install project dependencies
4. Install Playwright browsers
5. Execute automated tests
6. Generate test results and artifacts

This enables the automation suite to run consistently in a CI environment.

---

## 📋 Test Documentation

Test scenarios and test-case documentation are maintained separately in:

```text
Signup_Automation_Test_Cases.xlsx
```

The documentation contains detailed test scenarios, test steps, test data, expected results, priority, and test type.

---

## 🎯 Key Automation Practices

This project demonstrates practical implementation of:

* End-to-End testing
* Functional testing
* Regression testing
* Positive & negative testing
* Authentication testing
* Session validation
* Product testing
* Cart testing
* Checkout testing
* Payment workflow testing
* Page Object Model
* Custom fixtures
* Test data management
* Dynamic test data
* Failure analysis
* HTML reporting
* CI/CD automation

---

## 📈 Future Enhancements

* API automation
* Database validation
* Cross-browser execution
* Parallel execution optimization
* Advanced reporting
* Environment-based configuration
* Enhanced logging
* Docker execution
* Accessibility testing

---

## 👨‍💻 Author

**Karthikeyan V**

QA Engineer | Manual & Automation Testing

**Skills:**
Playwright | JavaScript | Selenium | Java | API Testing | SQL | Git | GitHub Actions | TestNG

---

## 🔗 Repository

[GitHub Repository](https://github.com/karthikeyanV-30/E2E)
