 class DashboardPage {

    constructor(page) {
        this.page = page
        this.products = page.locator('.card-body')
        this.productsText = this.products.locator('b')
        this.cart = page.locator('button[routerlink="/dashboard/cart"]')
    }

    async addProductToCart(productName){
        await this.products
            .filter({hasText:productName})
            .locator('button.btn.w-10.rounded')
            .click()
    }

    async goToCart(){
        await this.cart.click()
    }

}
 module.exports = {DashboardPage};