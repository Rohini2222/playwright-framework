const { test }   = require('../../fixtures/customFixtures');
const { expect } = require('@playwright/test');
const { users }  = require('../../utils/testdata');
test.describe('Login Tests - Sauce Demo', () => {
    test('Valid user can login successfully', async ({ loginPage, page }) => {
    await loginPage.login(users.validUser.username, users.validUser.password);
    await expect(page).toHaveURL('/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('Locked user sees error message', async ({ loginPage }) => {
    await loginPage.login(users.lockedUser.username, users.lockedUser.password);
    const error = await loginPage.getError();
    expect(error).toContain('locked out');
  });

  test('Invalid credentials show error', async ({ loginPage }) => {
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);
    const error = await loginPage.getError();
    expect(error).toContain('Username and password do not match');
  });

});