const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');


test.skip('Assignment', async ({browser})=>
{
  const context = await browser.newContext();
  const page = await context.newPage();
  const products = page.locator('.card-body');
  const Email = "komaldhawane27@gmail.com"; 
  const productName = "ZARA COAT 3";
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.locator('#userEmail').fill(Email);
  await page.locator('#userPassword').fill("Welcome@12");
  await page.locator("#login").click();
  //console.log(await page.locator(".card-body b").first().textContent());
  //console.log(await page.locator(".card-body b").nth(2).textContent());
  //Way to wait until all the element load on the netword tab
  //await page.waitForLoadState('networkidle'); > it is giving issue some time so use below 
  await page.locator(".card-body b").first().waitFor();
  const allTitless = await page.locator(".card-body b").allTextContents();
  console.log(allTitless);
  const count = await products.count();
  for (let i = 0; i < count; i++)
  {
    if( await products.nth(i).locator("b").textContent() === productName)
    {
        // add to cart
        await products.nth(i).locator("text= Add To Cart").click();
        break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const boolean = page.locator("h3:has-text('ZARA COAT 3')").isVisible();   // when text is used to find locator on diff pages but to avoid confict and it will only work for h3
  expect(boolean).toBeTruthy();
  await page.locator("text=checkout").click();
  await page.locator("[placeholder*='Country']").pressSequentially("ind");
  const dropdown  = await page.locator(".ta-results");
  await dropdown.waitFor();
  const OptionCount= await dropdown.locator("button").count();
  for (let i = 0; i< OptionCount; ++i)
  {
    const text = await dropdown.locator("button").nth(i).textContent();
    if(text===" India")
    {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }

  await page.locator(".field input.txt.text-validated").fill("4542 9931 9292 2293");
  await page.locator("input.input").nth(2).fill("123");
  await expect (page.locator(".user__name [type*='text']").first()).toHaveText(Email);
  await page.locator(".btnn.action__submit.ng-star-inserted").click();
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderID = await page.locator(".em-spacer-1 .ng-star-inserted ").textContent();
  console.log(orderID);
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor(); 
  const rows = await page.locator("tbody tr");

  for(let i =0; i<await rows.count(); ++i)
  {
    const rowOrderid = await rows.nth(i).locator("th").textContent();
    if (orderID.includes(rowOrderid))
    {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  const orderIDdetails =await page.locator(".col-text").textContent();
  expect(orderID.includes(orderIDdetails)).toBeTruthy();


})