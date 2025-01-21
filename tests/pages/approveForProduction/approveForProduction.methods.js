const { expect } = require("@playwright/test");
const DASHBOARDMETHODS = require("../../pages/dashboard/dashboard.methods");
const DASHBOARDPAGE = require("../../pages/dashboard/dashboard.page");
const LADDERPAGE = require("../../pages/ladder/ladder.page");

const APPROVEFORPRODUCTIONMETHODS = {
    confirmCoverApprovalAndGoNext: async (page) => {
        await DASHBOARDMETHODS.loadDashboard(page);

        const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
        await expect(myProjectsNavLink).toBeVisible();
        await myProjectsNavLink.click();

        const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject })
        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
        await expect(manageButton).toBeVisible();
        await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
        await manageButton.click();
        
        const approveForProductionBtn = await page.getByRole('link').filter({hasText: 'Approve For Production'});
        const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: approveForProductionBtn});
        await expect(managePopup.first()).toBeVisible();        

        await expect(approveForProductionBtn).toBeVisible();
        await approveForProductionBtn.click();

        const productionPageText = await page.getByText('5 Steps to Approving Your Book');
        await expect(productionPageText).toBeVisible();

        const frame = await page.frameLocator('#threeD_model_space');
        const canvas = await frame.locator('#coverModelPreview');
        await expect(canvas).toBeVisible();

        const confirmCheckbox = await page.locator('input#confirmCheck');
        const confirmCheckboxChecked = await confirmCheckbox.isChecked();
        if(!confirmCheckboxChecked) {
            await confirmCheckbox.setChecked(true);
        }
        
        const confirmBtn = await page.getByRole('button').filter({hasText: 'Confirm and Go to Next Step'});
        await expect(confirmBtn).toBeVisible();
        await confirmBtn.click();

        const bookContentPageTxt = await page.getByText('Automated Page Numbering:');
        await expect(bookContentPageTxt).toBeVisible();
    }
};

module.exports = APPROVEFORPRODUCTIONMETHODS;