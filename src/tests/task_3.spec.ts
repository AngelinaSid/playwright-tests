// Разработать тест со следующими шагами:
//   - открыть https://the-internet.herokuapp.com/
//   - перейти на страницу Dynamic Controls
//   - Дождаться появления кнопки Remove
//   - Завалидировать текста в заголовке страницы
//   - Чекнуть чекбокс
//   - Кликнуть по кнопке Remove
//   - Дождаться исчезновения чекбокса
//   - Проверить наличие кнопки Add
//   - Завалидировать текст It's gone!
//   - Кликнуть на кнопку Add
//   - Дождаться появления чекбокса
//   - Завалидировать текст It's back!

import test, { expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    const url = "https://the-internet.herokuapp.com/";
    const loginLink = page.locator('a[href="/dynamic_controls"]');
    await page.goto(url);
    await loginLink.click();
  });

test.describe("[Heroku app] [Dynamic controls]", () => {
test("Dynamic Controls", async ({ page }) => {
    const removeButton  = page.getByRole('button', { name: 'Remove' });
    await expect(removeButton).toBeVisible();
    const heading = page.getByRole('heading', { name: 'Dynamic Controls' });
    await expect(heading).toBeVisible();
    const checkbox = page.getByRole('checkbox');
    await expect(checkbox).toBeVisible();
    await checkbox.click();
    await expect(checkbox).toBeChecked();
    await removeButton.click();
    await expect(checkbox).toBeHidden();
    const addButton = page.getByRole('button', { name: 'Add' });
    await expect(addButton).toBeVisible();
    const textAfterClicking1 = page.getByText("It's gone!");
    await expect(textAfterClicking1).toBeVisible();
    await addButton.click();
    await expect(checkbox).toBeVisible();
    const textAfterClicking2 = page.getByText("It's back!");
    await expect(textAfterClicking2).toBeVisible();

})
})