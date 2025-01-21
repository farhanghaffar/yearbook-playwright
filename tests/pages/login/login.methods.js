const { expect } = require("@playwright/test");
const GLOBALS = require("../../utils/globals");
const LOGINPAGE = require("./login.page");

const LOGINMETHODS = {
    loginUser: async (page) => {
        await GLOBALS.goToPage(page, GLOBALS.baseURL);

        const userIDField = await page.getByPlaceholder(LOGINPAGE.placeholderLocators.userIDField);
        await expect(userIDField).toBeVisible();
        await userIDField.fill(GLOBALS.validUserID);

        const passwordField = await page.getByPlaceholder(LOGINPAGE.placeholderLocators.passwordField);
        await expect(passwordField).toBeVisible();
        await passwordField.fill(GLOBALS.validPassword);

        const loginButton = await page.locator(LOGINPAGE.classLocators.loginButton, { hasText: LOGINPAGE.classLocators.loginButtonText });
        await expect(loginButton).toBeVisible();
        await page.waitForTimeout(2000);
        await loginButton.click();

        await page.waitForTimeout(2000);
        const dashboardHeading = await page.getByRole('heading', {name: 'Dashboard'}); 
        await expect(dashboardHeading).toBeVisible();
    }
}

module.exports = LOGINMETHODS;