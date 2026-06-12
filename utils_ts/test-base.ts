import {test as baseTest} from '@playwright/test';

interface TestDataForOrder {
  username: string;
  password: string;
  productName: string;
}

export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>(
{
    testDataForOrder :
    {
        username: "komaldhawane27@gmail.com",
        password: "Welcome@12",
        productName: "ZARA COAT 3"
    }

}
)