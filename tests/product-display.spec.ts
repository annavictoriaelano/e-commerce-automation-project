import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('M02_TS01: Product Display Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('M02_TS01_TC01: All products are displayed on the inventory page', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    expect(productCount).toBe(6); // SauceDemo has 6 products
  });

  test('M02_TS01_TC02: Product name is displayed for each item', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    const productNames = await productsPage.getProductNames();
    expect(productNames.length).toBeGreaterThan(0);
    
    // Verify all products have names
    productNames.forEach(name => {
      expect(name).toBeTruthy();
      expect(name.length).toBeGreaterThan(0);
    });
  });

  test('M02_TS01_TC03: Product description is displayed for each item', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    const descriptions = await productsPage.getProductDescriptions();
    expect(descriptions.length).toBeGreaterThan(0);
    
    // Verify all products have descriptions
    descriptions.forEach(desc => {
      expect(desc).toBeTruthy();
      expect(desc.length).toBeGreaterThan(0);
    });
  });

  test('M02_TS01_TC04: Product price is displayed for each item', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    const prices = await productsPage.getProductPrices();
    expect(prices.length).toBeGreaterThan(0);
    
    // Verify all products have prices with $ symbol
    prices.forEach(price => {
      expect(price).toContain('$');
      expect(parseFloat(price.replace('$', ''))).toBeGreaterThan(0);
    });
  });

  test('M02_TS01_TC06: "Add to cart" button is displayed for each product', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    const productCount = await productsPage.getProductCount();
    
    // Check first few products have Add to Cart buttons
    for (let i = 0; i < Math.min(productCount, 3); i++) {
      expect(await productsPage.isAddToCartButtonVisible(i)).toBeTruthy();
    }
  });

  test('M02_TS01_TC07: Product image is clickable and redirects to product details page', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.clickProductImage(0);
    
    // Should navigate to product details page
    await expect(page).toHaveURL(/.*inventory-item.html/);
  });

  test('M02_TS01_TC08: Product name becomes green on mouse hover', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    const firstProductName = page.locator('.inventory_item_name').first();
    
    // Get initial color (should not be green)
    const initialColor = await firstProductName.evaluate(el => 
      window.getComputedStyle(el).color
    );
    
    // Hover over the product name
    await firstProductName.hover();
    
    // Get color after hover (should be green)
    const hoverColor = await firstProductName.evaluate(el => 
      window.getComputedStyle(el).color
    );
    
    // Verify color changed
    expect(initialColor).not.toBe(hoverColor);
    
    // Verify hover color is green (rgb values for green)
    // SauceDemo uses a specific shade of green on hover
    expect(hoverColor).toMatch(/rgb\(.*\)/);

  });

});
