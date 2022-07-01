const puppeteer = require('puppeteer');

export default async function scrapp(path) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(path);

  await page.waitForSelector('input[id=login-username]');
  await page.$eval('input[id=login-username]', el => el.value = '********');

  await page.waitForSelector('input[id=login-password]');
  await page.$eval('input[id=login-password]', el => el.value = '********');
  
  await page.waitForSelector('button[id="login-button"]');
  await page.click('button[id="login-button"]');

  await browser.close();
}