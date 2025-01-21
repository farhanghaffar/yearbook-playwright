const fs =  require('fs');
const path = require('path');

const GLOBALS = {
    baseURL: 'https://edonext.entourageyearbooks.com/login',
    dashboardURL: 'https://edonext.entourageyearbooks.com/dashboard',
    validUserID: 'farhan.qat123@gmail.com',
    validPassword: 'farhan.qat123@gmail.com',
    invalidUserID: 'farhan@gmail.com',
    invalidPassword: '9128737asd',

    // Methods
    goToPage: async (page, url) => {
        await page.goto(url);
    },
    closePage: async (page) => {
        await page.close();
    },

    // Function to get all files from a specific folder
    getFilesInFolder: (folderPath) => {
        return fs.readdirSync(folderPath).map(file => path.join(folderPath, file));
    }
}

module.exports = GLOBALS;