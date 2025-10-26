// Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
// Например getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", 
// Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }

// Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2

// Сайт: https://the-internet.herokuapp.com/tables

import test, { expect, Page } from "@playwright/test";

test.describe("[Heroku App] getTableRow function", () => {

  async function getTableRow(page: Page, email: string): Promise<Record<string, string>> {
    const headers = await page.$$eval("#table2 thead th", ths =>
      ths.map(th => th.textContent?.trim() || "")
    );

    const rowHandle = page.locator("#table2 tbody tr").filter({ hasText: email }).first();

    const cells = await rowHandle.locator("td").allInnerTexts();

    const rowData: Record<string, string> = {};
    headers.forEach((header, i) => {
      if (header) rowData[header] = cells[i] ?? "";
    });

    return rowData;
  }

  test("Return table row data by email", async ({ page }) => {
    test.setTimeout(60000);
    await page.goto("https://the-internet.herokuapp.com/tables", {
    timeout: 60000,
    waitUntil: "domcontentloaded"
    });

    const expectedRows = [
       {
      "Last Name": "Smith",
      "First Name": "John",
      Email: "jsmith@gmail.com",
      Due: "$50.00",
      "Web Site": "http://www.jsmith.com"
    },
    {
      "Last Name": "Bach",
      "First Name": "Frank",
      Email: "fbach@yahoo.com",
      Due: "$51.00",
      "Web Site": "http://www.frank.com"
    },
    {
      "Last Name": "Doe",
      "First Name": "Jason",
      Email: "jdoe@hotmail.com",
      Due: "$100.00",
      "Web Site": "http://www.jdoe.com"
    },
    {
      "Last Name": "Conway",
      "First Name": "Tim",
      Email: "tconway@earthlink.net",
      Due: "$50.00",
      "Web Site": "http://www.timconway.com"
    }
    ];
    
    
    for (const expected of expectedRows) {
    const actual = await getTableRow(page, expected.Email);

    const filteredActual = Object.fromEntries(
    Object.keys(expected).map(key => [key, actual[key]])
);
    
    expect(filteredActual).toEqual(expected);
}


  });

});
