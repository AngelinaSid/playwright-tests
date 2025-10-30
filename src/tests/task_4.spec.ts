// Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
// https://anatoly-karpovich.github.io/demo-login-form/

// Требования:
// Страница регистрации:
//   Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы,
//   как и имя состоящее из одних пробелов
//   Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и 
//   нижнем регистрах, пароль из одних пробелов запрещен

// Страница логина:
//   Username: обязательное
//   Password: обязательное

import test, { expect } from "@playwright/test";
import data from "./testData/registerNegativeCases.json";

interface ICredentials {
  name: string;
  password: string;
}

interface ICase {
  name: string;
  password: string;
  message: string;
  description: string;
}

enum MESSAGES {
    invalidCredentials = "Please, provide valid data",

    emptyName = "Username is required",
    nameLessThreeCharacters = "Username should contain at least 3 characters",
    existingName = "Username is in use",
    nameWithSpaces = "Prefix and postfix spaces are not allowed is username",

    shortPassword = "Password should contain at least 8 characters",
    passwordWithSpaces = "Password is required",
    passwordWithoutLowerCase = "Password should contain at least one character in lower case",
    emptyPassword = "Password is required",

    successMessage = "Successfully registered! Please, click Back to return on login page"
};

test.describe("[Register form] [Negative tests]", () => {
  

test.beforeEach(async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
    await expect(page.locator("#loginForm")).toBeVisible();

    const registerOnLoginButton = page.locator('//input[@id="registerOnLogin"]');
    await registerOnLoginButton.click();

    const registerForm = page.locator("#registerForm");
    await expect(registerForm).toBeVisible();
  });


for (const { name, password, message, description } of data.invalidUsernameCases){
  test(`Register form - username validation: ${description}`, async ({ page }) => {
    const usernameInputOnRegister = page.locator("#userNameOnRegister");
    const passwordInputOnRegister = page.locator("#passwordOnRegister");
    const registerButtonOnRegiser = page.locator("#register");
    const errorMessage = page.locator("#errorMessageOnRegister");

    await usernameInputOnRegister.fill(name);
    await passwordInputOnRegister.fill(password);
    await registerButtonOnRegiser.click();
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(`${message}`);
  });
};

for (const { name, password, message, description } of data.invalidPasswordCases) {
  test(`Register form - password validation: ${description}`, async ({ page }) => {
    const usernameInputOnRegister = page.locator("#userNameOnRegister");
    const passwordInputOnRegister = page.locator("#passwordOnRegister");
    const registerButtonOnRegiser = page.locator("#register");
    const errorMessage = page.locator("#errorMessageOnRegister");

    await usernameInputOnRegister.fill(name);
    await passwordInputOnRegister.fill(password);
    await registerButtonOnRegiser.click();
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toHaveText(`${message}`);
  });
};

for (const { name, password, message, description } of data.existingUser) {
    test(`Register form - existing name`, async ({ page }) => {
        await page.locator("#userNameOnRegister").fill(name);
        await page.locator("#passwordOnRegister").fill(password);
        await page.locator("#register").click();
        
        
        // const successMessage = page.locator("#successMessageOnRegister"); 
        // await expect(successMessage).toBeVisible({ timeout: 10000 });
        // await expect(successMessage).toHaveText(MESSAGES.successMessage);

 
        await page.locator("#userNameOnRegister").fill(name);
        await page.locator("#passwordOnRegister").fill(password);
        await page.locator("#register").click();

       const errorMessage = page.locator("#errorMessageOnRegister");
       await expect(errorMessage).toBeVisible();
       await expect(errorMessage).toHaveText(MESSAGES.existingName);
});
};
});