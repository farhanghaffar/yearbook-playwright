const { test, expect } = require("@playwright/test");
const APPROVEFORPRODUCTIONMETHODS = require("../pages/approveForProduction/approveForProduction.methods");

test.describe('Approve for Production', () => {
    test('In Cover Approval, Previews are displayed correctly, mark checkbox and go to next step', async({page}) => {
        await APPROVEFORPRODUCTIONMETHODS.confirmCoverApprovalAndGoNext(page);
    });

    test('Turn ON Automated Page Numbering, check people, set checked I Aprove, go next', async({page}) => {
        await APPROVEFORPRODUCTIONMETHODS.confirmCoverApprovalAndGoNext(page);

        const selectAutomatedPageNumberingElement = await page.locator('select#pageNumbering');
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

        const iApproveCheckbox = await page.locator('input#confirmCheck');
        await iApproveCheckbox.setChecked(true);

        const confirmBtn = await page.getByRole('button').filter({hasText: 'Confirm and Go to Next Step'});
        await expect(confirmBtn).toBeVisible();
        await confirmBtn.click();

        const deliveryAddressPageTxt = await page.getByText('Delivery Address:');
        await expect(deliveryAddressPageTxt).toBeVisible();
    });
});