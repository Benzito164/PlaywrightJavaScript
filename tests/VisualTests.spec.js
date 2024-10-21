import {test, expect} from '@playwright/test';

test('ScreenShot', async ({page}) => {
    await page.goto('https://google.co.uk')
    await page.screenshot({path:'google.png'})
});

test('visual comparison', async ({page}) => {
     await page.goto('https://google.co.uk')
     expect(await page.screenshot()).toMatchSnapshot('google.png')
});