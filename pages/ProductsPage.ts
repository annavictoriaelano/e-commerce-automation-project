import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class ProductsPage extends BasePage {
  // Selectors
  private pageTitle = '.title';
  private productItem = '.inventory_item';
  private productName = '.inventory_item_name';
  private productDescription = '.inventory_item_desc';
  private productPrice = '.inventory_item_price';
  private productImage = '.inventory_item_img';
  private addToCartButton = '[data-test^="add-to-cart"]';
  private removeButton = '[data-test^="remove"]';
  private cartBadge = '.shopping_cart_badge';
  private sortDropdown = '.product_sort_container';
  private menuButton = '#react-burger-menu-btn';
  private logoutLink = '#logout_sidebar_link';

  constructor(page: Page) {
    super(page);
  }

  async getPageTitle(): Promise<string> {
    await this.waitForSelector(this.pageTitle);
    return await this.getText(this.pageTitle);
  }

  async isProductsPageVisible(): Promise<boolean> {
    return await this.isVisible(this.pageTitle);
  }

  async getProductCount(): Promise<number> {
    const products = await this.page.$$(this.productItem);
    return products.length;
  }

  async logout(): Promise<void> {
    await this.click(this.menuButton);
    await this.click(this.logoutLink);
  }

  // Product Display Methods
  async getProductNames(): Promise<string[]> {
    return await this.page.$$eval(this.productName, elements => 
      elements.map(el => el.textContent?.trim() || '')
    );
  }

  async getProductDescriptions(): Promise<string[]> {
    return await this.page.$$eval(this.productDescription, elements => 
      elements.map(el => el.textContent?.trim() || '')
    );
  }

  async getProductPrices(): Promise<string[]> {
    return await this.page.$$eval(this.productPrice, elements => 
      elements.map(el => el.textContent?.trim() || '')
    );
  }

  async isProductImageVisible(index: number = 0): Promise<boolean> {
    const images = await this.page.$$(this.productImage);
    return images.length > index && await images[index].isVisible();
  }

  async isAddToCartButtonVisible(index: number = 0): Promise<boolean> {
    const buttons = await this.page.$$(this.addToCartButton);
    return buttons.length > index && await buttons[index].isVisible();
  }

  async clickProductImage(index: number = 0): Promise<void> {
    const images = await this.page.$$(this.productImage);
    await images[index].click();
  }

  async clickProductName(index: number = 0): Promise<void> {
    const names = await this.page.$$(this.productName);
    await names[index].click();
  }

  // Add to Cart Methods
  async addToCart(index: number = 0): Promise<void> {
    const button = await this.page.locator(this.addToCartButton).nth(index);
    await button.click();
  }

  async addToCartByProductName(productName: string): Promise<void> {
    const productId = productName.toLowerCase().replace(/\s+/g, '-');
    await this.click(`[data-test="add-to-cart-${productId}"]`);
  }

  async removeFromCart(index: number = 0): Promise<void> {
    const button = await this.page.locator(this.removeButton).nth(index);
    await button.click();
  }

  async removeFromCartByProductName(productName: string): Promise<void> {
    const productId = productName.toLowerCase().replace(/\s+/g, '-');
    await this.click(`[data-test="remove-${productId}"]`);
  }

  async isRemoveButtonVisible(index: number = 0): Promise<boolean> {
    const buttons = await this.page.$$(this.removeButton);
    return buttons.length > index && await buttons[index].isVisible();
  }

  async getCartBadgeCount(): Promise<number> {
    const isVisible = await this.isVisible(this.cartBadge);
    if (!isVisible) return 0;
    const text = await this.getText(this.cartBadge);
    return parseInt(text) || 0;
  }

  async isCartBadgeVisible(): Promise<boolean> {
    return await this.isVisible(this.cartBadge);
  }

  // Sorting Methods
  async selectSort(option: string): Promise<void> {
    await this.page.selectOption(this.sortDropdown, option);
  }

  async getCurrentSortValue(): Promise<string> {
    return await this.page.$eval(this.sortDropdown, (el: any) => el.value);
  }
}
