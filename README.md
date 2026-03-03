# E-Commerce Test Automation Project

A comprehensive end-to-end test automation framework for the SauceDemo e-commerce application, built with Playwright and TypeScript using the Page Object Model design pattern.

## 📋 Project Overview

This project demonstrates professional test automation practices for a complete e-commerce user journey, covering 104 automated test cases across 7 core application modules.

**Test Coverage:**
- Login and Authentication (14 tests)
- Product Catalog (20 tests)
- Product Details (15 tests)
- Shopping Cart (16 tests)
- Checkout Process (24 tests)
- Order Confirmation (7 tests)
- Navigation and Menu (8 tests)

## 🛠️ Tech Stack

- **Test Framework:** Playwright
- **Language:** TypeScript
- **Design Pattern:** Page Object Model (POM)
- **CI/CD:** GitHub Actions
- **Cross-Browser Testing:** Chromium, Firefox, WebKit

## 🏗️ Project Structure

```
e-commerce-automation-project/
├── pages/                    # Page Object Model classes
│   ├── BasePage.ts          # Base page with common methods
│   ├── LoginPage.ts         # Login page actions
│   ├── ProductsPage.ts      # Product catalog page
│   ├── ProductDetailsPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── OrderConfirmationPage.ts
│   └── NavigationPage.ts
├── tests/                   # Test specifications
│   ├── login.spec.ts
│   ├── logout.spec.ts
│   ├── session.spec.ts
│   └── ... (20 test files)
├── playwright.config.ts     # Playwright configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/annavictoriaelano/e-commerce-automation-project.git
cd e-commerce-automation-project
```

2. Install dependencies
```bash
npm install
```

3. Install Playwright browsers
```bash
npx playwright install
```

## ▶️ Running Tests

### Run all tests
```bash
npx playwright test
```

### Run tests in headed mode
```bash
npx playwright test --headed
```

### Run specific test file
```bash
npx playwright test tests/login.spec.ts
```

### Run tests for specific module
```bash
npx playwright test tests/product-*.spec.ts
```

### Run tests in a specific browser
```bash
npx playwright test --project=chromium
```

### View test report
```bash
npx playwright show-report
```

## 📊 Test Execution

Tests are automatically executed on every push to the main branch via GitHub Actions, ensuring continuous validation across multiple browsers.

## 🎯 Key Features

- **Page Object Model:** Clean separation of test logic and page interactions
- **Cross-Browser Testing:** Validates functionality across Chromium, Firefox, and WebKit
- **Reusable Components:** BasePage class with common methods inherited by all page objects
- **Professional Git Workflow:** Feature branches, pull requests, and automated CI/CD
- **Comprehensive Coverage:** 104 automated test cases covering critical user journeys
- **Type Safety:** Full TypeScript implementation for better code quality

## 📝 Test Case Organization

Test cases follow a hierarchical naming convention:
- **Module ID:** M01, M02, etc.
- **Test Scenario ID:** TS01, TS02, etc.
- **Test Case ID:** TC01, TC02, etc.

Example: `M01_TS01_TC01` represents Module 01, Test Scenario 01, Test Case 01

## 🔄 CI/CD Pipeline

The project uses GitHub Actions to:
- Run all tests on every push to main branch
- Execute tests across multiple browsers in parallel
- Generate and store test reports as artifacts
- Ensure code quality before merging feature branches

## 👤 Author

**Anna Victoria Elano**
- Senior QA Engineer
- GitHub: https://github.com/annavictoriaelano

## 📄 License

This project is for demonstration purposes.
