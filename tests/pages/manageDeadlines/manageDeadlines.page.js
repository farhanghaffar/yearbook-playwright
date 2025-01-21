const MANAGEDEADLINESPAGE = {
    cssLocators: {
        rowsWithDatesDetails: 'div.grid.font-bold:has(span[title]):not(:first-child)',
        dueDateElement: 'span[title]',
        daysUntilDeadlineElement: 'div:nth-child(3)',
    }
}

module.exports = MANAGEDEADLINESPAGE;