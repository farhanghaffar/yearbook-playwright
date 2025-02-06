const LADDERPAGE = {
    textLocators: {
        manageBtn: 'Manage',
    },
    cssLocators: {
        switchBtn: '#switchBtn',
        modeSwitchBtn: '#modeSwitch',
        ladderViewDiv: 'div#ladder-view',
        memoryViewDiv: 'div#memory-view',
        managePopup: 'div[data-headlessui-state="open"]',
        pagesParentDivs: 'div[id^="spread_"]',
        btnsWithInProgressStatus: 'button[class="page-status-selected"][title="Set Page Status to PLACED. This means In Progress."]',
        firstChildDiv: '> div:first-child',
    }
}

module.exports = LADDERPAGE;