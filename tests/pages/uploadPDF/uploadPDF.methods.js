const { expect } = require("@playwright/test");

const UPLOADPDFMETHODS = {
    deleteFile: async(page) => {
        const deleteBtn =  await page.getByRole('button').filter({hasText: 'Delete File'});
        await expect(deleteBtn).toBeVisible();
        page.on('dialog', dialog => dialog.accept());
        await deleteBtn.click();

        const manageUploadedPagesText = await page.getByText('Manage Uploaded Pages');
        await expect(manageUploadedPagesText).toBeVisible();
    }
}

module.exports = UPLOADPDFMETHODS;