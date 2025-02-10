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

        const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject });
        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
        await expect(manageButton).toBeVisible();
        await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
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
   });

   test('Selecting input files working properly', async({page}) => {
      await DASHBOARDMETHODS.loadDashboard(page);

      const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
      await expect(myProjectsNavLink).toBeVisible();
      await myProjectsNavLink.click();

      const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject });
      await expect(listedProject).toBeVisible();
      await listedProject.click();
      
      const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
      await expect(manageButton).toBeVisible();
      await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
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

      const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject });
      await expect(listedProject).toBeVisible();
      await listedProject.click();
      
      const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
      await expect(manageButton).toBeVisible();
      await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
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

      const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject });
      await expect(listedProject).toBeVisible();
      await listedProject.click();
      
      const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
      await expect(manageButton).toBeVisible();
      await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
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
      await page.waitForTimeout(100000); 
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

      const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject });
      await expect(listedProject).toBeVisible();
      await listedProject.click();
      
      const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
      await expect(manageButton).toBeVisible();
      await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
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
      await page.waitForTimeout(100000); 
      const progressBarParentClassAttribute = await progressBarParent.getAttribute('class');
      await expect(progressBarParentClassAttribute).toContain('is-complete');

      const doneButton = await page.getByRole('button').filter({hasText: 'Done'});
      await expect(doneButton).toBeVisible();
      await doneButton.click();

      let loadMorePhotosBtn = await page.getByRole('button').filter({hasText: 'Load More Photos'});
      while(await loadMorePhotosBtn.isVisible()) {
         await loadMorePhotosBtn.click();
         await page.waitForTimeout(3000);
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

      const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject });
      await expect(listedProject).toBeVisible();
      await listedProject.click();
      
      const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
      await expect(manageButton).toBeVisible();
      await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
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
      await page.waitForTimeout(100000); 
      const progressBarParentClassAttribute = await progressBarParent.getAttribute('class');
      await expect(progressBarParentClassAttribute).toContain('is-complete');

      const doneButton = await page.getByRole('button').filter({hasText: 'Done'});
      await expect(doneButton).toBeVisible();
      await doneButton.click();

      const selectCategoryBtn = await page.getByRole('button').filter({hasText: /\d+\s+photos/ });
      await expect(selectCategoryBtn).toBeVisible();
      await selectCategoryBtn.click();

      const testCategoryOption =  await page.locator(UPLOADPHOTOSPAGE.cssLocators.testCategoryOption).filter({hasText: 'Imported Photos'});
      await expect(testCategoryOption.first()).toBeVisible();
      await testCategoryOption.first().click();

      let loadMorePhotosBtn = await page.getByRole('button').filter({hasText: 'Load More Photos'});
      while(await loadMorePhotosBtn.isVisible()) {
         await loadMorePhotosBtn.click();
         await page.waitForTimeout(3000);
         loadMorePhotosBtn = await page.getByRole('button').filter({hasText: 'Load More Photos'});
      }

      for(const e of filesToUpload) {
         const fileName = path.basename(e);
         const element = await page.locator(`img[alt="${fileName}"]`);
         await expect(element.first()).toBeVisible();
      }

      await UPLOADPHOTOSMETHODS.deleteAllUploadedPhotos(page);
   });

   test.describe('Import Previous Photos', () => {
      test('Click Import Previous Photos working', async({page}) => {
         await DASHBOARDMETHODS.loadDashboard(page);
   
         const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
         await expect(myProjectsNavLink).toBeVisible();
         await myProjectsNavLink.click();
   
         const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject });
         await expect(listedProject).toBeVisible();
         await listedProject.click();
         
         const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
         await expect(manageButton).toBeVisible();
         await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
         await manageButton.click();
         
         const managePhotosBtn = await page.getByRole('link').filter({hasText: 'Manage Photos'});
         const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: managePhotosBtn});
         await expect(managePopup.first()).toBeVisible();
   
         await expect(managePhotosBtn).toBeVisible();
         await managePhotosBtn.click();
   
         const importPreviousPhotosBtn = await page.getByRole('button').filter({hasText: 'Import Previous Photos'});
         await expect(importPreviousPhotosBtn).toBeVisible();
         await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
         await importPreviousPhotosBtn.click();
   
         const selectPreviousProjectElement = await page.locator('select').filter({hasText: '--- Select Project ---'});
         await expect(selectPreviousProjectElement).toBeVisible();
      });
   
      test('Previous Photos are being uploaded', async({page}) => {
         await DASHBOARDMETHODS.loadDashboard(page);
   
         const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
         await expect(myProjectsNavLink).toBeVisible();
         await myProjectsNavLink.click();
   
         const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject });
         await expect(listedProject).toBeVisible();
         await listedProject.click();
         
         const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
         await expect(manageButton).toBeVisible();
         await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
         await manageButton.click();
         
         const managePhotosBtn = await page.getByRole('link').filter({hasText: 'Manage Photos'});
         const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: managePhotosBtn});
         await expect(managePopup.first()).toBeVisible();
   
         await expect(managePhotosBtn).toBeVisible();
         await managePhotosBtn.click();

         const importPreviousPhotosBtn = await page.getByRole('button').filter({hasText: 'Import Previous Photos'});
         await expect(importPreviousPhotosBtn).toBeVisible();
         await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
         await importPreviousPhotosBtn.click();
   
         const selectPreviousProjectElement = await page.locator('select').filter({hasText: '--- Select Project ---'});
         await expect(selectPreviousProjectElement).toBeVisible();
   
         await selectPreviousProjectElement.selectOption(UPLOADPHOTOSPAGE.textLocators.previousProjectOptionToSelect);
   
         const testCategoryCheckbox = await page.getByLabel(/Test\s*-\s*\(\d+\s*photos\)/).first();
         await expect(testCategoryCheckbox).toBeVisible();
         await testCategoryCheckbox.click();
   
         const copyPhotosBtn = await page.getByRole('button').filter({hasText: 'Copy Photos to Freedom Approval Test 2026 Yearbook'});
         await expect(copyPhotosBtn).toBeVisible();
         await expect(copyPhotosBtn).not.toBeDisabled();
         await copyPhotosBtn.click();
   
         await page.waitForTimeout(3500); // Wait for upload to be complete
         const successMsg = await page.getByText(/(\d+)\s+categories\s+and\s+(\d+)\s+photos\s+copied\s+successfully/);
         await expect(successMsg).toBeVisible();
   
         const goBackBtn = await page.getByRole('button').filter({hasText: 'Back to Manage Photos'});
         await expect(goBackBtn).toBeVisible();
         await goBackBtn.click();
   
         await UPLOADPHOTOSMETHODS.deleteAllUploadedPhotos(page);
      });
   });


   test.describe('Import from Dropbox', () => {
      test('Popup opens properly', async({page}) => {
         await DASHBOARDMETHODS.loadDashboard(page);
   
         const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
         await expect(myProjectsNavLink).toBeVisible();
         await myProjectsNavLink.click();
   
         const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject });
         await expect(listedProject).toBeVisible();
         await listedProject.click();
         
         const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
         await expect(manageButton).toBeVisible();
         await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
         await manageButton.click();
         
         const managePhotosBtn = await page.getByRole('link').filter({hasText: 'Manage Photos'});
         const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: managePhotosBtn});
         await expect(managePopup.first()).toBeVisible();
   
         await expect(managePhotosBtn).toBeVisible();
         await managePhotosBtn.click();
   
         await page.waitForTimeout(2000);
         const uploadPhotosBtn = await page.getByRole('button').filter({hasText: 'Upload Photos'});
         await expect(uploadPhotosBtn).toBeVisible();
         await page.waitForTimeout(4000);
         await uploadPhotosBtn.click();
   
         const dropBoxBtn = await page.getByRole('presentation').filter({hasText: 'Dropbox'});
         await expect(dropBoxBtn).toBeVisible();
         await dropBoxBtn.click();
   
         const connectToDropboxBtn = await page.getByRole('button').filter({hasText: 'Connect to Dropbox'});
         await expect(connectToDropboxBtn).toBeVisible();
         await connectToDropboxBtn.click();
      });

      test('Connect to Dropbox', async({page}) => {
         await DASHBOARDMETHODS.loadDashboard(page);
   
         const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
         await expect(myProjectsNavLink).toBeVisible();
         await myProjectsNavLink.click();
   
         const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject });
         await expect(listedProject).toBeVisible();
         await listedProject.click();
         
         const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
         await expect(manageButton).toBeVisible();
         await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
         await manageButton.click();
         
         const managePhotosBtn = await page.getByRole('link').filter({hasText: 'Manage Photos'});
         const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: managePhotosBtn});
         await expect(managePopup.first()).toBeVisible();
   
         await expect(managePhotosBtn).toBeVisible();
         await managePhotosBtn.click();
   
         const uploadPhotosBtn = await page.getByRole('button').filter({hasText: 'Upload Photos'});
         await expect(uploadPhotosBtn).toBeVisible();
         await page.waitForTimeout(8000);
         await uploadPhotosBtn.click();
   
         const dropBoxBtn = await page.getByRole('presentation').filter({hasText: 'Dropbox'});
         await expect(dropBoxBtn).toBeVisible();
         await dropBoxBtn.click();
   
         const connectToDropboxBtn = await page.getByRole('button').filter({hasText: 'Connect to Dropbox'});
         await expect(connectToDropboxBtn).toBeVisible();
         await connectToDropboxBtn.click();

         const [newTab] = await Promise.all([
            page.waitForEvent('popup'), // Listen for the new tab (popup)
         ]);

         await newTab.waitForLoadState();

         const newTabTxt = newTab.getByText('Log in or sign up to Dropbox');
         await expect(newTabTxt).toBeVisible();

         // LOGIN WITH GOOGLE WITHOUT 2-FACTOR AUTHENTICATION
         // const googleIframe = await  newTab.frameLocator('iframe[title="Sign in with Google Button"]');
         // const continueWithGoogleBtn = await googleIframe.getByRole('button').filter({hasText: 'Continue with Google'});
         // await expect(continueWithGoogleBtn.first()).toBeVisible();
         // await continueWithGoogleBtn.first().click();

         // const [googleAuthTab] = await Promise.all([
         //    newTab.waitForEvent('popup'), // Listen for the new tab (popup)
         // ]);

         // await googleAuthTab.waitForLoadState();

         // const emailInput = await googleAuthTab.locator('#identifierId');
         // await expect(emailInput).toBeVisible();
         // await emailInput.pressSequentially(GLOBALS.dropboxEmail);

         // const nextBtn = googleAuthTab.getByRole('button').filter({hasText: 'Next'});
         // await nextBtn.click();
         
         // const passwordInput = googleAuthTab.locator('input[type="password"]');
         // await expect(passwordInput).toBeVisible();
         // await passwordInput.pressSequentially(GLOBALS.dropboxPassword);
         // await nextBtn.click();

         // const authSuccessMsg = newTab.getByText('Log in successful. Your browser will be redirected in a few seconds.');
         // await expect(authSuccessMsg).toBeVisible();


         // CONNECT WITH EMAIL CREDENTIALS
         const dropboxEmailInput = newTab.locator('[name="susi_email"]');
         await expect(dropboxEmailInput).toBeVisible();
         await dropboxEmailInput.pressSequentially(GLOBALS.dropboxEmail);

         const emailSubmitBtn = await newTab.locator('.email-submit-button');
         await expect (emailSubmitBtn).toBeVisible();
         await emailSubmitBtn.click();

         const emailPasswordInput = await newTab.locator('[type="password"]');
         await expect(emailPasswordInput).toBeVisible();
         await emailPasswordInput.pressSequentially(GLOBALS.dropboxPassword);

         const loginBtn = await newTab.getByRole('button').filter({hasText: 'Log in'});
         await expect(loginBtn).toBeVisible();
         await loginBtn.click();

         await expect(newTab.isClosed()).toBeTruthy();
      });
   });

   test.describe('Import from Facebook', async() => {
      test('Connect to Facebook', async({page}) => {
         await DASHBOARDMETHODS.loadDashboard(page);
   
         const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
         await expect(myProjectsNavLink).toBeVisible();
         await myProjectsNavLink.click();
   
         const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject });
         await expect(listedProject).toBeVisible();
         await listedProject.click();
         
         const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
         await expect(manageButton).toBeVisible();
         await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
         await manageButton.click();
         
         const managePhotosBtn = await page.getByRole('link').filter({hasText: 'Manage Photos'});
         const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: managePhotosBtn});
         await expect(managePopup.first()).toBeVisible();
   
         await expect(managePhotosBtn).toBeVisible();
         await managePhotosBtn.click();
   
         const uploadPhotosBtn = await page.getByRole('button').filter({hasText: 'Upload Photos'});
         await expect(uploadPhotosBtn).toBeVisible();
         await page.waitForTimeout(8000);
         await uploadPhotosBtn.click();
   
         const fbBtn = await page.getByRole('presentation').filter({hasText: 'Facebook'});
         await expect(fbBtn).toBeVisible();
         await fbBtn.click();
   
         const connectToFbBtn = await page.getByRole('button').filter({hasText: 'Connect to Facebook'});
         await expect(connectToFbBtn).toBeVisible();
         await connectToFbBtn.click();

         const [newTab] = await Promise.all([
            page.waitForEvent('popup'), // Listen for the new tab (popup)
         ]);

         await newTab.waitForLoadState();

         const newTabTxt = newTab.getByText('Log in to Facebook');
         await expect(newTabTxt).toBeVisible();

         // CONNECT WITH EMAIL CREDENTIALS
         const fbEmailInput = newTab.locator('#email');
         await expect(fbEmailInput).toBeVisible();
         await fbEmailInput.pressSequentially(GLOBALS.fbEmail);

         const emailPasswordInput = await newTab.locator('#pass');
         await expect(emailPasswordInput).toBeVisible();
         await emailPasswordInput.pressSequentially(GLOBALS.fbPassword);

         const loginBtn = newTab.getByRole('button').filter({hasText: 'Log in'});
         await expect(loginBtn).toBeVisible();
         await loginBtn.click();

         const continuebBtn = newTab.getByRole('button').filter({hasText: `Continue as ${GLOBALS.fbFirstName}`});
         await expect(continuebBtn).toBeVisible();
         await continuebBtn.click();

         const popupEmailTxt = await page.getByText(GLOBALS.fbEmail);
         await expect(popupEmailTxt).toBeVisible();

         // await newTab.waitForTimeout(15000);

         // await expect(newTab.isClosed()).toBeTruthy();
      });
   });
});