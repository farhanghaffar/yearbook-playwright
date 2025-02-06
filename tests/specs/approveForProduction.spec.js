const { test, expect } = require("@playwright/test");
const APPROVEFORPRODUCTIONMETHODS = require("../pages/approveForProduction/approveForProduction.methods");

test.describe('Approve for Production', () => {
    test('In Cover Approval, Previews are displayed correctly, mark checkbox and go to next step', async({page}) => {
        await APPROVEFORPRODUCTIONMETHODS.confirmCoverApprovalAndGoNext(page);
    });

    test('Turn ON Automated Page Numbering, check people, set checked I Aprove, go next', async({page}) => {
        await APPROVEFORPRODUCTIONMETHODS.confirmCoverApprovalAndGoNext(page);
        await APPROVEFORPRODUCTIONMETHODS.completeApproveCoverStep(page);
    });

    test('Delivery page loading properly and Fill in delivery details working', async({page}) => {
        await APPROVEFORPRODUCTIONMETHODS.confirmCoverApprovalAndGoNext(page);
        await APPROVEFORPRODUCTIONMETHODS.completeApproveCoverStep(page);
        await APPROVEFORPRODUCTIONMETHODS.fillInDeliveryDetails(page);
    });

    test('Select Target Delivery datae and go next', async ({page}) => {
        await APPROVEFORPRODUCTIONMETHODS.confirmCoverApprovalAndGoNext(page);
        await APPROVEFORPRODUCTIONMETHODS.completeApproveCoverStep(page);
        await APPROVEFORPRODUCTIONMETHODS.fillInDeliveryDetails(page);
        
        const targetDeliveryDateRow = await page.locator('tr').filter({hasText: 'Target Delivery Date'});
        await expect(targetDeliveryDateRow).toBeVisible();

        const targetDeliveryDateRadio = await targetDeliveryDateRow.locator('[name="deliveryDate"]');
        await expect(targetDeliveryDateRadio).toBeVisible();
        const targetDeliveryDateRadioChecked = await targetDeliveryDateRadio.isChecked();
        if(!targetDeliveryDateRadioChecked) {
            await targetDeliveryDateRadio.click();
        }
        await expect(targetDeliveryDateRadio).toBeChecked();

        await page.waitForTimeout(5000);

        const confirmBtn = await page.getByRole('button').filter({hasText: 'Confirm and Go to Next Step'});
        await expect(confirmBtn).toBeVisible();
        await confirmBtn.click();

        const setQuantityPageTxt = await page.getByText('Set Quantity:');
        await expect(setQuantityPageTxt).toBeVisible();

        const goyToStep5Btn = await page.getByRole('listitem').filter({hasText: 'Step 5 :'});
        await expect(goyToStep5Btn).toBeVisible();
        await goyToStep5Btn.click();

        const finalPageTxt = await page.getByText('Book Specifications:');
        await expect(finalPageTxt).toBeVisible();
    });
});