import { chromium } from 'playwright';


async function getSecretMessage(URL) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(URL);
  await page.waitForSelector('table');

  const coordinates = await page.evaluate(() => {
    const rows = document.querySelectorAll('table tbody tr');
    return Array.from(rows).slice(1).map((row) => {
      const cells = row.querySelectorAll('td');
      return {
        x: parseInt(cells[0].textContent),
        character: cells[1].textContent === "" ? " " : cells[1].textContent,
        y: parseInt(cells[2].textContent),
      };
    });
  });

  let maxX = 0;
  let maxY = 0;
  for (const coord of coordinates) {
    maxX = Math.max(maxX, coord.x);
    maxY = Math.max(maxY, coord.y);
  }

  let secretMessage = Array(maxY + 1).fill().map(() => Array(maxX + 1).fill(' '));

  for (const coord of coordinates) {
    secretMessage[maxY - coord.y][coord.x] = coord.character;
  }

  for (let i = 0; i < secretMessage.length; i++) {
    console.log(secretMessage[i].join(''));
  }

  await browser.close();
}


const URL = 'https://docs.google.com/document/d/e/2PACX-1vRMx5YQlZNa3ra8dYYxmv-QIQ3YJe8tbI3kqcuC7lQiZm-CSEznKfN_HYNSpoXcZIV3Y_O3YoUB1ecq/pub';
getSecretMessage(URL);
