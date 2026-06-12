const { test, expect } = require('@playwright/test');


test.skip('@webst client app login', async ({page})=>
{

  const Email = "komaldhawane27@gmail.com";
  const products = page.locator(".card-body");
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.getByPlaceholder("email@example.com").fill(Email);
  await page.getByPlaceholder("enter your passsword").fill("Welcome@12");
  await page.getByRole('button', {name:"Login"}).click();
  // keep this step as it's load the page 
  await page.locator(".card-body b").first().waitFor();
  await page.locator(".card-body").filter({hasText: "ZARA COAT 3"}).getByRole("button", {name:"Add To Cart"}).click();
  await page.getByRole("listitem").getByRole('button', {name:"Cart"}).click();
  await page.locator("div li").first().waitFor();
  await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  await page.getByRole("button", {name: "Checkout"}).click();
  await page.getByPlaceholder("Select Country").pressSequentially("ind");
  await page.getByRole("button",{name: "India"}).nth(1).click();
  await page.getByText("PLACE ORDER").click();
  await expect(page.getByText("Thankyou for the order.")).toBeVisible();


})