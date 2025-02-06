const { test, expect } = require("@playwright/test");
const DASHBOARDMETHODS = require("../pages/dashboard/dashboard.methods");
const DASHBOARDPAGE = require("../pages/dashboard/dashboard.page");


test.describe('Dashboard', () => {
    test('Dashboard Loads Properly', async({page}) => {
        await DASHBOARDMETHODS.loadDashboard(page);
    });

    test('Associated Projects list on clicking My Projects', async({page}) => {
        await DASHBOARDMETHODS.loadDashboard(page);

        const myProjectsLink = await page.locator(DASHBOARDPAGE.cssLocators.myContentLink);
        await myProjectsLink.click();

        const myProjectsHeading = await page.getByRole('heading', { name: 'My Projects', level: 3 })
        await expect(myProjectsHeading).toBeVisible();

        const listedProject = await page.getByText(DASHBOARDPAGE.textLocators.listedProject);
        await expect(listedProject).toBeVisible();
    });
});