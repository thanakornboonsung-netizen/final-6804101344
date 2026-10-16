import { test, expect } from '@playwright/test';

const credentials = { username: 'standard_user', password: 'secret_sauce' };
const productNames = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

test('ST-01: complete purchase of two products', {
  annotation: {
    type: 'description',
    description: 'ทดสอบการซื้อ Backpack และ Bike Light ตั้งแต่ Login จนสั่งซื้อสำเร็จ',
  },
}, async ({ page }) => {
  await test.step('Login และตรวจสอบ Inventory', async () => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill(credentials.username);
    await page.getByPlaceholder('Password').fill(credentials.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(page.getByText('Products', { exact: true })).toBeVisible();
  });

  await test.step('เพิ่มสินค้าสองรายการ', async () => {
    for (const productName of productNames) {
      const product = page.locator('.inventory_item').filter({ hasText: productName });
      await product.getByRole('button', { name: 'Add to cart' }).click();
    }
    await expect(page.getByRole('button', { name: 'Cart, 2 items' })).toBeVisible();
  });

  await test.step('ตรวจสอบ Cart', async () => {
    await page.getByRole('button', { name: 'Cart, 2 items' }).click();
    for (const productName of productNames) {
      await expect(page.getByText(productName, { exact: true })).toBeVisible();
    }
    await page.getByRole('button', { name: 'Checkout' }).click();
  });

  await test.step('กรอก Checkout Information', async () => {
    await page.getByRole('textbox', { name: 'First Name' }).fill('John');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
    await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('50000');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
  });

  await test.step('ตรวจสอบ Overview และสั่งซื้อ', async () => {
    for (const productName of productNames) {
      await expect(page.getByText(productName, { exact: true })).toBeVisible();
    }
    await page.getByRole('button', { name: 'Finish' }).click();
  });

  await test.step('ตรวจสอบ Order Complete', async () => {
    await expect(page.getByText('Thank you for your order!', { exact: true })).toBeVisible();
  });
});
