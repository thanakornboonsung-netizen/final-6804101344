import { test, expect } from '@playwright/test';

const credentials = { username: 'standard_user', password: 'secret_sauce' };

test('IT-01: top-down REAL Login -> browser-level Inventory STUB', {
  annotation: {
    type: 'description',
    description: 'ทดสอบ Login จริงร่วมกับ Inventory Stub ที่จำลองด้วย page.setContent()',
  },
}, async ({ page }) => {
  await test.step('Login ผ่านหน้าเว็บไซต์จริง', async () => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill(credentials.username);
    await page.getByPlaceholder('Password').fill(credentials.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  await test.step('สร้าง Inventory Stub', async () => {
    await page.setContent(`
      <!doctype html>
      <html lang="en">
        <head><meta charset="utf-8"><title>Inventory Stub</title></head>
        <body>
          <main>
            <h1>Mock Inventory Ready</h1>
            <ul aria-label="Mock products">
              <li class="inventory_item">Mock Backpack</li>
              <li class="inventory_item">Mock Bike Light</li>
            </ul>
          </main>
        </body>
      </html>
    `);
  });

  await test.step('ตรวจสอบผลจาก Stub', async () => {
    await expect(page.getByRole('heading', { name: 'Mock Inventory Ready' })).toBeVisible();
    await expect(page.locator('.inventory_item')).toHaveCount(2);
    await expect(page.getByText('Mock Backpack', { exact: true })).toBeVisible();
    await expect(page.getByText('Mock Bike Light', { exact: true })).toBeVisible();
  });
});
