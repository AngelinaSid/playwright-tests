// Разработать е2е теста со следующими шагами:
//  - Открыть Sales Portal локально поднятый в докере
//  - Войти в приложения используя учетные данные указанные в readme к проекту
//  - Создать продукт (модуль Products)
//  - Верифицировать появившуюся нотификацию
//  - Верифицировать созданный продукт в таблице (сравнить все имеющиеся поля, продукт должен быть самым верхним)


import test, { expect } from "@playwright/test";
import { credentials } from "../config/env";
import { NOTIFICATIONS } from "../data/salesPortal/notifications";
import { generateProductData } from "../data/salesPortal/products/generateProductData";
import { HomePage } from "../ui/pages/home.page";
import { LoginPage } from "../ui/pages/login.page";
import { AddNewProductPage } from "../ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "../ui/pages/products/productsList.page";

test.describe("[Sales Portal] [Add new Product]", async () => {
  test("Add new product", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);
    await loginPage.open();
    await loginPage.fillCredentials({
      username: credentials.username,
      password: credentials.password
    });
    await loginPage.clickOnLoginButton();
    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");

    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();

    await addNewProductPage.waitForOpened();
    const productData = generateProductData();

    await addNewProductPage.fillForm(productData);
    await addNewProductPage.saveButton.click();

    await productsListPage.waitForOpened();

    await expect(productsListPage.toastMessage)
     .toContainText(NOTIFICATIONS.PRODUCT_CREATED);

    const firstRow = await productsListPage.getFirstProductData(productData.name); 

    await expect(firstRow.name).toEqual(productData.name);
    await expect(firstRow.price).toEqual(productData.price);
    await expect(firstRow.manufacturer).toEqual(productData.manufacturer);

  });
});