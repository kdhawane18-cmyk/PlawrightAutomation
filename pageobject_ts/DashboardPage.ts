import { Page, expect,Locator } from "@playwright/test";

export class DashboardPage{

    products: Locator;
    cart: Locator;
    productsText: Locator;

    constructor(page: Page){
        this.products = page.locator('.card-body');
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");

    }
    async searchProductAddCart(productName: string){
        
          const allTitles = await this.productsText.allTextContents();
          console.log(allTitles);
          const count = await this.products.count();
          for (let i = 0; i < count; i++)
          {
            if( await this.products.nth(i).locator("b").textContent() === productName)
            {
                // add to cart
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
          }
    }

    async NavigateToCart(){
        await this.cart.click();
    }

}
export default DashboardPage;
