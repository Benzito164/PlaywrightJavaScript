import {test, expect} from '@playwright/test';
import {POManager} from "../pageobjects/PomManager"
import {data as ecommerceTestData,arrayDataSet} from "../TestsData/End2EndTestData"
import {createEmail} from "../TestsData/FakerDataGenerator";

test.describe('EcommerceEnd2EndTest', async () => {

    test('Add item to cart',async ({page})=>{
        const pomManager = new POManager(page)
        const fakeEmail = createEmail()
        const loginPage = pomManager.getLoginPage()
        await loginPage.NavigateToPage()
        await loginPage.login(ecommerceTestData.userEmail,ecommerceTestData.userPassword)
        const dashBoardPage = pomManager.getDashboardPage()
        await dashBoardPage.addProductToCart(ecommerceTestData.productName)
        await dashBoardPage.goToCart()
        const cartPage = pomManager.getCartPage()
        await expect(await cartPage.isSelectedProductDisplayed(ecommerceTestData.productName)).toBeVisible()

        await cartPage.clickCheckOutButton()
        await  cartPage.selectDestination('ind','India')

        const labelRassuredCom = page.locator("label[type='text']")
        await expect(labelRassuredCom).toHaveText(userEmail)
        const linkPlaceOrder = page.locator("a[class$='ng-star-inserted']")
        await linkPlaceOrder.click();
        const h1ThankyouForTheOrder = page.locator(".hero-primary")
        await expect(h1ThankyouForTheOrder).toHaveText(" Thankyou for the order. ");
        const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").first().textContent();
        const cleanedOrderId = orderId.replaceAll("|","")
        console.log(cleanedOrderId);
        await page.locator('button[routerlink="/dashboard/myorders"]').click()
        await page.locator('tr.ng-star-inserted').filter({hasText:cleanedOrderId})
            .getByRole('button',{name:'View'}).click()
        await expect(page.locator('div[class$=\'-main\']')).toHaveText(cleanedOrderId)
    })

    // for (const dataSet of arrayDataSet) {
    //     test("Data Driven", async ({page})=>{
    //         const pomManager = new POManager(page)
    //         const fakeEmail = createEmail()
    //         const loginPage = pomManager.getLoginPage()
    //         await loginPage.NavigateToPage()
    //         await loginPage.login(dataSet.userEmail,dataSet.userPassword)
    //         const dashBoardPage = pomManager.getDashboardPage()
    //         await dashBoardPage.addProductToCart(dataSet.productName)
    //         await dashBoardPage.goToCart()
    //     })
   // }

    test("@wip Calendar validations",async({page})=>
    {
        const monthNumber = "6";
        const date = "15";
        const year = "2027";
        const expectedList = [monthNumber,date,year];
        await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
        await page.locator(".react-date-picker__inputGroup").click();
        await page.locator(".react-calendar__navigation__label").click();
        await page.locator(".react-calendar__navigation__label").click();
        await page.getByText(year).click();
        await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
        await page.locator("//abbr[text()='"+date+"']").click();
        const inputs = await page.locator(".react-date-picker__inputGroup input[data-input=true]");
        for (let index = 0; index < await inputs.count(); index++)
        {
            const value = await inputs.nth(index).getAttribute("value");
            expect(value).toEqual(expectedList[index]);
        }
    })
})

