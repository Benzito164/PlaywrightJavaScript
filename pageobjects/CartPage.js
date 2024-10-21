
 class CartPage {

    constructor(page) {
        this.page = page
        this.selectCountryField = page.locator("input[placeholder='Select Country']")
        this.orderButton = page.locator("a[class$='ng-star-inserted']")
        this.listedCountriesDropDown = page.locator(".ta-results");
        this.cartProducts = page.locator('div li')
        this.myOrders = page.locator('')
        this.checkOutButton = page.locator('[type=button]')

    }

    async clickCheckOutButton(){
        await this.checkOutButton.nth(1).click()
    }

     async isSelectedProductDisplayed(selectedProductName){
        return  await this.page.locator('h3').filter({hasText:selectedProductName})
    }

    async selectDestination(countryShortTxt,country){
        await this.selectCountryField.pressSequentially(countryShortTxt)
        await this.listedCountriesDropDown.waitFor();
        const listedCountriesDropDownButtonItem = this.listedCountriesDropDown.locator("button")
        const optionsCount = await listedCountriesDropDownButtonItem.count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await listedCountriesDropDownButtonItem.nth(i).textContent();
            if (text === country) {
                await listedCountriesDropDownButtonItem.nth(i).click();
                break;
            }
        }
    }

}
module.exports = {CartPage}