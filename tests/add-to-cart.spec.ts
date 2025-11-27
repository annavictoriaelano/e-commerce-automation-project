import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('M02_TS02: Add to Cart from Catalog Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('M02_TS02_TC01: User can add a product to cart from the inventory page', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.addToCart(0);
    
    expect(await productsPage.isCartBadgeVisible()).toBeTruthy();
    expect(await productsPage.getCartBadgeCount()).toBe(1);
  });

  test('M02_TS02_TC02: Button text changes to "Remove" after adding product to cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.addToCart(0);
    
    expect(await productsPage.isRemoveButtonVisible(0)).toBeTruthy();
  });

  test('M02_TS02_TC03: Shopping cart badge displays the correct item count after adding a product', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Initially no badge or count is 0
    const initialCount = await productsPage.getCartBadgeCount();
    expect(initialCount).toBe(0);

    await productsPage.addToCart(0);
    
    expect(await productsPage.getCartBadgeCount()).toBe(1);
  });

  test('M02_TS02_TC04: User can remove a product from cart using the "Remove" button', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // First add a product
    await productsPage.addToCart(0);
    expect(await productsPage.getCartBadgeCount()).toBe(1);

    // Then remove it
    await productsPage.removeFromCart(0);
    
    expect(await productsPage.getCartBadgeCount()).toBe(0);
  });

  test('M02_TS02_TC05: Shopping cart badge count decreases after removing a product', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Add 2 products
    await productsPage.addToCart(0);
    await productsPage.addToCart(1);
    expect(await productsPage.getCartBadgeCount()).toBe(2);

    // Remove one product
    await productsPage.removeFromCart(0);
    
    expect(await productsPage.getCartBadgeCount()).toBe(1);
  });

  test('M02_TS02_TC06: User can add multiple different products to cart', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    await productsPage.addToCart(0);
    await productsPage.addToCart(1);
    await productsPage.addToCart(2);
    
    expect(await productsPage.getCartBadgeCount()).toBe(3);
  });

  test('M02_TS02_TC07: Shopping cart badge displays correct total count for multiple items', async ({ page }) => {
    const productsPage = new ProductsPage(page);

    // Add 4 different products by their actual index position on the page
    // Each product maintains its position, so we can use fixed indices
    await productsPage.addToCartByProductName('sauce-labs-backpack');
    await productsPage.addToCartByProductName('sauce-labs-bike-light');
    await productsPage.addToCartByProductName('sauce-labs-bolt-t-shirt');
    await productsPage.addToCartByProductName('sauce-labs-fleece-jacket');
    
    expect(await productsPage.getCartBadgeCount()).toBe(4);
  });

});
