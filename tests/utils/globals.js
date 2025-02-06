const fs =  require('fs');
const path = require('path');

const GLOBALS = {
    baseURL: 'https://edonext.entourageyearbooks.com/login',
    dashboardURL: 'https://edonext.entourageyearbooks.com/dashboard',
    validUserID: 'farhan.qat123@gmail.com',
    validPassword: 'farhan.qat123@gmail.com',
    invalidUserID: 'farhan@gmail.com',
    invalidPassword: '9128737asd',

    // Dropbox Google Auth Credentials
    // dropboxGoogleEmail: 'farhan.qat321@gmail.com',
    // dropboxGooglePassword: 'Test@123',

    // Dropbox Credentials
    dropboxEmail: 'farhan.qat123@gmail.com',
    dropboxPassword: 'Test@321',

    // Facebook Credentials
    fbEmail: 'adnan.qat123+VG@gmail.com',
    fbPassword: 'Test@1234',
    fbFirstName: 'Adnan',

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
    },

    generate4DigitId() {
        return ('0000' + Math.floor(Math.random() * 10000)).slice(-4);
    },
    
}

module.exports = GLOBALS;