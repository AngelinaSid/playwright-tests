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
  const invalidUsernameCases: ICase[] = [
 {
    name: "",
    password: "",
    message: MESSAGES.invalidCredentials,
    description: "Empty username and password"
  },
 {
    name: "",
    password: "SecretPw123!@#",
    message: MESSAGES.emptyName,
    description: "Empty username"
  },
  {
    name: "     ",
    password: "SecretPw123!@#",
    message: MESSAGES.nameWithSpaces,
    description: "Username only with spaces"
  },
  {
    name: " Angelina",
    password: "PassWord!@",
    message: MESSAGES.nameWithSpaces,
    description: "Spaces before username"
  },
 {
    name: "Angelina ",
    password: "PassWord!@",
    message: MESSAGES.nameWithSpaces,
    description: "Spaces after username"
  },
  {
    name: "An",
    password: "PassWord!@",
    message: MESSAGES.nameLessThreeCharacters,
    description: "Username is less than 3 characters"
  }
];

const invalidPasswordCases: ICase[] = [
  {
    name: "Angelina",
    password: "",
    message: MESSAGES.emptyPassword,
    description: "Empty password"
  },
  {
    name: "Angelina",
    password: "123",
    message: MESSAGES.shortPassword,
    description: "Password less than 8 characters"
  },
  {
    name: "Angelina",
    password: "AAAAAAAAAA",
    message: MESSAGES.passwordWithoutLowerCase,
    description: "Password without lowercase"
  },
  {
    name: "Angelina",
    password: "        ",
    message: MESSAGES.passwordWithSpaces,
    description: "Password contains only spaces"
  }
];

const existingUser: ICase[] = [
    {
    name: "Angelina",
    password: "Sangelina!23",
    message: MESSAGES.existingName,
    description: "Existing name"
    }
]

test.beforeEach(async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/demo-login-form/");
    await expect(page.locator("#loginForm")).toBeVisible();

    const registerOnLoginButton = page.locator('//input[@id="registerOnLogin"]');
    await registerOnLoginButton.click();

    const registerForm = page.locator("#registerForm");
    await expect(registerForm).toBeVisible();
  });


for (const { name, password, message, description } of invalidUsernameCases){
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

for (const { name, password, message, description } of invalidPasswordCases) {
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

for (const { name, password, message, description } of existingUser) {
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