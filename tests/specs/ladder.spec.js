const { test, expect } = require("@playwright/test");
const DASHBOARDMETHODS = require("../pages/dashboard/dashboard.methods");
const DASHBOARDPAGE = require("../pages/dashboard/dashboard.page");
const LADDERPAGE = require("../pages/ladder/ladder.page");

test.describe('Ladder', () => {
    test('Open dropdown popop on clicking manage button', async({page}) => {
        await DASHBOARDMETHODS.loadDashboard(page);

        const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);

        await expect(myProjectsNavLink).toBeVisible();

        await myProjectsNavLink.click();

        const listedProject = await page.getByRole('link', { name: 'Freedom Approval Test 2026' })

        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
        const manageLadderBtn = await page.getByRole('link').filter({hasText: 'Manage Ladder'});
        
        await expect(manageButton).toBeVisible();
        
        await manageButton.click();

        const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: manageLadderBtn});

        await expect(managePopup.first()).toBeVisible();

        await expect(manageLadderBtn).toBeVisible();
    });

    test('Toggling Board View ON highlights the Button', async({page}) => {
        await DASHBOARDMETHODS.loadDashboard(page);

        const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);

        await expect(myProjectsNavLink).toBeVisible();

        await myProjectsNavLink.click();

        const listedProject = await page.getByRole('link', { name: 'Freedom Approval Test 2026' })

        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
        
        await expect(manageButton).toBeVisible();
        
        await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
        await manageButton.click();
        
        const manageLadderBtn = await page.getByRole('link').filter({hasText: 'Manage Ladder'});
        const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: manageLadderBtn});

        await expect(managePopup.first()).toBeVisible();        

        await expect(manageLadderBtn).toBeVisible();

        await manageLadderBtn.click();

        const boardViewBtn = await page.locator(LADDERPAGE.cssLocators.modeSwitchBtn);
        const boardViewBtnBg = await page.locator(LADDERPAGE.cssLocators.switchBtn);

        await expect(boardViewBtn).toBeVisible();
        await expect(boardViewBtnBg).toBeVisible()

        await boardViewBtn.click();

        const boardViewBtnClassString = await boardViewBtnBg.getAttribute('class');

        await expect(boardViewBtnClassString).toContain('bg-red-600');
    });

    test('Toggling Board View OFF tone-down the Button', async({page}) => {
        await DASHBOARDMETHODS.loadDashboard(page);

        const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);

        await expect(myProjectsNavLink).toBeVisible();

        await myProjectsNavLink.click();

        const listedProject = await page.getByRole('link', { name: 'Freedom Approval Test 2026' });

        await expect(listedProject).toBeVisible();

        await listedProject.click();

        const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
        const manageLadderBtn = await page.getByRole('link').filter({hasText: 'Manage Ladder'})
        
        await expect(manageButton).toBeVisible();

        await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
        await manageButton.click();

        const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: manageLadderBtn});

        await expect(managePopup.first()).toBeVisible();

        await expect(manageLadderBtn).toBeVisible();

        await manageLadderBtn.click();

        const boardViewBtn = await page.locator(LADDERPAGE.cssLocators.modeSwitchBtn);
        const boardViewBtnBg = await page.locator(LADDERPAGE.cssLocators.switchBtn);

        await expect(boardViewBtn).toBeVisible();
        await expect(boardViewBtnBg).toBeVisible()

        await boardViewBtn.click();

        await boardViewBtn.click();

        const boardViewBtnBgClassString = await boardViewBtnBg.getAttribute('class');

        await expect(boardViewBtnBgClassString).toContain('bg-gray-200');
    });

    test('Toggling Board View ON changes ladder view', async({page}) => {
        await DASHBOARDMETHODS.loadDashboard(page);

        const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);

        await expect(myProjectsNavLink).toBeVisible();

        await myProjectsNavLink.click();

        const listedProject = await page.getByRole('link', { name: 'Freedom Approval Test 2026' })

        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const manageButton = await page.getByRole('button').filter({hasText: 'Manage'}).first()

        const manageLadderBtn = await page.getByRole('link').filter({hasText: 'Manage Ladder'})
        
        await expect(manageButton).toBeVisible();

        await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
        await manageButton.click();

        const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: manageLadderBtn});

        await expect(managePopup.first()).toBeVisible();
        await expect(manageLadderBtn).toBeVisible();

        await manageLadderBtn.click();

        const boardViewBtn = await page.locator(LADDERPAGE.cssLocators.modeSwitchBtn);

        await expect(boardViewBtn).toBeVisible();
        
        const ladderViewImage = await page.locator(LADDERPAGE.cssLocators.ladderViewImage);
        
        await expect(ladderViewImage).toBeVisible();
        
        const ladderViewImageCSS1 = await ladderViewImage.getAttribute('src');

        await boardViewBtn.click();

        const ladderViewImageCSS2 = await ladderViewImage.getAttribute('src');

        await expect(ladderViewImageCSS1).not.toBe(ladderViewImageCSS2);
    });

    test('Clicking Not Started Button in filters changes ladder view ', async({page}) => {
        await DASHBOARDMETHODS.loadDashboard(page);

        const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);

        await expect(myProjectsNavLink).toBeVisible();

        await myProjectsNavLink.click();

        const listedProject = await page.getByRole('link', { name: 'Freedom Approval Test 2026' })

        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const manageButton = await page.getByRole('button').filter({hasText: 'Manage'}).first()

        const manageLadderBtn = await page.getByRole('link').filter({hasText: 'Manage Ladder'})
        
        await expect(manageButton).toBeVisible();

        await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
        await manageButton.click();

        const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: manageLadderBtn});

        await expect(managePopup.first()).toBeVisible();
        await expect(manageLadderBtn).toBeVisible();

        await manageLadderBtn.click();

        const ladderViewImage = await page.locator(LADDERPAGE.cssLocators.ladderViewImage);

        await expect(ladderViewImage).toBeVisible();
        
        const ladderViewImageCSS1 = await ladderViewImage.getAttribute('src');

        const notStartedFilterBtn = await page.getByText('Not Started');
        
        await expect(notStartedFilterBtn).toBeVisible();
        
        await notStartedFilterBtn.click();
        
        const ladderViewImageCSS2 = await ladderViewImage.getAttribute('src');

        await expect(ladderViewImageCSS1).not.toBe(ladderViewImageCSS2);

    });

    test('Clicking In Progress Button in filters changes ladder view ', async({page}) => {
        await DASHBOARDMETHODS.loadDashboard(page);

        const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);

        await expect(myProjectsNavLink).toBeVisible();

        await myProjectsNavLink.click();

        const listedProject = await page.getByRole('link', { name: 'Freedom Approval Test 2026' })

        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const manageButton = await page.getByRole('button').filter({hasText: 'Manage'}).first()

        const manageLadderBtn = await page.getByRole('link').filter({hasText: 'Manage Ladder'})
        
        await expect(manageButton).toBeVisible();

        await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
        await manageButton.click();

        const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: manageLadderBtn});

        await expect(managePopup.first()).toBeVisible();
        await expect(manageLadderBtn).toBeVisible();

        await manageLadderBtn.click();

        const ladderViewImage = await page.locator(LADDERPAGE.cssLocators.ladderViewImage);

        await expect(ladderViewImage).toBeVisible();
        
        const ladderViewImageCSS1 = await ladderViewImage.getAttribute('src');

        const inProgressFilterBtn = await page.getByText('In Progress');
        
        await expect(inProgressFilterBtn).toBeVisible();
        
        await inProgressFilterBtn.click();
        
        const ladderViewImageCSS2 = await ladderViewImage.getAttribute('src');

        await expect(ladderViewImageCSS1).not.toBe(ladderViewImageCSS2);
    });

    test('Clicking Locked Button in filters changes ladder view ', async({page}) => {
        await DASHBOARDMETHODS.loadDashboard(page);

        const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);

        await expect(myProjectsNavLink).toBeVisible();

        await myProjectsNavLink.click();

        const listedProject = await page.getByRole('link', { name: 'Freedom Approval Test 2026' });

        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const manageButton = await page.getByRole('button').filter({hasText: 'Manage'}).first();

        const manageLadderBtn = await page.getByRole('link').filter({hasText: 'Manage Ladder'});
        
        await expect(manageButton).toBeVisible();

        await page.waitForTimeout(2000); // Temporarily so that test don't fail because of popup not loading on click of manage button
        await manageButton.click();

        const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: manageLadderBtn});

        await expect(managePopup.first()).toBeVisible();
        await expect(manageLadderBtn).toBeVisible();

        await manageLadderBtn.click();

        const ladderViewImage = await page.locator(LADDERPAGE.cssLocators.ladderViewImage);

        await expect(ladderViewImage).toBeVisible();
        
        const ladderViewImageCSS1 = await ladderViewImage.getAttribute('src');

        const lockedFilterBtn = await page.getByText('Locked');
        
        await expect(lockedFilterBtn).toBeVisible();
        
        await lockedFilterBtn.click();
        
        const ladderViewImageCSS2 = await ladderViewImage.getAttribute('src');

        await expect(ladderViewImageCSS1).not.toBe(ladderViewImageCSS2);
    });

    test('Clicking Preview Design button shows 3D Preview ', async({page}) => {
        await DASHBOARDMETHODS.loadDashboard(page);

        const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
        await expect(myProjectsNavLink).toBeVisible();
        await myProjectsNavLink.click();

        const listedProject = await page.getByRole('link', { name: 'Freedom Approval Test 2026' });
        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const manageButton = await page.getByRole('button').filter({hasText: 'Manage'}).first();
        const manageLadderBtn = await page.getByRole('link').filter({hasText: 'Manage Ladder'});
    
        await expect(manageButton).toBeVisible();
        await page.waitForTimeout(3000); // Temporarily so that test don't fail because of popup not loading on click of manage button
        await manageButton.click();

        const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: manageLadderBtn});
        await expect(managePopup.first()).toBeVisible();

        await expect(manageLadderBtn).toBeVisible();
        await manageLadderBtn.click();

        const prevewBtn = await page.getByText('Preview Design');
        await expect(prevewBtn).toBeVisible();
        await prevewBtn.click();
        
        const frame = await page.frameLocator('#threeD_model_space');
        const canvas = await frame.locator('#coverModelPreview');
        await expect(canvas).toBeVisible();
    });
});