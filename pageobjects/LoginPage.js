const {expect} = require("@playwright/test");

class LoginPage {

    constructor(page) {
         this.page = page
         this.signInButton = page.locator('[name=login]')
         this.userNameTextField = page.locator('#userEmail')
         this.passwordField =  page.locator('#userPassword')
         this.loginErrorMessage = page.getByRole("alert",{name:'Incorrect email or password.'})//.toHaveText("Incorrect username/password.")
    }

     async login(username,password){
        await this.userNameTextField.fill(username)
        await this.passwordField.fill(password)
        await this.signInButton.click()
         await this.page.waitForLoadState('domcontentloaded')
             .then(()=> this.page.waitForLoadState('networkidle'))
    }

    async NavigateToPage(){
       await this.page.goto('https://rahulshettyacademy.com/client/')
    }

    async isLoginErrorDisPlayed(){
        return this.loginErrorMessage.textContent()
    }

}
 module.exports = {LoginPage}