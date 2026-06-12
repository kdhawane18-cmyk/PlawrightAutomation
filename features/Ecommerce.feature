Feature: Ecommerce Validations

Scenario: Placing the order
Given a login to Ecommerce application with "username" and "password"
When Add "Zara coat 3" to cart
Then "Zara coat 3" should displayed in the cart
When Enter valid details and place the order
Then order should present in the order history page
