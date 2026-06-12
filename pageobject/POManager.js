const {LoginPage} = require('../pageobject/LoginPage');
const {DashboardPage} = require('../pageobject/DashboardPage');
const {OrdersHistoryPage} = require('../pageobject/OrdersHistoryPage');
const {OrdersReviewPage} = require('../pageobject/OrdersReviewPage');
const {CartPage} = require('../pageobject/CartPage');

class POManager{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);

    }

    getLoginPage()
    {
        return this.loginPage;
    }
    getDashboardPage()
    {
        return this.dashboardPage;
    }
    getOrdersHistoryPage()
    {
        return this.ordersHistoryPage;
    }
    getCartPage()
    {
        return this.cartPage;
    }
    getOrderReviewPage()
    {
        return this.ordersReviewPage;
    }
     
}
module.exports = {POManager};