import { IProductTableRow } from "data/salesPortal/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";
import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";

export class ProductsListPage extends SalesPortalPage {
  readonly firstRowCellsLocator = this.page.locator("#table-products tbody tr:first-child td");
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator('[name="add-button"]');
  readonly tableRowByName = (productName: string) =>
    this.page.locator("table tbody tr", { has: this.page.locator("td", { hasText: productName }) });

  readonly uniqueElement = this.addNewProductButton;

  

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }


   async getFirstProductData(): Promise<IProductTableRow> {
    // Используем локатор из свойства класса
    const [name, price, manufacturer] = await this.firstRowCellsLocator.allInnerTexts();

    return {
      name: name ?? "",
      price: +price!.replace(/\D/g, ""),
      manufacturer: manufacturer! as MANUFACTURERS
    };
}}