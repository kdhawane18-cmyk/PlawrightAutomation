const { test, expect } = require('@playwright/test');
const {customtest} =  require('../utils/test-base');
const { text } = require('node:stream/consumers');
const { POManager } = require('../pageobject/POManager');
//json > string > Javascript object
const dataset = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json')));

//test.describe.configure({ mode: 'parallel' })
for (const data of dataset)
{
test(`@Web Client app login for ${data.productName}`, async ({ browser }) => {

  const context = await browser.newContext();
  const page = await context.newPage();
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(data.username, data.password);
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(data.productName);
  await dashboardPage.NavigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(data.productName)
  await cartPage.Checkout();

  const ordersReviewPage = poManager.getOrderReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);
  await cartPage.NavigateToOrders();
  const ordershistoryPage = poManager.getOrdersHistoryPage();
  await ordershistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordershistoryPage.getOrderId())).toBeTruthy();

});
}

customtest(`Client app login figure`, async ({ browser, testDataForOrder }) => {

  const context = await browser.newContext();
  const page = await context.newPage();
  const poManager = new POManager(page);
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(testDataForOrder.username, testDataForOrder.password);
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  await dashboardPage.NavigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
  await cartPage.Checkout();
});
