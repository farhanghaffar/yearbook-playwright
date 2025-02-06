const { expect } = require("@playwright/test");
const DASHBOARDMETHODS = require("../../pages/dashboard/dashboard.methods");
const DASHBOARDPAGE = require("../../pages/dashboard/dashboard.page");
const LADDERPAGE = require("../../pages/ladder/ladder.page");
const MANAGESALESPAGE = require("../../pages/manageSales/manageSales.page");

const MANAGESALESMETHODS = {
    turnOnSaleAndContinueToPriceNPurchasePage: async(page) => {
        await DASHBOARDMETHODS.loadDashboard(page);

        const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
        await expect(myProjectsNavLink).toBeVisible();
        await myProjectsNavLink.click();

        const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject })
        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const sellButton = await page.getByText('Sell', {exact: true});
        const manageYearbookSalesBtn = await page.getByRole('link').filter({hasText: 'Manage Yearbook Sales'});
        
        await expect(sellButton).toBeVisible();
        
        await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
        await sellButton.click();

        const sellPopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Setup LINK', has: manageYearbookSalesBtn});
        await expect(sellPopup.first()).toBeVisible();
        await expect(manageYearbookSalesBtn).toBeVisible();

        await manageYearbookSalesBtn.click();

        const bookSalesTxt =  await page.getByText("Manage your yearbook sales with Entourage's online sales tracking tools.");
        await expect(bookSalesTxt).toBeVisible();

        const inventoryAndApprovalSales = await page.locator(MANAGESALESPAGE.cssLocators.salesSteps).filter({hasText: 'Inventory and Approval Sales'});
        await expect(inventoryAndApprovalSales).toBeVisible();
        await inventoryAndApprovalSales.click();

        const inventoryAndApprovalSalesPageText = await page.getByText('Would you like to turn on online sales');
        await expect(inventoryAndApprovalSalesPageText).toBeVisible();

        const turnOnSalesBtn = await page.locator('div.bg-frame-background div.cursor-pointer').filter({hasText: 'Yes'});
        await expect(turnOnSalesBtn).toBeVisible();

        const turnOffSalesBtn = await page.locator('div.bg-frame-background div.cursor-pointer').filter({hasText: 'No'});
        await expect(turnOffSalesBtn).toBeVisible();

        const turnOffSalesBtnClassAttribute = await turnOffSalesBtn.getAttribute('class');
        
        if(turnOffSalesBtnClassAttribute.includes('bg-disabled')) {
            await turnOnSalesBtn.click();
            
            await page.waitForTimeout(2500);
        }

        const turnOnSalesBtnClassAttribute = await turnOnSalesBtn.getAttribute('class');
        await expect(turnOnSalesBtnClassAttribute).toContain('bg-blue-900');

        const turnOnPostApprovalSalesBtn = await page.locator('p+div.flex div.cursor-pointer').filter({hasText: 'On'});
        await expect(turnOnPostApprovalSalesBtn).toBeVisible();

        const turnOffPostApprovalSalesBtn = await page.locator('p+div.flex div.cursor-pointer').filter({hasText: 'Off'});
        await expect(turnOffPostApprovalSalesBtn).toBeVisible();

        const turnOffPostApprovalBtnClassAttribute = await turnOffPostApprovalSalesBtn.getAttribute('class');

        if(turnOffPostApprovalBtnClassAttribute.includes('bg-disabled')) {
            await turnOnPostApprovalSalesBtn.click();

            await page.waitForTimeout(2500);
        }

        const turnOnPostApprovalSalesBtnClassAttribute = await turnOnPostApprovalSalesBtn.getAttribute('class');
        await expect(turnOnPostApprovalSalesBtnClassAttribute).toContain('bg-blue-900');

        const priceInputField = await page.locator('input[name="price"]');
        await expect(priceInputField).toBeVisible();
        await expect(priceInputField).toHaveValue(/^\d+(\.\d+)?$/);

        const continueBtn = await page.getByRole('button').filter({ hasText: 'Continue' });
        await expect(continueBtn).toBeVisible();
        await expect(continueBtn).not.toBeDisabled();
        await continueBtn.click();

        const priceNPurchasePageTxt = await page.getByText('How much do you want to sell your yearbooks for?');
        await expect(priceNPurchasePageTxt).toBeVisible();
    },
    turnOnSaleAndAddTwoDeadlines: async(page) => {
        await MANAGESALESMETHODS.turnOnSaleAndContinueToPriceNPurchasePage(page);

        const productPrice = await page.locator(MANAGESALESPAGE.cssLocators.productPrice);
        await expect(productPrice).toBeVisible();
        await productPrice.inputValue(0.02);

        const primaryDeadline = await page.locator(MANAGESALESPAGE.cssLocators.primaryDeadline);
        await expect(primaryDeadline).toBeVisible();

        const secondPrice = await page.locator(MANAGESALESPAGE.cssLocators.secondPrice);
        const secondPriceVisible = await secondPrice.isVisible();

        const secondDeadline = await page.locator(MANAGESALESPAGE.cssLocators.secondDeadline);

        const addDeadlineBtn = await page.getByRole('button').filter({hasText: 'Add Deadline'});
        await expect(addDeadlineBtn).toBeVisible();

        if(!secondPriceVisible) {
            addDeadlineBtn.click();
            await expect(secondPrice).toBeVisible();
        }

        await expect(secondDeadline).toBeVisible();

        await secondPrice.inputValue(0.04);
        await secondDeadline.inputValue('2026-01-31');
    }
};

module.exports = MANAGESALESMETHODS;