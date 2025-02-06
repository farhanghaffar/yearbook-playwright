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

    test("Create new user, enter details, ensure its listing then delete the user", async ({page}) => {
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
        
        const randomID = GLOBALS.generate4DigitId();
        const newEmail = `farhan.qat123+${randomID}@gmail.com`;
        await checkUserIDInputField.fill(newEmail);

        const checkUserIDBtn = await page.getByRole('button').filter({hasText: 'Check User ID'});
        await expect(checkUserIDBtn).toBeVisible();
        await checkUserIDBtn.click();

        const memberNameInput = await page.locator('[name="member_name"]');
        await expect(memberNameInput).toBeVisible();
        await memberNameInput.fill('Test Name');

        const memberEmailInput = await page.locator('[name="member_email"]');
        await expect(memberEmailInput).toBeVisible();
        await memberEmailInput.fill(newEmail);

        const memberPhoneInput = await page.locator('[name="member_phone"]');
        await expect(memberPhoneInput).toBeVisible();
        await memberPhoneInput.fill("8239939482");

        const memberPasswordInput = await page.locator('[name="member_password"]');
        await expect(memberPasswordInput).toBeVisible();
        await memberPasswordInput.fill(newEmail);

        const memberConfirmPasswordInput = await page.locator('[name="confirm_member_password"]');
        await expect(memberConfirmPasswordInput).toBeVisible();
        await memberConfirmPasswordInput.fill(newEmail);

        const saveBtn = await page.getByRole('button').filter({hasText: 'Save User'});
        await expect(saveBtn.first()).toBeVisible();
        await saveBtn.first().click();

        const successMsg = await page.getByText('Member created successfully');
        await expect(successMsg).toBeVisible();

        const closePopupBtn = await page.getByRole('button').filter({hasText: 'Close'});
        await expect(closePopupBtn).toBeVisible();
        await closePopupBtn.click();

        const emailListed = await page.getByText(newEmail);
        await expect(emailListed.first()).toBeVisible();

        const emailRow = await page.locator('.grid-cols-4').filter({has: emailListed.first()});
        const deleteBtn = emailRow.getByRole('button').filter({hasText: 'Delete'});
        await expect(deleteBtn).toBeVisible();
        await deleteBtn.click();

        const userDeletedMsg = await page.getByText('User Deleted From Project!');
        await expect(userDeletedMsg).toBeVisible();

        const okBtn = await page.getByRole('button').filter({hasText: 'OK'});
        await expect(okBtn.first()).toBeVisible();
        await okBtn.click();
    })
});