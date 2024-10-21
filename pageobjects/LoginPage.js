class LoginPage {

    constructor(page) {
         this.page = page
         this.signInButton = page.locator('[name=login]')
         this.userNameTextField = page.locator('#userEmail')
         this.passwordField =  page.locator('#userPassword')
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

}
 module.exports = {LoginPage}