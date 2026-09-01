# 🎭 Playwright E2E Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-1.62.1-45ba4b)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue)
![POM](https://img.shields.io/badge/Design%20Pattern-Page%20Object%20Model-orange)

## 📌 Project Overview

This project is an **end-to-end web automation framework built using Playwright and JavaScript**.

The framework automates the **Signup and Account Information workflows** of the Automation Exercise web application.

It follows the **Page Object Model (POM)** design pattern and includes reusable fixtures, externalized test data, automated reporting, failure evidence, and GitHub Actions CI/CD integration.

---

## 🛠️ Tech Stack

* **Automation:** Playwright
* **Language:** JavaScript
* **Framework:** Playwright Test
* **Design Pattern:** Page Object Model (POM)
* **Version Control:** Git & GitHub
* **CI/CD:** GitHub Actions
* **Reporting:** Playwright HTML Report
* **IDE:** Visual Studio Code

---

## 🧪 Test Coverage

The framework currently contains **20 automated test scenarios** covering:

### Signup

* Signup/Login page accessibility
* New user registration
* Mandatory Name validation
* Mandatory Email validation
* Invalid Email validation
* Duplicate Email validation

### Account Information

* Account Information page validation
* Title selection
* Name validation
* Email field validation
* Password field validation
* Password masking
* First Name validation
* Last Name validation
* Address validation
* Zipcode validation
* Mobile Number validation
* Successful account creation
* Registration flow validation

**Total: 20 automated scenarios**

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
│   └── SignupPage.js
│
├── test-data/
│   ├── account-data.js
│   └── signup-data.js
│
├── tests/
│   ├── signup.spec.js
│   └── account-information.spec.js
│
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
├── Signup_Automation_Test_Cases.xlsx
└── README.md
```

---

## ⭐ Key Features

* Page Object Model architecture
* Custom Playwright fixtures
* Reusable page methods
* Externalized test data
* Dynamic test data generation
* Positive and negative testing
* Form validation testing
* End-to-end user registration
* Screenshot capture on failure
* Trace capture on failure
* Video capture on failure
* HTML test reporting
* GitHub Actions CI/CD

---

## 🔄 Test Execution Flow

```text
Test Specification
        ↓
Custom Fixture
        ↓
Page Object
        ↓
Web Application
        ↓
Assertions
        ↓
Test Report
        ↓
Screenshot / Trace / Video
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/karthikeyanV-30/E2E.git
```

### Navigate to the project

```bash
cd E2E
```

### Install dependencies

```bash
npm ci
```

### Install Playwright browsers

```bash
npx playwright install
```

---

## ▶️ Run Tests

### Run all tests

```bash
npx playwright test
```

### Run tests in headed mode

```bash
npx playwright test --headed
```

### Run Signup tests

```bash
npx playwright test tests/signup.spec.js
```

### Run Account Information tests

```bash
npx playwright test tests/account-information.spec.js
```

---

## 📊 Test Reporting

The framework generates a **Playwright HTML report** after test execution.

Open the report using:

```bash
npx playwright show-report
```

The report provides:

* Test status
* Execution duration
* Test steps
* Assertion results
* Failure details
* Screenshots
* Traces
* Videos when available

---

## 🔍 Failure Evidence

When a test fails, the framework is configured to capture:

```text
❌ Test Failure
      │
      ├── 📸 Screenshot
      ├── 🔎 Trace
      └── 🎥 Video
```

These artifacts help investigate and reproduce failures efficiently.

---

## 🔄 CI/CD

The project uses **GitHub Actions** to execute the Playwright test suite automatically.

The workflow performs:

```text
Checkout Code
      ↓
Setup Node.js
      ↓
Install Dependencies
      ↓
Install Playwright
      ↓
Run Tests
      ↓
Upload Playwright Report
```

The workflow is configured for the project's GitHub branches and pull requests.

---

## 📋 Test Case Documentation

Manual test-case documentation is included in:

```text
Signup_Automation_Test_Cases.xlsx
```

This provides traceability between the designed test scenarios and the automated test cases.

---

## 💡 QA Practices Demonstrated

* Functional Testing
* Positive Testing
* Negative Testing
* Form Validation
* End-to-End Testing
* Test Case Design
* UI Automation
* Page Object Model
* Test Data Management
* Test Reporting
* Failure Analysis
* Git & GitHub
* CI/CD with GitHub Actions

---

## 👨‍💻 Author

**Karthikeyan V**

QA Engineer | Manual & Automation Testing

**Automation:** Playwright | JavaScript | Selenium | Java

**Testing:** Functional | Regression | API | SQL

**Tools:** Git | GitHub | GitHub Actions | Postman | VS Code

---

## 🔗 Repository

[GitHub Repository](https://github.com/karthikeyanV-30/E2E)
