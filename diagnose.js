const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage();
  await p.goto('http://localhost/login', { timeout: 30000 });
  // wait for any input to appear
  try {
    await p.waitForSelector('input', { timeout: 20000 });
  } catch(e) {
    console.log('No input found after 20s');
  }
  const inputs = await p.evaluate(() =>
    Array.from(document.querySelectorAll('input')).map(e => ({
      type: e.type, name: e.name, id: e.id, placeholder: e.placeholder
    }))
  );
  console.log('URL:', p.url());
  console.log('Inputs:', JSON.stringify(inputs, null, 2));
  const bodyText = await p.evaluate(() => document.body.innerText.substring(0, 200));
  console.log('Body text:', bodyText);
  await p.screenshot({ path: '/Users/antonknyazev/Desktop/HedgehogCRM2/screenshots/debug_login.png' });
  await b.close();
})().catch(e => console.error('Error:', e.message));
