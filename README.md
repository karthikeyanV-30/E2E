# 🎭 Playwright E2E Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-1.62.1-45ba4b)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow)
![GitHub Actions](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue)
![POM](https://img.shields.io/badge/Design%20Pattern-Page%20Object%20Model-orange)

## 📌 Project Overview

This project is an **End-to-End web automation framework** built using
**Playwright and JavaScript** for the Automation Exercise web application.

The framework automates key user authentication workflows including:

- User Signup
- Account Information
- User Login
- Logout and re-login validation

The framework follows the **Page Object Model (POM)** design pattern and
includes reusable fixtures, externalized test data, dynamic test data
generation, automated reporting, failure evidence, and GitHub Actions CI/CD.

---

## 🛠️ Tech Stack

- **Automation:** Playwright
- **Language:** JavaScript
- **Test Framework:** Playwright Test
- **Design Pattern:** Page Object Model (POM)
- **Version Control:** Git & GitHub
- **CI/CD:** GitHub Actions
- **Reporting:** Playwright HTML Report
- **IDE:** Visual Studio Code

---

## 🧪 Test Coverage

The framework currently contains **32 automated test scenarios** covering:

- Signup and user registration
- Account information validation
- Login with valid and invalid credentials
- Mandatory field validation
- Email and password validation
- Password masking
- Login and logout workflows
- Session validation
- End-to-end authentication workflows

Detailed test-case documentation is available in:

`E2E_Automation_Test_Cases.xlsx`

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
│   ├── LoginPage.js
│   └── SignupPage.js
│
├── test-data/
│   ├── account-data.js
│   └── signup-data.js
│
├── tests/
│   ├── signup.spec.js
│   ├── account-information.spec.js
│   └── login.spec.js
│
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.js
├── E2E_Automation_Test_Cases.xlsx
└── README.md

## 👨‍💻 Author

**Karthikeyan V**

QA Engineer | Manual & Automation Testing

**Automation:** Playwright | JavaScript | Selenium | Java

**Testing:** Functional | Regression | API | SQL

**Tools:** Git | GitHub | GitHub Actions | Postman | VS Code

---

## 🔗 Repository

[GitHub Repository](https://github.com/karthikeyanV-30/E2E)
