const UPLOADPHOTOSMETHODS = require("../pages/uploadPhotos/uploadPhotos.methods");
const UPLOADPHOTOSPAGE = require("../pages/uploadPhotos/uploadPhotos.page");
const DASHBOARDMETHODS = require("../pages/dashboard/dashboard.methods");
const DASHBOARDPAGE = require("../pages/dashboard/dashboard.page");
const LADDERPAGE = require("../pages/ladder/ladder.page");
const { test, expect } = require("@playwright/test");
const GLOBALS = require("../utils/globals");
const path =  require("path");

test.describe('Upload Photos', () => {
   test('Upload modal opens properly on clicking Upload Photos', async({page}) => {
        await DASHBOARDMETHODS.loadDashboard(page);

        const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
        await expect(myProjectsNavLink).toBeVisible();
        await myProjectsNavLink.click();

        const listedProject = await page.getByRole('link', { name: 'Freedom Approval Test 2026' });
        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
        await expect(manageButton).toBeVisible();
        await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
        await manageButton.click();
        
        const managePhotosBtn = await page.getByRole('link').filter({hasText: 'Manage Photos'});
        const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: managePhotosBtn});
        await expect(managePopup.first()).toBeVisible();

        await expect(managePhotosBtn).toBeVisible();
        await managePhotosBtn.click();

        const uploadPhotosBtn = await page.getByRole('button').filter({hasText: 'Upload Photos'});
        await expect(uploadPhotosBtn).toBeVisible();
        await uploadPhotosBtn.click();

        const uploadPhotosPopup = await page.locator(UPLOADPHOTOSPAGE.cssLocators.uploadPhotosPopup).filter({hasText: 'Drop files here'});
        await expect(uploadPhotosPopup).toBeVisible();
   });

   test('Selecting input files working properly', async({page}) => {
      await DASHBOARDMETHODS.loadDashboard(page);

      const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
      await expect(myProjectsNavLink).toBeVisible();
      await myProjectsNavLink.click();

      const listedProject = await page.getByRole('link', { name: 'Freedom Approval Test 2026' });
      await expect(listedProject).toBeVisible();
      await listedProject.click();
      
      const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
      await expect(manageButton).toBeVisible();
      await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
      await manageButton.click();
      
      const managePhotosBtn = await page.getByRole('link').filter({hasText: 'Manage Photos'});

      const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: managePhotosBtn});
      await expect(managePopup.first()).toBeVisible();

      await expect(managePhotosBtn).toBeVisible();
      await managePhotosBtn.click();

      const uploadPhotosBtn = await page.getByRole('button').filter({hasText: 'Upload Photos'});
      await expect(uploadPhotosBtn).toBeVisible();
      await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
      await uploadPhotosBtn.click();

      const uploadPhotosPopup = await page.locator(UPLOADPHOTOSPAGE.cssLocators.uploadPhotosPopup).filter({hasText: 'Drop files here'});
      await expect(uploadPhotosPopup).toBeVisible();

      const uploadFilesBtn = await page.getByRole('button').filter({hasText: 'browse files'});
      await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
      await expect(uploadFilesBtn).toBeVisible();

      const folderPath = path.join(__dirname, '../images/');
      const filesToUpload = GLOBALS.getFilesInFolder(folderPath);
      const filesInput =  await page.locator(UPLOADPHOTOSPAGE.cssLocators.uploadFilesInput);
      await filesInput.first().setInputFiles(filesToUpload);
   });

   test('All selected files must be in queue', async({page}) => {
      await DASHBOARDMETHODS.loadDashboard(page);

      const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
      await expect(myProjectsNavLink).toBeVisible();
      await myProjectsNavLink.click();

      const listedProject = await page.getByRole('link', { name: 'Freedom Approval Test 2026' });
      await expect(listedProject).toBeVisible();
      await listedProject.click();
      
      const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
      await expect(manageButton).toBeVisible();
      await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
      await manageButton.click();
      
      const managePhotosBtn = await page.getByRole('link').filter({hasText: 'Manage Photos'});

      const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: managePhotosBtn});
      await expect(managePopup.first()).toBeVisible();

      await expect(managePhotosBtn).toBeVisible();
      await managePhotosBtn.click();

      const uploadPhotosBtn = await page.getByRole('button').filter({hasText: 'Upload Photos'});
      await expect(uploadPhotosBtn).toBeVisible();
      await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
      await uploadPhotosBtn.click();

      const uploadPhotosPopup = await page.locator(UPLOADPHOTOSPAGE.cssLocators.uploadPhotosPopup).filter({hasText: 'Drop files here'});
      await expect(uploadPhotosPopup).toBeVisible();

      const uploadFilesBtn = await page.getByRole('button').filter({hasText: 'browse files'});
      await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
      await expect(uploadFilesBtn).toBeVisible();

      const folderPath = path.join(__dirname, '../images/');
      const filesToUpload = GLOBALS.getFilesInFolder(folderPath);
      const filesInput =  await page.locator(UPLOADPHOTOSPAGE.cssLocators.uploadFilesInput);
      await filesInput.first().setInputFiles(filesToUpload);

      for(const e of filesToUpload) {
         const elementStart = path.basename(e).slice(0, 12);
         const elementEnd = path.basename(e).slice(-10, -1);
         const element = await page.locator(UPLOADPHOTOSPAGE.cssLocators.imageItemName).filter({hasText: elementStart}).filter({hasText: elementEnd});
         await expect(element.first()).toBeVisible();
      }
   });

   test('Progress bar loading properly', async({page}) => {
      await DASHBOARDMETHODS.loadDashboard(page);

      const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
      await expect(myProjectsNavLink).toBeVisible();
      await myProjectsNavLink.click();

      const listedProject = await page.getByRole('link', { name: 'Freedom Approval Test 2026' });
      await expect(listedProject).toBeVisible();
      await listedProject.click();
      
      const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
      await expect(manageButton).toBeVisible();
      await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
      await manageButton.click();
      
      const managePhotosBtn = await page.getByRole('link').filter({hasText: 'Manage Photos'});

      const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: managePhotosBtn});
      await expect(managePopup.first()).toBeVisible();

      await expect(managePhotosBtn).toBeVisible();
      await managePhotosBtn.click();

      const uploadPhotosBtn = await page.getByRole('button').filter({hasText: 'Upload Photos'});
      await expect(uploadPhotosBtn).toBeVisible();
      await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
      await uploadPhotosBtn.click();

      const uploadPhotosPopup = await page.locator(UPLOADPHOTOSPAGE.cssLocators.uploadPhotosPopup).filter({hasText: 'Drop files here'});
      await expect(uploadPhotosPopup).toBeVisible();
      
      const uploadFilesBtn = await page.getByRole('button').filter({hasText: 'browse files'});
      await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
      await expect(uploadFilesBtn).toBeVisible();

      const folderPath = path.join(__dirname, '../images/');
      const filesToUpload = GLOBALS.getFilesInFolder(folderPath);
      const filesInput =  await page.locator(UPLOADPHOTOSPAGE.cssLocators.uploadFilesInput);
      await filesInput.first().setInputFiles(filesToUpload);

      for(const e of filesToUpload) {
         const elementStart = path.basename(e).slice(0, 12);
         const elementEnd = path.basename(e).slice(-10, -1);
         const element = await page.locator(UPLOADPHOTOSPAGE.cssLocators.imageItemName).filter({hasText: elementStart}).filter({hasText: elementEnd});
         await expect(element.first()).toBeVisible();
      }

      const uploadSelectedFilesBtn = await page.getByRole('button').filter({hasText: /^Upload \d+ files$/});
      await expect(uploadSelectedFilesBtn).toBeVisible();
      await uploadSelectedFilesBtn.click();

      const progressBarParent = await page.locator(UPLOADPHOTOSPAGE.cssLocators.progressBarParent);
      const progressBar = await page.locator(UPLOADPHOTOSPAGE.cssLocators.progressBar);
      await expect(progressBarParent).toBeVisible();
      await expect(progressBar).toBeVisible();
      await page.waitForTimeout(7000); 
      const progressBarParentClassAttribute = await progressBarParent.getAttribute('class');
      await expect(progressBarParentClassAttribute).toContain('is-complete');

      const doneButton = await page.getByRole('button').filter({hasText: 'Done'});
      await expect(doneButton).toBeVisible();
      await doneButton.click();

      await UPLOADPHOTOSMETHODS.deleteAllUploadedPhotos(page);
   });

   test('Images are being uploaded properly', async({page}) => {
      await DASHBOARDMETHODS.loadDashboard(page);

      const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
      await expect(myProjectsNavLink).toBeVisible();
      await myProjectsNavLink.click();

      const listedProject = await page.getByRole('link', { name: 'Freedom Approval Test 2026' });
      await expect(listedProject).toBeVisible();
      await listedProject.click();
      
      const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
      await expect(manageButton).toBeVisible();
      await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
      await manageButton.click();
      
      const managePhotosBtn = await page.getByRole('link').filter({hasText: 'Manage Photos'});
      const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: managePhotosBtn});
      await expect(managePopup.first()).toBeVisible();

      await expect(managePhotosBtn).toBeVisible();
      await managePhotosBtn.click();

      const uploadPhotosBtn = await page.getByRole('button').filter({hasText: 'Upload Photos'});
      await expect(uploadPhotosBtn).toBeVisible();
      await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
      await uploadPhotosBtn.click();

      const uploadPhotosPopup = await page.locator(UPLOADPHOTOSPAGE.cssLocators.uploadPhotosPopup).filter({hasText: 'Drop files here'});
      await expect(uploadPhotosPopup).toBeVisible();
      
      const uploadFilesBtn = await page.getByRole('button').filter({hasText: 'browse files'});
      await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
      await expect(uploadFilesBtn).toBeVisible();

      const folderPath = path.join(__dirname, '../images/');
      const filesToUpload = GLOBALS.getFilesInFolder(folderPath);
      const filesInput =  await page.locator(UPLOADPHOTOSPAGE.cssLocators.uploadFilesInput);
      await filesInput.first().setInputFiles(filesToUpload);

      for(const e of filesToUpload) {
         const elementStart = path.basename(e).slice(0, 12);
         const elementEnd = path.basename(e).slice(-10, -1);
         const element = await page.locator(UPLOADPHOTOSPAGE.cssLocators.imageItemName).filter({hasText: elementStart}).filter({hasText: elementEnd});
         await expect(element.first()).toBeVisible();
      }

      const uploadSelectedFilesBtn = await page.getByRole('button').filter({hasText: /^Upload \d+ files$/});
      await expect(uploadSelectedFilesBtn).toBeVisible();
      await uploadSelectedFilesBtn.click();

      const progressBarParent = await page.locator(UPLOADPHOTOSPAGE.cssLocators.progressBarParent);
      const progressBar = await page.locator(UPLOADPHOTOSPAGE.cssLocators.progressBar);
      await expect(progressBarParent).toBeVisible();
      await expect(progressBar).toBeVisible();
      await page.waitForTimeout(7000); 
      const progressBarParentClassAttribute = await progressBarParent.getAttribute('class');
      await expect(progressBarParentClassAttribute).toContain('is-complete');

      const doneButton = await page.getByRole('button').filter({hasText: 'Done'});
      await expect(doneButton).toBeVisible();
      await doneButton.click();

      let loadMorePhotosBtn = await page.getByRole('button').filter({hasText: 'Load More Photos'});
      while(await loadMorePhotosBtn.isVisible()) {
         await loadMorePhotosBtn.click();
         page.waitForTimeout(3000);
         loadMorePhotosBtn = await page.getByRole('button').filter({hasText: 'Load More Photos'});
      }

      for(const e of filesToUpload) {
         const fileName = path.basename(e);
         const element = await page.locator(`img[alt="${fileName}"]`);
         await expect(element.first()).toBeVisible();
      }

      await UPLOADPHOTOSMETHODS.deleteAllUploadedPhotos(page);
   });

   test('Images are being uploaded in category', async({page}) => {
      await DASHBOARDMETHODS.loadDashboard(page);

      const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
      await expect(myProjectsNavLink).toBeVisible();
      await myProjectsNavLink.click();

      const listedProject = await page.getByRole('link', { name: 'Freedom Approval Test 2026' });
      await expect(listedProject).toBeVisible();
      await listedProject.click();
      
      const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
      await expect(manageButton).toBeVisible();
      await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
      await manageButton.click();
      
      const managePhotosBtn = await page.getByRole('link').filter({hasText: 'Manage Photos'});
      const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: managePhotosBtn});
      await expect(managePopup.first()).toBeVisible();
      await expect(managePhotosBtn).toBeVisible();
      await managePhotosBtn.click();

      const uploadPhotosBtn = await page.getByRole('button').filter({hasText: 'Upload Photos'});
      await expect(uploadPhotosBtn).toBeVisible();
      await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
      await uploadPhotosBtn.click();

      const uploadPhotosPopup = await page.locator(UPLOADPHOTOSPAGE.cssLocators.uploadPhotosPopup).filter({hasText: 'Drop files here'});
      await expect(uploadPhotosPopup).toBeVisible();
      
      const uploadFilesBtn = await page.getByRole('button').filter({hasText: 'browse files'});
      await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
      await expect(uploadFilesBtn).toBeVisible();

      const folderPath = path.join(__dirname, '../images/');
      const filesToUpload = GLOBALS.getFilesInFolder(folderPath);
      const filesInput =  await page.locator(UPLOADPHOTOSPAGE.cssLocators.uploadFilesInput);
      await filesInput.first().setInputFiles(filesToUpload);

      for(const e of filesToUpload) {
         const elementStart = path.basename(e).slice(0, 12);
         const elementEnd = path.basename(e).slice(-10, -1);
         const element = await page.locator(UPLOADPHOTOSPAGE.cssLocators.imageItemName).filter({hasText: elementStart}).filter({hasText: elementEnd});
         await expect(element.first()).toBeVisible();
      }

      const uploadSelectedFilesBtn = await page.getByRole('button').filter({hasText: /^Upload \d+ files$/});
      await expect(uploadSelectedFilesBtn).toBeVisible();
      await uploadSelectedFilesBtn.click();

      const progressBarParent = await page.locator(UPLOADPHOTOSPAGE.cssLocators.progressBarParent);
      const progressBar = await page.locator(UPLOADPHOTOSPAGE.cssLocators.progressBar);
      await expect(progressBarParent).toBeVisible();
      await expect(progressBar).toBeVisible();
      await page.waitForTimeout(7000); 
      const progressBarParentClassAttribute = await progressBarParent.getAttribute('class');
      await expect(progressBarParentClassAttribute).toContain('is-complete');

      const doneButton = await page.getByRole('button').filter({hasText: 'Done'});
      await expect(doneButton).toBeVisible();
      await doneButton.click();

      const selectCategoryBtn = await page.getByRole('button').filter({hasText: /\d+\s+photos/ });
      await expect(selectCategoryBtn).toBeVisible();
      await selectCategoryBtn.click();

      const testCategoryOption =  await page.locator(UPLOADPHOTOSPAGE.cssLocators.testCategoryOption).filter({hasText: 'Test'});
      await expect(testCategoryOption.first()).toBeVisible();
      await testCategoryOption.first().click();

      let loadMorePhotosBtn = await page.getByRole('button').filter({hasText: 'Load More Photos'});
      while(await loadMorePhotosBtn.isVisible()) {
         await loadMorePhotosBtn.click();
         page.waitForTimeout(3000);
         loadMorePhotosBtn = await page.getByRole('button').filter({hasText: 'Load More Photos'});
      }

      for(const e of filesToUpload) {
         const fileName = path.basename(e);
         const element = await page.locator(`img[alt="${fileName}"]`);
         await expect(element.first()).toBeVisible();
      }

      await UPLOADPHOTOSMETHODS.deleteAllUploadedPhotos(page);
   });
});