import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { test, expect } from "fixtures/pages.fixture";
import _ from "lodash";


test.describe("[Sales Product] [Delete Product]", () => {
    test("Delete product", async ({ logInPage, homePage, productsListPage, addNewProductPage  }) => {
        await logInPage.open();

        await logInPage.fillCredentials(credentials);
        await logInPage.clickOnLoginButton();

        await homePage.waitForOpened();

        await homePage.clickOnViewModule("Products");

        await productsListPage.waitForOpened();

        await productsListPage.clickAddNewProduct();
        await addNewProductPage.waitForOpened();

        const productData = generateProductData();
        await addNewProductPage.fillForm(productData);
        await addNewProductPage.clickSave();

        await productsListPage.waitForOpened();

        await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
        await productsListPage.clickCloseNotification();

        await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

        const productFromTable = await productsListPage.getFirstProductData(productData.name);
        const expectedProduct = _.omit(productData, ["amount"], ["notes"]);
        const actualProduct = _.omit(productFromTable, ["createdOn"]);
        expect(expectedProduct).toEqual(actualProduct);

        await productsListPage.deleteButton(productData.name).click();
        const { deleteModal } = productsListPage;
        await deleteModal.waitForOpened();
        await expect(deleteModal.title).toBeVisible();
        await expect(deleteModal.confirmationMessage).toBeVisible();
        await deleteModal.clickConfirm();

        await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_DELETED); 
        await productsListPage.clickCloseNotification();

        await expect(productsListPage.tableRowByName(productData.name)).not.toBeVisible();
    });
});