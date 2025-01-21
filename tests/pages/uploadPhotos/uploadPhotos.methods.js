const { expect } = require("@playwright/test");

const UPLOADPHOTOSMETHODS = {
    deleteAllUploadedPhotos: async(page) => {
        const selectAllPhotosBtn = await page.getByRole('button').filter({hasText: 'Select All Photos'});
        await expect(selectAllPhotosBtn).toBeVisible();
        await selectAllPhotosBtn.click();

        const deleteSelectedBtn = await page.getByRole('button').filter({hasText: 'Delete Selected'});
        await expect(deleteSelectedBtn).toBeVisible();
        await deleteSelectedBtn.click();

        const confirmationYesBtn =  await page.getByRole('button').filter({hasText: 'Yes'});
        await expect(confirmationYesBtn).toBeVisible();
        await confirmationYesBtn.click();

        const noPhotosFound = await page.getByText('Photos deleted successfully');
        await expect(noPhotosFound).toBeVisible();
    },
};

module.exports =  UPLOADPHOTOSMETHODS;