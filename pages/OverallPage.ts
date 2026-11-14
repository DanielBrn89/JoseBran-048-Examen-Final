import { Page, Locator } from '@playwright/test';

export class OverallPage {
  readonly page: Page;
  readonly rows: Locator;
  readonly firstModelLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.rows = page.locator('table tbody tr');
    // Tercera columna = modelo
    this.firstModelLink = this.rows.first().locator('td').nth(2).getByRole('link');
  }

  async goto() {
    await this.page.goto('/overall');
    await this.firstModelLink.waitFor({ state: 'visible' });
  }

  async openFirstCar() {
    await this.firstModelLink.click();
  }
}
