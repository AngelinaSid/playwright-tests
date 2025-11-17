import { IProductInTable } from "data/salesPortal/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";
import { DeleteProductModal } from "./delete.modal";
import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";

export class ProductsListPage extends SalesPortalPage {
  readonly firstRowCellsLocator = this.page.locator("#table-products tbody tr:first-child td");
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addNewProductButton = this.page.locator('[name="add-button"]');
  readonly tableRowByName = (productName: string) =>
    this.page.locator("table tbody tr", { has: this.page.locator("td", { hasText: productName }) });

  readonly nameCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(0);
  readonly priceCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(1);
  readonly manufacturerCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(2);
  readonly createdOnCell = (productName: string) => this.tableRowByName(productName).locator("td").nth(3);
  readonly editButton = (productName: string) => this.tableRowByName(productName).getByTitle("Edit");
  readonly detailsButton = (productName: string) => this.tableRowByName(productName).getByTitle("Details");
  readonly deleteButton = (productName: string) => this.tableRowByName(productName).getByTitle("Delete");
  readonly firstRowName = this.page.locator("table tbody tr").first().locator("td").nth(0);
  readonly deleteModal = new DeleteProductModal(this.page);
  readonly uniqueElement = this.addNewProductButton;
  readonly tableRow = this.page.locator("tbody tr");

  

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }


    async getFirstProductData(productName: string): Promise<IProductInTable> {
    const [name, price, manufacturer, createdOn] = await this.tableRowByName(productName).locator("td").allInnerTexts();
    return {
      name: name!,
      price: +price!.replace("$", ""),
      manufacturer: manufacturer! as MANUFACTURERS,
      createdOn: createdOn!,
    };  
}
  async getTableData(): Promise<IProductInTable[]> {
    const data: IProductInTable[] = [];

    const rows = await this.tableRow.all();
    for (const row of rows) {
      const [name, price, manufacturer, createdOn] = await row.locator("td").allInnerTexts();
      data.push({
        name: name!,
        price: +price!.replace("$", ""),
        manufacturer: manufacturer! as MANUFACTURERS,
        createdOn: createdOn!,
      });
    }
    return data;
  }
}