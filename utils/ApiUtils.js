import {expect, request} from "@playwright/test";

export class ApiUtils {

    constructor(apiContext,loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad
    }


    async getToken(){
         const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
             {data:this.loginPayLoad})
         await expect(loginResponse).toBeOK()
         const loginJson = await loginResponse.json()
         return  loginJson.token
    }

    async createOrder(productInfo){
        let response = {}
        response.token = await this.getToken();
        const orderResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
            data: productInfo,
            headers: {
                'Authorization': response.token,
                'Content-Type': 'application/json'
            }
        })
        const  orderResponseJson = await orderResponse.json()
        response.orderId=orderResponseJson.orders[0]
        return response;
    }
}
///module.exports = ApiUtils
