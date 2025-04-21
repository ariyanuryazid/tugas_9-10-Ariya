const { Builder, By, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const assert = require('assert');

describe('SauceDemo Automation Test', function () {
  this.timeout(30000); // Set waktu maksimal tiap test 30 detik

  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('firefox').build();

    // Login sekali 
    await driver.get('https://www.saucedemo.com/');
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

    // masuk halaman inventory
    await driver.wait(until.urlIs('https://www.saucedemo.com/inventory.html'), 5000);
  });

  // Setelah semua test 
  after(async () => {
    await driver.quit();
  });

  beforeEach(async () => {
    await driver.get('https://www.saucedemo.com/inventory.html');
  });

  it('Berhasil login ke saucedemo.com', async () => {
    const url = await driver.getCurrentUrl();
    assert.strictEqual(url, 'https://www.saucedemo.com/inventory.html');
  });

  it('Urutkan produk dari Z ke A', async () => {
    const dropdown = await driver.findElement(By.className('product_sort_container'));
    await dropdown.sendKeys('Name (Z to A)');

    const firstItem = await driver.wait(
      until.elementLocated(By.className('inventory_item_name')),
      5000
    );
    const itemName = await firstItem.getText();

    console.log('Produk paling atas setelah Z-A sort:', itemName);
    assert.ok(itemName); // Minimal pastikan itemName tidak kosong
  });
});

