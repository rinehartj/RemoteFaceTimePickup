const puppeteer = require('puppeteer');

(async () => {
  // Launch the browser in headful mode with a maximized window
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null, // Disable the default viewport to use the full screen
    args: [
      '--start-maximized', // Start the browser in maximized mode
      '--use-fake-ui-for-media-stream',
      '--no-sandbox'
    ],
  });

  const page = await browser.newPage();

  // Navigate to the specified URL
  const url = 'https://facetime.apple.com/join#v=1&p=/lU1J+/EEe+ipkpyC7xgmA&k=DEhaAHTwcK_ARBSbPqjq41OET_ky2c97sGqPLOOZR0g'; // Replace with your desired URL
  await page.goto(url, { waitUntil: 'networkidle2' });

  // Enter a string into the input field
  const inputSelector = '#name-entry';
  await page.waitForSelector(inputSelector);
  await page.type(inputSelector, 'Grandma'); // Replace with your desired name

  // Click the "Continue" button
  const continueButtonSelector = 'ui-button.pill.primary.extra-large.cta.continue-button.extra-bottom-spacing';
  await page.waitForSelector(continueButtonSelector);
  await page.click(continueButtonSelector);

  // Press the SVG element
  const svgSelector = 'svg[viewBox="0 0 233.301 159.983"]';
  await page.waitForSelector(svgSelector);
  await page.click(svgSelector);

  // Click the "Join" button
  const joinButtonSelector = '#callcontrols-join-button-session-banner';
  await page.waitForSelector(joinButtonSelector);
  await page.click(joinButtonSelector);

  // Close the browser after a delay (optional)
  // await page.waitForTimeout(5000); // Wait for 5 seconds before closing
  // await browser.close();
})();