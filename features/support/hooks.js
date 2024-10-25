const {Before,AfterStep, BeforeAll, AfterAll, Status, BeforeStep} = require("@cucumber/cucumber")
const {setDefaultTimeout} = require("@cucumber/cucumber");
const {chromium} = require("@playwright/test");
const {POManager} = require("../../pageobjects/PomManager");


setDefaultTimeout(60 * 1000);
let pageInstance;
BeforeAll(async function () {

    this.browser = await chromium.launch({
        headless:false
    })
    pageInstance = await this.browser.newPage()
})

Before(async function (){
    this.pomManager =  new POManager(pageInstance)
})

AfterAll(async function (){
     await this.browser.close()
})

BeforeStep(function ({gherkinDocument}) {

});

AfterStep( async function ({result,gherkinDocument}) {
    if(result.status === Status.FAILED){
        await this.page.screenshot()
    }

});