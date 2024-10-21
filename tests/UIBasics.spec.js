import {expect, test} from '@playwright/test';

test('Sample test without page context', async ({browser}) => {
    const  context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://google.co.uk")
    await expect(await page.title()).toEqual('Google')
});


test('Sample test with page context',async ({page},testInfoError)=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const usernameField = page.locator("[name='username']")
    const passwordField = page.locator("[name='password']")

    await usernameField.fill("playwright")
    await passwordField.fill("learning")
    await page.locator("#signInBtn").click()
    console.log(await page.locator("[style*='block;']").textContent())
    await expect(page.locator("[style*='block;']")).toHaveText("Incorrect username/password.")

    await usernameField.fill("")
    await usernameField.fill("rahulshettyacademy")
    await passwordField.fill("").
    then(async () => await passwordField.fill("learning") ).
    finally(async ()=> await page.locator("#signInBtn").click() )
  //  console.log(await page.locator('.card-body a',{hasText:"iphone x"}).textContent())
    await page.waitForLoadState("domcontentloaded");
    await page.locator('.card-body a').first().waitFor()
    console.log(await page.locator('.card-body a').allTextContents())
})


test('UI Controls',async ({page},testInfoError)=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    const usernameField = page.locator("[name='username']")
    const passwordField = page.locator("[name='password']")

    const dropdown = page.locator("select.form-control");
    const checkBox = page.locator(".radiotextsty").last();
    await checkBox.click()
    await page.locator("#okayBtn").click()
    await expect(checkBox).toBeChecked()
    await dropdown.selectOption("Teacher");
    await expect(page.locator("[class='blinkingText']")).toHaveAttribute('class','blinkingText')
    await usernameField.fill("rahulshettyacademy").
    then(async () => await passwordField.fill("learning") ).
    finally(async ()=> await page.locator("#signInBtn").click() )
})


test.only('Child Window handling',async ({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

    const [newTab] = await Promise.all([
        context.waitForEvent('page'),
        page.locator("[class='blinkingText']").click()
    ])
   console.log(await newTab.locator('.red').textContent())

})