const { test, expect } = require("@playwright/test");
const DASHBOARDMETHODS = require("../pages/dashboard/dashboard.methods");
const DASHBOARDPAGE = require("../pages/dashboard/dashboard.page");
const LADDERPAGE = require("../pages/ladder/ladder.page");
const GLOBALS = require("../utils/globals");
const MANAGEUSERSPAGE = require("../pages/manageUsers/manageUsers.page");


test.describe('Manage Users', () => {
    test('Existing users are being listed properly', async ({page}) => {
        await DASHBOARDMETHODS.loadDashboard(page);

        const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
        await expect(myProjectsNavLink).toBeVisible();
        await myProjectsNavLink.click();

        const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject })
        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
        const manageUsersBtn = await page.getByRole('link').filter({hasText: 'Manage Users'});
        await expect(manageButton).toBeVisible();
        await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
        await manageButton.click();

        const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: manageUsersBtn});
        await expect(managePopup.first()).toBeVisible();
        await expect(manageUsersBtn).toBeVisible();
        await manageUsersBtn.click();

        const deleteBtns = await page.getByRole('button').filter({hasText: 'Delete'});
        await page.waitForTimeout(3000);
        const deleteBtnsCount = await deleteBtns.count();
        await expect(deleteBtnsCount).toBeGreaterThanOrEqual(1);
    });

    test("Creating new user with existing user's ID show error dialog", async ({page}) => {
        await DASHBOARDMETHODS.loadDashboard(page);

        const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
        await expect(myProjectsNavLink).toBeVisible();
        await myProjectsNavLink.click();

        const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject })
        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
        const manageUsersBtn = await page.getByRole('link').filter({hasText: 'Manage Users'});
        await expect(manageButton).toBeVisible();
        await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
        await manageButton.click();

        const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: manageUsersBtn});
        await expect(managePopup.first()).toBeVisible();
        await expect(manageUsersBtn).toBeVisible();
        await manageUsersBtn.click();

        const createNewUserBtn = await page.getByRole('link').filter({hasText: 'Create New User'});
        await expect(createNewUserBtn).toBeVisible();
        await createNewUserBtn.click();

        const createNewUserPageHeading = await page.getByText('Invite or Create New User');
        await expect(createNewUserPageHeading).toBeVisible();

        const checkUserIDInputField =  await page.locator(MANAGEUSERSPAGE.cssLocators.checkUserIDInputField);
        await expect(checkUserIDInputField).toBeVisible();
        await checkUserIDInputField.fill(GLOBALS.validUserID);

        const checkUserIDBtn = await page.getByRole('button').filter({hasText: 'Check User ID'});
        await expect(checkUserIDBtn).toBeVisible();
        await checkUserIDBtn.click();

        const alertMessage = await page.getByText(MANAGEUSERSPAGE.textLocators.userExistsAlertMessage);
        await expect(alertMessage).toBeVisible();
    });
});