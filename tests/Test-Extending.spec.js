import {test, expect} from '@playwright/test';
import {POManager} from "../pageobjects/PomManager";
import {createEmail} from "../TestsData/FakerDataGenerator";
import {customTest} from "../utils/test-dataFixtureExtension";



customTest("Login Test with custom extended custom data", async ({page,testDataForOrder})=>{
    const pomManager = new POManager(page)
    const fakeEmail = createEmail()
    const loginPage = pomManager.getLoginPage()
    await loginPage.NavigateToPage()
    await loginPage.login(testDataForOrder.userEmail,testDataForOrder.userPassword)
    const dashBoardPage = pomManager.getDashboardPage()
    await dashBoardPage.addProductToCart(testDataForOrder.productName)
    await dashBoardPage.goToCart()
})