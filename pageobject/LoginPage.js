class LoginPage {

constructor(page)
{
    this.page = page;
    this.SigninButton = page.locator('[value="Login"]');
    this.userName = page.locator('#userEmail');
    this.password = page.locator('#userPassword');
    


}
async validLogin(username, password){

  await this.userName.fill(username);
  await this.password.fill(password);
  await this.SigninButton.click();
  await this.page.waitForLoadState('networkidle');
}

async goTo(){
    await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
}

}
module.exports = {LoginPage}