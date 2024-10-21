import {test, expect} from '@playwright/test';

let webContext;
test.beforeAll('Before All Test - creating storage state json', async ({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()
    const userEmail = 'rassured@rs.com'
    await page.goto('https://rahulshettyacademy.com/client/')
    await page.locator('#userEmail').fill(userEmail)
    await page.locator('#userPassword').fill('Rassured@rs1')
    await page.locator('[name=login]').click()
    await page.waitForLoadState('domcontentloaded')
        .then(()=> page.waitForLoadState('networkidle'))
    await context.storageState({path:'state.json'})
    webContext = await browser.newContext({storageState:'state.json'})
    await page.close()
})

test('route fulfill - mocking response object', async ({}) => {
  const page = await webContext.newPage()
    await page.goto('https://rahulshettyacademy.com/client/')
    await page.locator('.card-body b').first().waitFor()
    const listOfItems = await page.locator('.card-body b').allTextContents()
    console.log(listOfItems)
    expect(listOfItems.length).toBeGreaterThan(0)
    //mocking
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",async (route) => {
        const response = await page.request.fetch(route.request())
        let body = JSON.stringify({data:[],message:'No Orders'})
        await route.fulfill(
            {
                response,
                body,
            }
        )
    })
    await page.locator('button[routerlink="/dashboard/myorders"]').click()
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*')
    await expect(page.locator('.mt-4')).toBeVisible()
});

test('route continue - mocking request intercept', async ({  }) => {

    //login and reach orders page
    const page = await webContext.newPage()
    await page.goto('https://rahulshettyacademy.com/client/')
    await page.locator(".card-body b").first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    await page.getByRole('button',{name:'View'}).first().click()
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})

test('route aborting - blocking of images or css ', async ()=>{
    const page = await webContext.newPage()
    await page.route('**/*.{css,jpg,png}',route => route.abort())
    await page.goto('https://rahulshettyacademy.com/client/')
    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))
    await page.getByRole('button',{name:'View'}).first().click()
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})