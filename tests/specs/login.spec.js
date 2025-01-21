const { test, expect } = require('@playwright/test');
const GLOBALS = require('../utils/globals');
const LOGINPAGE = require('../pages/login/login.page');
const LOGINMETHODS = require('../pages/login/login.methods');

test.describe('Login ', () => {
    test.beforeEach(async({page}) => {
        await GLOBALS.goToPage(page, GLOBALS.baseURL);
    });

    test.afterEach(async({page}) => {
        await GLOBALS.closePage(page);
    });

    test('Login success on valid credentials', async({page}) => {
        await LOGINMETHODS.loginUser(page);
    });

    test('Empty Fields Login Fails', async({page}) => {
        const userIDField = await page.getByPlaceholder(LOGINPAGE.placeholderLocators.userIDField);
        await expect(userIDField).toBeVisible();

        const passwordField = await page.getByPlaceholder(LOGINPAGE.placeholderLocators.passwordField);
        await expect(passwordField).toBeVisible();

        const loginButton = await page.locator(LOGINPAGE.classLocators.loginButton, { hasText: LOGINPAGE.classLocators.loginButtonText });
        await expect(loginButton).toBeVisible();
        await loginButton.click();

        await expect(userIDField).toBeFocused();
    });

    test('Empty UserID Field Login Fails', async({page}) => {
        const userIDField = await page.getByPlaceholder(LOGINPAGE.placeholderLocators.userIDField);
        await expect(userIDField).toBeVisible();

        const passwordField = await page.getByPlaceholder(LOGINPAGE.placeholderLocators.passwordField);
        await expect(passwordField).toBeVisible();
        await passwordField.fill(GLOBALS.validPassword);

        const loginButton = await page.locator(LOGINPAGE.classLocators.loginButton, { hasText: LOGINPAGE.classLocators.loginButtonText });
        await expect(loginButton).toBeVisible();
        await loginButton.click();

        await expect(userIDField).toBeFocused();
    });

    test('Empty Password Field Login Fails', async({page}) => {
        const userIDField = await page.getByPlaceholder(LOGINPAGE.placeholderLocators.userIDField);
        await expect(userIDField).toBeVisible();
        await userIDField.fill(GLOBALS.validUserID);

        const passwordField = await page.getByPlaceholder(LOGINPAGE.placeholderLocators.passwordField);
        await expect(passwordField).toBeVisible();

        const loginButton = await page.locator(LOGINPAGE.classLocators.loginButton, { hasText: LOGINPAGE.classLocators.loginButtonText });
        await expect(loginButton).toBeVisible();
        await loginButton.click();

        await expect(passwordField).toBeFocused();
    });

    test('Login fails on invalid User ID', async({page}) => {
        const userIDField = await page.getByPlaceholder(LOGINPAGE.placeholderLocators.userIDField);
        await expect(userIDField).toBeVisible();
        await userIDField.fill(GLOBALS.invalidUserID);

        const passwordField = await page.getByPlaceholder(LOGINPAGE.placeholderLocators.passwordField);
        await expect(passwordField).toBeVisible();
        await passwordField.fill(GLOBALS.validPassword);

        const loginButton = await page.locator(LOGINPAGE.classLocators.loginButton, { hasText: LOGINPAGE.classLocators.loginButtonText });
        await expect(loginButton).toBeVisible();
        await loginButton.click();

        const errorMessage = await page.getByText('These credentials do not match our records.')
        await expect(errorMessage).toBeVisible();

        const dashboardHeading = await page.getByRole('heading', {name: 'Dashboard'}); 
        await expect(dashboardHeading).not.toBeVisible();
    });

    test('Login fails on invalid password', async({page}) => {
        const userIDField = await page.getByPlaceholder(LOGINPAGE.placeholderLocators.userIDField);
        await expect(userIDField).toBeVisible();
        await userIDField.fill(GLOBALS.invalidUserID);

        const passwordField = await page.getByPlaceholder(LOGINPAGE.placeholderLocators.passwordField);
        await expect(passwordField).toBeVisible();
        await passwordField.fill(GLOBALS.invalidPassword);

        const loginButton = await page.locator(LOGINPAGE.classLocators.loginButton, { hasText: LOGINPAGE.classLocators.loginButtonText });
        await expect(loginButton).toBeVisible();
        await loginButton.click();

        const errorMessage = await page.getByText('These credentials do not match our records.');
        await expect(errorMessage).toBeVisible();

        const dashboardHeading = await page.getByRole('heading', {name: 'Dashboard'}); 
        await expect(dashboardHeading).not.toBeVisible();
    });
})