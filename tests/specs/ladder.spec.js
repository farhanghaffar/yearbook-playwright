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

        const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject })
        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
        const manageLadderBtn = await page.getByRole('link').filter({hasText: 'Manage Ladder'});
        await expect(manageButton).toBeVisible();
        await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
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

        const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject })
        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
        await expect(manageButton).toBeVisible();
        await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
        await manageButton.click();
        
        const manageLadderBtn = await page.getByRole('link').filter({hasText: 'Manage Ladder'});
        const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: manageLadderBtn});

        await expect(managePopup.first()).toBeVisible();        

        await expect(manageLadderBtn).toBeVisible();
        await manageLadderBtn.click();

        const boardViewBtn = await page.locator(LADDERPAGE.cssLocators.modeSwitchBtn);
        const boardViewBtnBg = await page.locator(LADDERPAGE.cssLocators.switchBtn);
        await expect(boardViewBtn).toBeVisible();
        await expect(boardViewBtnBg).toBeVisible();

        await boardViewBtn.click();

        const boardViewBtnClassString = await boardViewBtnBg.getAttribute('class');
        await expect(boardViewBtnClassString).toContain('bg-red-600');
    });

    test('Toggling Board View OFF tone-down the Button', async({page}) => {
        await DASHBOARDMETHODS.loadDashboard(page);

        const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
        await expect(myProjectsNavLink).toBeVisible();
        await myProjectsNavLink.click();

        const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject });
        await expect(listedProject).toBeVisible();
        await listedProject.click();

        const manageButton = await page.getByText(LADDERPAGE.textLocators.manageBtn, {exact: true});
        const manageLadderBtn = await page.getByRole('link').filter({hasText: 'Manage Ladder'})
        await expect(manageButton).toBeVisible();
        await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
        await manageButton.click();

        const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: manageLadderBtn});
        await expect(managePopup.first()).toBeVisible();

        await expect(manageLadderBtn).toBeVisible();
        await manageLadderBtn.click();

        const boardViewBtn = await page.locator(LADDERPAGE.cssLocators.modeSwitchBtn);
        const boardViewBtnBg = await page.locator(LADDERPAGE.cssLocators.switchBtn);

        await expect(boardViewBtn).toBeVisible();
        await expect(boardViewBtnBg).toBeVisible();

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

        const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject })
        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const manageButton = await page.getByRole('button').filter({hasText: 'Manage'}).first()
        const manageLadderBtn = await page.getByRole('link').filter({hasText: 'Manage Ladder'})
        await expect(manageButton).toBeVisible();
        await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
        await manageButton.click();

        const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: manageLadderBtn});
        await expect(managePopup.first()).toBeVisible();
        await expect(manageLadderBtn).toBeVisible();
        await manageLadderBtn.click();

        const boardViewBtn = await page.locator(LADDERPAGE.cssLocators.modeSwitchBtn);
        await expect(boardViewBtn).toBeVisible();
        
        const ladderViewDiv = await page.locator(LADDERPAGE.cssLocators.ladderViewDiv);
        await expect(ladderViewDiv).toBeVisible();

        await boardViewBtn.click();

        const memoryViewDiv = await page.locator(LADDERPAGE.cssLocators.memoryViewDiv);
        await expect(memoryViewDiv).toBeVisible();
    });

    test('Clicking Not Started Button in filters changes ladder view ', async({page}) => {
        await DASHBOARDMETHODS.loadDashboard(page);

        const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
        await expect(myProjectsNavLink).toBeVisible();
        await myProjectsNavLink.click();

        const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject })
        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const manageButton = await page.getByRole('button').filter({hasText: 'Manage'}).first()
        await expect(manageButton).toBeVisible();
        await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
        await manageButton.click();
        
        const manageLadderBtn = await page.getByRole('link').filter({hasText: 'Manage Ladder'});
        const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: manageLadderBtn});
        await expect(managePopup.first()).toBeVisible();

        await expect(manageLadderBtn).toBeVisible();
        await manageLadderBtn.click();

        await page.waitForTimeout(5500);
        const pageDivs = await page.locator(LADDERPAGE.cssLocators.pagesParentDivs);
        const pageDivsCount = await pageDivs.count();
        let TextsForInProgressPages = [];

        for(let i = 0; i < pageDivsCount; i++) {
            const currentDiv = await pageDivs.nth(i);
            const buttonInCurrentDiv = await currentDiv.locator(LADDERPAGE.cssLocators.btnsWithInProgressStatus);

            if(await buttonInCurrentDiv.isVisible()) {
                const firstChildDiv = await currentDiv.locator(LADDERPAGE.cssLocators.firstChildDiv);
                const text = await firstChildDiv.textContent();
                TextsForInProgressPages.push(text);
            }
        }

        const notStartedFilterBtn = await page.getByText('Not Started', {exact: true});
        await expect(notStartedFilterBtn).toBeVisible();
        await notStartedFilterBtn.click();

        const coverStatusText = await page.getByText('Cover Status');
        await expect(coverStatusText).toBeVisible();
        await coverStatusText.click();

        await page.waitForTimeout(6000);

        for(let i = 0; i < TextsForInProgressPages.length; i++) {
            let currentInProgressElement = await page.getByText(TextsForInProgressPages[i]);
            await expect(currentInProgressElement).not.toBeVisible();
        }
    });

    test('Clicking In Progress Button in filters section filters in-progress pages', async({page}) => {
        await DASHBOARDMETHODS.loadDashboard(page);

        const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
        await expect(myProjectsNavLink).toBeVisible();
        await myProjectsNavLink.click();

        const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject })
        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const manageButton = await page.getByRole('button').filter({hasText: 'Manage'}).first()
        await expect(manageButton).toBeVisible();
        await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
        await manageButton.click();
        
        const manageLadderBtn = await page.getByRole('link').filter({hasText: 'Manage Ladder'});
        const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: manageLadderBtn});
        await expect(managePopup.first()).toBeVisible();

        await expect(manageLadderBtn).toBeVisible();
        await manageLadderBtn.click();

        await page.waitForTimeout(5500);
        const pageDivs = await page.locator(LADDERPAGE.cssLocators.pagesParentDivs);
        const pageDivsCount = await pageDivs.count();
        let TextsForInProgressPages = [];

        for(let i = 0; i < pageDivsCount; i++) {
            const currentDiv = await pageDivs.nth(i);
            const buttonInCurrentDiv = await currentDiv.locator(LADDERPAGE.cssLocators.btnsWithInProgressStatus);

            if(await buttonInCurrentDiv.isVisible()) {
                const firstChildDiv = await currentDiv.locator(LADDERPAGE.cssLocators.firstChildDiv);
                const text = await firstChildDiv.textContent();
                TextsForInProgressPages.push(text);
            }
        }

        const notStartedFilterBtn = await page.getByText('In Progress', {exact: true});
        await expect(notStartedFilterBtn).toBeVisible();
        await notStartedFilterBtn.click();

        const coverStatusText = await page.getByText('Cover Status');
        await expect(coverStatusText).toBeVisible();
        await coverStatusText.click();

        await page.waitForTimeout(6000);

        for(let i = 0; i < TextsForInProgressPages.length; i++) {
            let currentInProgressElement = await page.getByText(TextsForInProgressPages[i]);
            await expect(currentInProgressElement).toBeVisible();
        }
    });

    test('Clicking Locked Button in filters section filters Locked pages', async({page}) => {
        await DASHBOARDMETHODS.loadDashboard(page);

        const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
        await expect(myProjectsNavLink).toBeVisible();
        await myProjectsNavLink.click();

        const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject })
        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const manageButton = await page.getByRole('button').filter({hasText: 'Manage'}).first()
        await expect(manageButton).toBeVisible();
        await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
        await manageButton.click();
        
        const manageLadderBtn = await page.getByRole('link').filter({hasText: 'Manage Ladder'});
        const managePopup = await page.locator(LADDERPAGE.cssLocators.managePopup).filter({hasText: 'Yearbook HomeManage', has: manageLadderBtn});
        await expect(managePopup.first()).toBeVisible();

        await expect(manageLadderBtn).toBeVisible();
        await manageLadderBtn.click();

        await page.waitForTimeout(5500);
        const pageDivs = await page.locator(LADDERPAGE.cssLocators.pagesParentDivs);
        const pageDivsCount = await pageDivs.count();
        let TextsForInProgressPages = [];

        for(let i = 0; i < pageDivsCount; i++) {
            const currentDiv = await pageDivs.nth(i);
            const buttonInCurrentDiv = await currentDiv.locator('button[class="page-status-selected"][title="Set Page Status to LOCKED."]');

            if(await buttonInCurrentDiv.isVisible()) {
                const firstChildDiv = await currentDiv.locator(LADDERPAGE.cssLocators.firstChildDiv);
                const text = await firstChildDiv.textContent();
                TextsForInProgressPages.push(text);
            }
        }

        const lockedFilterBtn = await page.getByText('Locked', {exact: true});
        await expect(lockedFilterBtn).toBeVisible();
        await lockedFilterBtn.click();

        const coverStatusText = await page.getByText('Cover Status');
        await expect(coverStatusText).toBeVisible();
        await coverStatusText.click();

        await page.waitForTimeout(6000);

        for(let i = 0; i < TextsForInProgressPages.length; i++) {
            let currentInProgressElement = await page.getByText(TextsForInProgressPages[i]);
            await expect(currentInProgressElement).toBeVisible();
        }
    });

    test('Clicking Preview Design button shows 3D Preview ', async({page}) => {
        await DASHBOARDMETHODS.loadDashboard(page);

        const myProjectsNavLink = await page.locator(DASHBOARDPAGE.cssLocators.myProjectsLink);
        await expect(myProjectsNavLink).toBeVisible();
        await myProjectsNavLink.click();

        const listedProject = await page.getByRole('link', { name: DASHBOARDPAGE.textLocators.listedProject });
        await expect(listedProject).toBeVisible();
        await listedProject.click();
        
        const manageButton = await page.getByRole('button').filter({hasText: 'Manage'}).first();
        const manageLadderBtn = await page.getByRole('link').filter({hasText: 'Manage Ladder'});
        await expect(manageButton).toBeVisible();
        await page.waitForTimeout(2500); // Temporarily so that test don't fail because of popup not loading on click of manage button
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