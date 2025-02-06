const { test, expect } = require("@playwright/test");
const MANAGESALESMETHODS = require("../pages/manageSales/manageSales.methods");
const MANAGESALESPAGE = require("../pages/manageSales/manageSales.page");
const { randomInt } = require("crypto");

test.describe('Manage Sales', () => {
    test('Turn on sale, allow post approval sales, ensure value displays and continue', async({page}) => {
        await MANAGESALESMETHODS.turnOnSaleAndContinueToPriceNPurchasePage(page);
    });

    test('Enter values in price & deadline fields + add another deadline field if there is not one already', async({page}) => {
        await MANAGESALESMETHODS.turnOnSaleAndAddTwoDeadlines(page);
    });

    test('On changing current inventory value, remaining inventory value also changes', async({page}) => {
        await MANAGESALESMETHODS.turnOnSaleAndAddTwoDeadlines(page);

        const currentInventoryInput =  await page.locator(MANAGESALESPAGE.cssLocators.currentInventoryInput);
        await expect(currentInventoryInput).toBeVisible();
        const randomNumber = randomInt(10);
        await currentInventoryInput.click();
        await currentInventoryInput.clear();
        await page.waitForTimeout(2000)
        await currentInventoryInput.pressSequentially(`${randomNumber}`);
        await expect(await currentInventoryInput.inputValue()).toBe(`${randomNumber}`);
        
        const remainingInventoryInput = await page.locator(MANAGESALESPAGE.cssLocators.remainingInventoryInput);
        await expect(remainingInventoryInput).toBeVisible();
        await page.waitForTimeout(2000);
        const currentInventoryValue = await currentInventoryInput.inputValue();
        await page.waitForTimeout(2000);
        const remainingInventoryValue = await remainingInventoryInput.inputValue();
        await expect(currentInventoryValue).toBe(remainingInventoryValue);
    });

    test('Continue Shipping section and Save information on Product information screen', async({page}) => {
        await MANAGESALESMETHODS.turnOnSaleAndAddTwoDeadlines(page);

        const currentInventoryInput =  await page.locator(MANAGESALESPAGE.cssLocators.currentInventoryInput);
        await expect(currentInventoryInput).toBeVisible();
        const randomNumber = randomInt(10);
        await currentInventoryInput.click();
        await currentInventoryInput.clear();
        await page.waitForTimeout(2000)
        await currentInventoryInput.pressSequentially(`${randomNumber}`);
        await expect(await currentInventoryInput.inputValue()).toBe(`${randomNumber}`);
        
        const remainingInventoryInput = await page.locator(MANAGESALESPAGE.cssLocators.remainingInventoryInput);
        await expect(remainingInventoryInput).toBeVisible();
        await page.waitForTimeout(2000);
        const currentInventoryValue = await currentInventoryInput.inputValue();
        await page.waitForTimeout(2000);
        const remainingInventoryValue = await remainingInventoryInput.inputValue();
        await expect(currentInventoryValue).toBe(remainingInventoryValue);

        const continueBtn = await page.getByRole('button').filter({hasText: 'Continue'});
        await expect(continueBtn).toBeVisible();
        await continueBtn.click();

        const shippingPageText = await page.getByText('What shipping options are available');
        await expect(shippingPageText).toBeVisible();
        await continueBtn.click();

        const saveBtn = await page.getByRole('button').filter({hasText: 'Save'});
        await expect(saveBtn).toBeVisible();
        await saveBtn.click();

        const saveSuccessMsg = await page.getByText('Setup Online Sales Information Configured!');
        await expect(saveSuccessMsg).toBeVisible();
        
        const okBtn =  await page.getByRole('button').filter({hasText: 'OK'});
        await expect(okBtn).toBeVisible();
        await okBtn.click();
    });
});