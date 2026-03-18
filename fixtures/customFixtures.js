// fixtures/customFixtures.js
const { test: base } = require('@playwright/test');
const { LoginPage }   = require('../pages/Loginpage');
const { ProductsPage } = require('../pages/ProductsPage');
const { users }       = require('../utils/testdata');
const test = base.extend({
  // Fixture: gives you a logged-in page automatically
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);
    await use(page);   // test runs here
    // teardown (optional): await page.close();
  },

  // Fixture: gives you LoginPage object ready to use
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  // Fixture: gives you ProductsPage after auto-login
  productsPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(users.validUser.username, users.validUser.password);
    const productsPage = new ProductsPage(page);
    await use(productsPage);
  },

});

module.exports = { test };