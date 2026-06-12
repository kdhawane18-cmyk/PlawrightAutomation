const base = require('@playwright/test');

exports.customtest = base.test.extend(
{
    testDataForOrder :
    {
        username: "komaldhawane27@gmail.com",
        password: "Welcome@12",
        productName: "ZARA COAT 3"
    }

}
)