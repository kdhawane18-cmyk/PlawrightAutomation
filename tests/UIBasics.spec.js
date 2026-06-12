const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');
//const { use } = require('react');

test('Browser Context Playwright test', async ({browser})=>
{
  //open chrome fresh browser which will not carry old plugins and bookmarks 
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //CSS  // Fill used for typing something in input box/Editbox
    await page.locator('#username').fill("Rahulshetty");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await signIn.click();
    //webdriverwait 
    console.log(await page.locator("[style*= 'block']").textContent());
    //Use incorrect contain test to check the error 
    //await expect(page.locator("[style*= 'block']")).toContainText("Incorrectfeddd");
await expect(page.locator("[style*= 'block']")).toContainText("Incorrect");
await userName.fill("");
await userName.fill("rahulshettyacademy");
await signIn.click();
page.pause();
console.log(await cardTitles.first().textContent());
console.log(await cardTitles.nth(1).textContent());
const allTitles = await cardTitles.allTextContents();
console.log(allTitles);

//assigment 
})

test('Assignment', async ({browser})=>
{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.locator('#userEmail').fill("komaldhawane27@gmail.com");
  await page.locator('#userPassword').fill("Welcome@12");
  await page.locator("#login").click();
  //console.log(await page.locator(".card-body b").first().textContent());
  //console.log(await page.locator(".card-body b").nth(2).textContent());
  //Way to wait until all the element load on the netword tab
  //await page.waitForLoadState('networkidle'); > it is giving issue some time so use below 
  await page.locator(".card-body b").first().waitFor();
  const allTitless = await page.locator(".card-body b").allTextContents();
  console.log(allTitless);

})

test('UI Controls ', async ({page})=>
{
 await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
 const userName = page.locator("#username");
const signIn = page.locator("#signInBtn");
const documentLinks = page.locator("[href*= 'documents-request']");
const dropdown = page.locator("select.form-control"); //Select dropdown
await dropdown.selectOption("consult");
await page.locator(".radiotextsty").last().click();  //select radiobutton
await page.locator("#okayBtn").click();  //Handle pop up 
console.log(await page.locator(".radiotextsty").last().isChecked()); //true
await expect(page.locator(".radiotextsty").last()).toBeChecked();  //assertion
await page.locator("#terms").click();
await expect(page.locator("#terms")).toBeChecked();
await page.locator("#terms").uncheck();
expect(await page.locator("#terms").isChecked()).toBeFalsy();
await expect(documentLinks).toHaveAttribute("class","blinkingText"); //assertion for blinkingText
//await page.pause(); 
})

test('Child windows hanlde ', async ({browser})=>
{
    
const context = await browser.newContext();
const page = await context.newPage();
const userName = page.locator('#username');
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const documentLinks = page.locator("[href*= 'documents-request']");

const [newPage] = await Promise.all(
  [
    context.waitForEvent('page'), //Listen for any new page open > Pending,Rejected,Fullfilled
 documentLinks.click(),
  ]) 
   const text = await newPage.locator(".red").textContent();
  console.log(text);
  //split the text from @ and enter into username
  const arrayText = text.split("@")
  const domain = arrayText[1].split(" ")[0]
  //console.log(domain); 
  await userName.fill(domain);
  console.log(await page.locator("#username").inputValue());
  

})
