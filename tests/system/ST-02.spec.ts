import { test, expect } from '@playwright/test';

const credentials = { username: 'standard_user', password: 'secret_sauce' };

test('ST-02: checkout validation and recovery', {
  annotation: {
    type: 'description',
    description: 'ตรวจสอบ Checkout Validation และการแก้ไขข้อมูลจนสั่งซื้อสำเร็จ',
  },
}, async ({ page }) => {
  await test.step('Login เพิ่มสินค้า และเปิด Checkout', async () => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill(credentials.username);
    await page.getByPlaceholder('Password').fill(credentials.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory\.html/);

    const backpack = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
    await backpack.getByRole('button', { name: 'Add to cart' }).click();
    await page.getByRole('button', { name: 'Cart, 1 items' }).click();
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Checkout' }).click();
  });

  await test.step('ตรวจสอบ First Name is required', async () => {
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('alert')).toContainText('First Name is required');
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  await test.step('ตรวจสอบ Last Name is required', async () => {
    await page.getByRole('textbox', { name: 'First Name' }).fill('John');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('alert')).toContainText('Last Name is required');
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  await test.step('ตรวจสอบ Postal Code is required', async () => {
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Doe');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page.getByRole('alert')).toContainText('Postal Code is required');
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });

  await test.step('แก้ไขข้อมูลและสั่งซื้อสำเร็จ', async () => {
    await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('50000');
    await page.getByRole('button', { name: 'Continue' }).click();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Finish' }).click();
    await expect(page.getByText('Thank you for your order!', { exact: true })).toBeVisible();
  });
});
