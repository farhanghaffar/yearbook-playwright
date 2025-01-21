const { test, expect } = require("@playwright/test");
const DASHBOARDMETHODS = require("../pages/dashboard/dashboard.methods");
const DASHBOARDPAGE = require("../pages/dashboard/dashboard.page");
const LADDERPAGE = require("../pages/ladder/ladder.page");
const MANAGEDEADLINESPAGE = require("../pages/manageDeadlines/manageDeadlines.page");

test.describe('Manage Deadlines', () => {
    test('Information on the page is accurate', async({page}) => {
        await DASHBOARDMETHODS.loadDashboard(page);

        const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
        await expect(myProjectsNavLink).toBeVisible();
        await myProjectsNavLink.click();

        const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject })
        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
        const manageDeadlinesBtn = await page.getByRole('link').filter({hasText: 'Manage Deadlines'});
        
        await expect(manageButton).toBeVisible();
        
        await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
        await manageButton.click();

        const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: manageDeadlinesBtn});
        await expect(managePopup.first()).toBeVisible();
        await expect(manageDeadlinesBtn).toBeVisible();

        await manageDeadlinesBtn.click();

        const rowsWithDatesDetails = await page.locator(MANAGEDEADLINESPAGE.cssLocators.rowsWithDatesDetails);
        const today = new Date();

        // Normalize 'today' by setting it to midnight (ignore time part)
        today.setHours(0, 0, 0, 0);
        await page.waitForTimeout(2000);
        const rowsCount = await rowsWithDatesDetails.count();

        for (let i = 0; i < rowsCount; i++) {
            const currentRow = await rowsWithDatesDetails.nth(i);
            const dueDateElement = await currentRow.locator(MANAGEDEADLINESPAGE.cssLocators.dueDateElement);
            const dueDateText = await dueDateElement.getAttribute('title');
            const dueDate = new Date(dueDateText);

            // Normalize 'dueDate' by setting it to midnight (ignore time part)
            dueDate.setHours(0, 0, 0, 0);
        
            const daysUntilDeadlineElement = await currentRow.locator(MANAGEDEADLINESPAGE.cssLocators.daysUntilDeadlineElement);
            const daysUntilDeadlineText = await daysUntilDeadlineElement.textContent();
            const daysUntilDeadline = parseInt(daysUntilDeadlineText, 10);
        
            const timeDifference = dueDate - today;
            const expectedDaysRemaining = Math.ceil(timeDifference / (1000 * 3600 * 24)); // Convert milliseconds to days

            await expect(daysUntilDeadline).toBe(expectedDaysRemaining - 1);
          }
    });

    test('Clicking Request Proofbook Button redirect to EntourageProducts.asp', async({page}) => {
        await DASHBOARDMETHODS.loadDashboard(page);

        const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
        await expect(myProjectsNavLink).toBeVisible();
        await myProjectsNavLink.click();

        const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject })
        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
        const manageDeadlinesBtn = await page.getByRole('link').filter({hasText: 'Manage Deadlines'});
        
        await expect(manageButton).toBeVisible();
        
        await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
        await manageButton.click();

        const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: manageDeadlinesBtn});
        await expect(managePopup.first()).toBeVisible();
        await expect(manageDeadlinesBtn).toBeVisible();

        await manageDeadlinesBtn.click();

        const requestFirstProofBookBtn = await page.getByRole('link').filter({hasText: 'Request First Proof Book'});
        await page.waitForTimeout(2000);
        await expect(requestFirstProofBookBtn).toBeVisible();
        await requestFirstProofBookBtn.click();

        await expect(page.url()).toContain('EntourageProducts.asp');
    });
});