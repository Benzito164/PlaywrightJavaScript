const {Given, Then} = require("@cucumber/cucumber");
const {expect} = require("@playwright/test");


Given('i login with {string} and {string}',async function (string, string2) {
     this.loginPage = await this.pomManager.getLoginPage()
     await this.loginPage.NavigateToPage()
     await this.loginPage.login(string,string2)

});


Then('{string} error message is displayed', async function (errorMessage) {
    await expect(await this.loginPage.isLoginErrorDisPlayed()).toEqual(errorMessage)
});