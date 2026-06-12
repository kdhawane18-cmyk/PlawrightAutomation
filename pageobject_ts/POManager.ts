
import {LoginPage} from '../pageobject_ts/LoginPage';
import {DashboardPage} from '../pageobject_ts/DashboardPage';
import {OrdersHistoryPage} from '../pageobject_ts/OrdersHistoryPage';
import {OrdersReviewPage} from '../pageobject_ts/OrdersReviewPage';
import {CartPage} from '../pageobject_ts/CartPage';
import {Page} from '@playwright/test';



export class POManager{

loginPage: LoginPage;
dashboardPage: DashboardPage;   
ordersHistoryPage: OrdersHistoryPage;
ordersReviewPage: OrdersReviewPage;
cartPage: CartPage;
page: Page;

    constructor(page:Page)
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
export default POManager;