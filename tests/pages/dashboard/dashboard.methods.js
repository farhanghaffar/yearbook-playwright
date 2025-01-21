const { expect } = require("@playwright/test");
const { loginUser } = require("../login/login.methods");
const DASHBOARDPAGE = require("./dashboard.page");

const DASHBOARDMETHODS = {
    loadDashboard: async (page) => {
        await loginUser(page);

        const searchInput = await page.getByPlaceholder(DASHBOARDPAGE.placeholderLocators.searchField);
        await expect(searchInput).toBeVisible();

        // Nav Links to be visible
        const dashboardNavLink = await page.locator(DASHBOARDPAGE.cssLocators.dashboardLink);
        await expect(dashboardNavLink).toBeVisible();

        const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
        await expect(myProjectsNavLink).toBeVisible();

        const myContentNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myContentLink);
        await expect(myContentNavLink).toBeVisible();
    },
};

module.exports = DASHBOARDMETHODS;