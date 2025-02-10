const { test, expect } = require("@playwright/test");
const DASHBOARDMETHODS = require("../pages/dashboard/dashboard.methods");
const DASHBOARDPAGE = require("../pages/dashboard/dashboard.page");
const LADDERPAGE = require("../pages/ladder/ladder.page");
const UPLOADPDFPAGE = require("../pages/uploadPDF/uploadPDF.page");
const UPLOADPDFMETHODS = require("../pages/uploadPDF/uploadPDF.methods");
const path = require("path");


test.describe('Upload PDF', () => {
    test('Upload popup work properly', async({page}) => {
        await DASHBOARDMETHODS.loadDashboard(page);

        const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
        await expect(myProjectsNavLink).toBeVisible();
        await myProjectsNavLink.click();

        const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject })
        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const uploadBtn = await page.getByRole('button').filter({hasText:'Upload'});
        const uploadPDFNOther = await page.getByRole('link').filter({hasText: 'Upload PDFs & Other'});
        
        await expect(uploadBtn).toBeVisible();
        
        await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
        await uploadBtn.click();

        const uploadPopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Upload Photos', has: uploadPDFNOther});
        await expect(uploadPopup.first()).toBeVisible();
        await expect(uploadPDFNOther).toBeVisible();
    });

    test('Files being upload, confirm upload & preview, delete file', async({page}) => {
        await DASHBOARDMETHODS.loadDashboard(page);

        const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
        await expect(myProjectsNavLink).toBeVisible();
        await myProjectsNavLink.click();

        const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject })
        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const uploadBtn = await page.getByRole('button').filter({hasText:'Upload'});
        const uploadPDFNOther = await page.getByRole('link').filter({hasText: 'Upload PDFs & Other'});
        await expect(uploadBtn).toBeVisible();
        await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
        await uploadBtn.click();

        const uploadPopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Upload Photos', has: uploadPDFNOther});
        await expect(uploadPopup.first()).toBeVisible();
        await expect(uploadPDFNOther).toBeVisible();
        await uploadPDFNOther.click();

        const uploadOtherHeading = await page.getByText('Upload Other Content');
        await expect(uploadOtherHeading).toBeVisible();
        const fileInput = await page.locator(UPLOADPDFPAGE.cssLocators.inputTypeFile);
        const pdfFilePath = await path.join(__dirname, '../pdf/sample-local-pdf.pdf');
        await expect(fileInput).toBeAttached()
        await fileInput.setInputFiles(pdfFilePath);

        const fileInQueueText = await page.getByText('file was added to queue');
        await expect(fileInQueueText).toBeVisible();

        const selectContentTypeElement = await page.locator(UPLOADPDFPAGE.cssLocators.contentTypeSelectElement);
        await expect(selectContentTypeElement).toBeVisible();
        await selectContentTypeElement.selectOption('DOCUMENT');

        const uploadFileBtn = await page.getByRole('button').filter({hasText: 'UPLOAD FILE'});
        await expect(uploadFileBtn).toBeVisible();
        await uploadFileBtn.click();

        const uploadCompletedText = await page.getByText('Upload Content Complete!');
        await expect(uploadCompletedText).toBeVisible();

        const viewFileBtn = await page.getByRole('button').filter({hasText: 'VIEW THIS FILE'});
        await expect(viewFileBtn).toBeVisible();
        await viewFileBtn.click();

        const page1 = await page.locator('#PCON_1');
        await expect(page1).toBeVisible();

        const page2 = await page.locator('#PCON_2');
        await expect(page2).toBeVisible();

        await UPLOADPDFMETHODS.deleteFile(page);
    });
})