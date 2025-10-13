//   Разработайте смоук тест-сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/

//   Требования:
//     Страница регистрации:
//       Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//       Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
//     Страница логина:
//       Username: обязательное
//       Password: обязательное

import test, { expect } from "@playwright/test";

interface ICredentials {
    username: string;
    password: string;
}

enum NOTIFICATIONS {
    LOGIN_SUCCESS = "Successfully registered! Please, click Back to return on login page",
    INVALID_DATA = "Please, provide valid data",
}


test.describe("[Register] [Smoke]", () => {
    const validCredentials: ICredentials = {
    username: "angelina",
    password: "12345678Aa!",

    }
    
    
    
    const invalidCredentials: ICredentials = 
    {
      username: "t   ",
      password: "4",
    };

    

    test.beforeEach(async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-login-form/";
    await page.goto(url);
    

  });

  test("Registration with valid credentials", async ({ page }) => {

    const registerOnLoginButton = page.locator('//input[@id="registerOnLogin"]');
    const usernameInput = page.locator('//input[@id="userNameOnRegister"]');
    const passwordInput = page.locator('//input[@id="passwordOnRegister"]');
    const submitButton = page.locator('//input[@id="register"]');
    const notification = page.locator('//h4[@id="errorMessageOnRegister"]')

    await registerOnLoginButton.click();
    await usernameInput.fill(validCredentials.username);
    await passwordInput.fill(validCredentials.password);
    await submitButton.click();

    await expect(notification).toBeVisible();
    await expect(notification).toHaveText(NOTIFICATIONS.LOGIN_SUCCESS)
    });
  


    test("Registration with invalid credentials", async ({ page }) => {
    const registerOnLoginButton = page.locator('//input[@id="registerOnLogin"]');
    const usernameInput = page.locator('//input[@id="userNameOnRegister"]');
    const passwordInput = page.locator('//input[@id="passwordOnRegister"]');
    const submitButton = page.locator('//input[@id="register"]');
    const notification = page.locator('//h4[@id="errorMessageOnRegister"]')

    await registerOnLoginButton.click();
    await usernameInput.fill(invalidCredentials.username);
    await passwordInput.fill(invalidCredentials.password);
    await submitButton.click();

    await expect(notification).toHaveText(NOTIFICATIONS.INVALID_DATA)

  });


   }); 