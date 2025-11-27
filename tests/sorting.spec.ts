import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('M02_TS03: Sorting Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('M02_TS03_TC01: Products can be sorted by "Name (A to Z)"', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.selectSort('az');
    
    const productNames = await productsPage.getProductNames();
    const sortedNames = [...productNames].sort();
    
    expect(productNames).toEqual(sortedNames);
  });

  test('M02_TS03_TC02: Products can be sorted by "Name (Z to A)"', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.selectSort('za');
    
    const productNames = await productsPage.getProductNames();
    const sortedNames = [...productNames].sort().reverse();
    
    expect(productNames).toEqual(sortedNames);
  });

  test('M02_TS03_TC03: Products can be sorted by "Price (low to high)"', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.selectSort('lohi');
    
    const prices = await productsPage.getProductPrices();
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);
    
    expect(numericPrices).toEqual(sortedPrices);
  });

  test('M02_TS03_TC04: Products can be sorted by "Price (high to low)"', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.selectSort('hilo');
    
    const prices = await productsPage.getProductPrices();
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));
    const sortedPrices = [...numericPrices].sort((a, b) => b - a);
    
    expect(numericPrices).toEqual(sortedPrices);
  });

  test('M02_TS03_TC05: Sort order persists after adding items to cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.selectSort('hilo');
    
    // Get initial sorted order
    const pricesBeforeAdd = await productsPage.getProductPrices();
    
    // Add item to cart
    await productsPage.addToCart(0);
    
    // Verify sort order remains the same
    const pricesAfterAdd = await productsPage.getProductPrices();
    expect(pricesAfterAdd).toEqual(pricesBeforeAdd);
    
    // Verify sort dropdown still shows correct value
    expect(await productsPage.getCurrentSortValue()).toBe('hilo');
  });

  test('M02_TS03_TC06: Default sort order is "Name (A to Z)" on page load', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    const currentSort = await productsPage.getCurrentSortValue();
    expect(currentSort).toBe('az');
    
    // Verify products are actually sorted A-Z
    const productNames = await productsPage.getProductNames();
    const sortedNames = [...productNames].sort();
    expect(productNames).toEqual(sortedNames);
  });

});
