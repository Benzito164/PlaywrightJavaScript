import {test, expect,request} from '@playwright/test';
import {ApiUtils} from "../utils/ApiUtils";



let token
let orderId
let response;
test.beforeAll('',async ()=>{

    //Login api call
    const apiContext = await request.newContext()
    const loginPayLoad = {userEmail:"rassured@rs.com",userPassword:"Rassured@rs1"};
    const apiUtils = new ApiUtils(apiContext,loginPayLoad)


    //create order api
    const productInfo = {orders:[{country:'Cuba',productOrderedId:'6581cade9fd99c85e8ee7ff5'}]}
    response =  await apiUtils.createOrder(productInfo)
    orderId = response.orderId
})

test('Add item to cart using api calls ',async ({page})=>{
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    },response.token)
    await page.goto('https://rahulshettyacademy.com/client/')
    await page.locator('button[routerlink="/dashboard/myorders"]').click()
    await page.locator('tr.ng-star-inserted').filter({hasText:orderId})
        .getByRole('button',{name:'View'}).click()
    await expect(page.locator('div[class$=\'-main\']')).toHaveText(orderId)
})