// Создайте ОДИН смоук тест со следующими шагами:

// 1. Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
// 2. Заполните форму регистрации
// 3. Проверьте, что пользователь успешно зарегистрирован

import test, { expect } from "@playwright/test";

interface ICredentials {
    firstName: string;
    lastName: string;
    address: string;
    emailAddress: string;
    phone: string;
    language: string;
    password: string;
    confirmPassword:string
}

enum NOTIFICATIONS {
    LOGIN_SUCCESS = "Registration Details",
}


test.describe("[Register] [Smoke]", () => {
    const validCredentials: ICredentials = {

    firstName: "Angelina",
    lastName: "S",
    address: "Belarus, Minsk",
    emailAddress: "sidoruk.ang@gmail.com",
    phone: "375296440471",
    language: "russian",
    password: "1233455",
    confirmPassword: "1233455"

    }
    
    
    
    

    test.beforeEach(async ({ page }) => {
    const url = "https://anatoly-karpovich.github.io/demo-registration-form/";
    await page.goto(url);
    

  });

  test("Registration with valid credentials", async ({ page }) => {

    const usernameInput = page.locator('//input[@id="firstName"]');
    const usersurnameInput = page.locator('//input[@id="lastName"]');
    const addressInput = page.locator('//textarea[@id="address"]');
    const emailaddressInput = page.locator('//input[@id="email"]');
    const phoneInput = page.locator('//input[@id="phone"]');
    const countrySelect = page.locator('//select[@id="country"]');
    const genderRadios = page.locator('//input[@type="radio" and @name="gender"]');
    const hobbiesCheck = page.locator('//input[@class="hobby"]');
    const languageInput = page.locator('//input[@id="language"]');
    const skillsSelect = page.locator('//select[@id="skills"]');
    const dateofbirthyearSelect = page.locator('//select[@id="year"]');
    const dateofbirthmonthSelect = page.locator('//select[@id="month"]');
    const dateofbirthdaySelect = page.locator('//select[@id="day"]');
    const passwordInput = page.locator('//input[@id="password"]');
    const confirmpasswordInput = page.locator('//input[@id="password-confirm"]');
    const submitButton = page.locator('//button[text()="Submit"]');
    const notification = page.locator('//h2[text()="Registration Details"]');

    
    await usernameInput.fill(validCredentials.firstName);
    await usersurnameInput.fill(validCredentials.lastName);
    await addressInput.fill(validCredentials.address);
    await emailaddressInput.fill(validCredentials.emailAddress);
    await phoneInput.fill(validCredentials.phone);
    await countrySelect.selectOption('UK');
    await expect(countrySelect.locator('option:checked')).toHaveText('UK');
    await genderRadios.nth(1).check();
    await expect(genderRadios.nth(1)).toBeChecked();
    await hobbiesCheck.nth(0).check();
    await expect(hobbiesCheck.nth(0)).toBeChecked();
    await languageInput.fill(validCredentials.language);
    await skillsSelect.selectOption('JavaScript');
    await expect(skillsSelect).toHaveValue('JavaScript');
    await dateofbirthyearSelect.selectOption('1999');
    await expect(dateofbirthyearSelect.locator('option:checked')).toHaveText('1999');
    await dateofbirthmonthSelect.selectOption('October');
    await expect(dateofbirthmonthSelect.locator('option:checked')).toHaveText('October');
    await dateofbirthdaySelect.selectOption('7');
    await expect(dateofbirthdaySelect.locator('option:checked')).toHaveText('7');
    await passwordInput.fill(validCredentials.password);
    await confirmpasswordInput.fill(validCredentials.confirmPassword);
    await submitButton.click();


    await expect(notification).toHaveText(NOTIFICATIONS.LOGIN_SUCCESS)
    });
  


    


   }); 
