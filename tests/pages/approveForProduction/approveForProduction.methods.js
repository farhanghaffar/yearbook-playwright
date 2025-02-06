const { expect } = require("@playwright/test");
const DASHBOARDMETHODS = require("../../pages/dashboard/dashboard.methods");
const DASHBOARDPAGE = require("../../pages/dashboard/dashboard.page");
const LADDERPAGE = require("../../pages/ladder/ladder.page");
const APPROVEFORPRODUCTIONPAGE = require('./approveForProduction.page');

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
        await page.waitForTimeout(4500); // Temporarily so that test don't fail because of popup not loading on click of manage button
        await manageButton.click();
        
        const approveForProductionBtn = await page.getByRole('link').filter({hasText: 'Approve For Production'});
        const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: approveForProductionBtn});
        await expect(managePopup.first()).toBeVisible();        

        await expect(approveForProductionBtn).toBeVisible();
        await approveForProductionBtn.click();

        const productionPageText = await page.getByText('5 Steps to Approving Your Book');
        await expect(productionPageText).toBeVisible();

        const frame = await page.frameLocator(APPROVEFORPRODUCTIONPAGE.cssLocators.approveFrame);
        const canvas = await frame.locator(APPROVEFORPRODUCTIONPAGE.cssLocators.approveCanvas);
        await expect(canvas).toBeVisible();

        const confirmCheckbox = await page.locator(APPROVEFORPRODUCTIONPAGE.cssLocators.confirmCheck);
        const confirmCheckboxChecked = await confirmCheckbox.isChecked();
        if(!confirmCheckboxChecked) {
            await page.locator(APPROVEFORPRODUCTIONPAGE.cssLocators.confirmCheckLabel).click();
        }
        
        const confirmBtn = await page.getByRole('button').filter({hasText: 'Confirm and Go to Next Step'});
        await expect(confirmBtn).toBeVisible();
        await confirmBtn.click();

        const bookContentPageTxt = await page.getByText('Automated Page Numbering:');
        await expect(bookContentPageTxt).toBeVisible();
    },
    completeApproveCoverStep: async (page) => {
        const selectAutomatedPageNumberingElement = await page.locator(APPROVEFORPRODUCTIONPAGE.cssLocators.selectAutomatedPageNumberingElement);
        await expect(selectAutomatedPageNumberingElement).toBeVisible();
        await selectAutomatedPageNumberingElement.selectOption('true');

        const saveSettingsBtn = await page.getByRole('button').filter({ hasText: 'Save Settings'});
        await expect(saveSettingsBtn).toBeVisible();
        await saveSettingsBtn.click();

        const savedMsg = await page.getByText('You have updated your page numbering.');
        await expect(savedMsg).toBeVisible();

        const okBtn =  await page.getByRole('button').filter({ hasText: 'OK' });
        await expect(okBtn).toBeVisible();
        await okBtn.click();

        const startPeopleCheckBtn = await page.getByRole('button').filter({ hasText: 'Start People Check' });
        await expect(startPeopleCheckBtn).toBeVisible();
        await startPeopleCheckBtn.click();

        await page.waitForTimeout(3000);
        
        const confirmAdCheckbox = await page.locator(APPROVEFORPRODUCTIONPAGE.cssLocators.confirmAdCheck);
        const confirmAdChecked = await confirmAdCheckbox.isChecked();
        if(!confirmAdChecked) {
            await page.locator(APPROVEFORPRODUCTIONPAGE.cssLocators.confirmAdCheckLabel).click();
        }

        const iApproveCheckbox = await page.locator(APPROVEFORPRODUCTIONPAGE.cssLocators.iApproveCheckbox);
        const iApproveChecked = await iApproveCheckbox.isChecked();
        if(!iApproveChecked) {
            await page.locator(APPROVEFORPRODUCTIONPAGE.cssLocators.iApproveCheckboxLabel).click();
        }

        const confirmBtn = await page.getByRole('button').filter({hasText: 'Confirm and Go to Next Step'});
        await expect(confirmBtn).toBeVisible();
        await confirmBtn.click();

        const deliveryAddressPageTxt = await page.getByText('Delivery Address:');
        await expect(deliveryAddressPageTxt).toBeVisible();
    },
    fillInDeliveryDetails: async (page) => {
        const nameInput = page.locator(APPROVEFORPRODUCTIONPAGE.cssLocators.deliveryNameInput);
        await expect(nameInput).toBeVisible();
        await nameInput.fill('Test Name');
        
        const addressInput = page.locator(APPROVEFORPRODUCTIONPAGE.cssLocators.deliveryAddressInput);
        await expect(addressInput).toBeVisible();
        await addressInput.fill('Test Address');

        const addressTwoInput = page.locator(APPROVEFORPRODUCTIONPAGE.cssLocators.deliveryAddressTwoInput);
        await expect(addressTwoInput).toBeVisible();
        await addressTwoInput.fill('Test Address 2');

        const cityInput = page.locator(APPROVEFORPRODUCTIONPAGE.cssLocators.deliveryCityInput);
        await expect(cityInput).toBeVisible();
        await cityInput.fill('Test City');
        
        const stateInput = page.locator(APPROVEFORPRODUCTIONPAGE.cssLocators.deliveryStateInput);
        await expect(stateInput).toBeVisible();
        await stateInput.fill('Test State');
        
        const zipInput = page.locator(APPROVEFORPRODUCTIONPAGE.cssLocators.deliveryZipInput);
        await expect(zipInput).toBeVisible();
        await zipInput.fill('32123');
    }
};

module.exports = APPROVEFORPRODUCTIONMETHODS;