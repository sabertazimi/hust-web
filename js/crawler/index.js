const puppeteer = require('puppeteer-core');

const getSnapShot = async (user) => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: 'C:\\Users\\saber\\AppData\\Local\\Google\\Chrome SxS\\Application\\chrome.exe',
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`https://github.com/${user}`);

  await page.screenshot({ path: `${user}.png`, fullPage: true });

  await browser.close();
};

const getSource = async (user) => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Users\\saber\\AppData\\Local\\Google\\Chrome SxS\\Application\\chrome.exe',
  });
  const page = await browser.newPage();
  await page.goto(`https://github.com/${user}?tab=repositories`, { waitUntil: 'networkidle2' });


  await page.waitForSelector('#user-repositories-list li');
  const contents = await page.evaluate(() => {
    const repos = document.querySelectorAll('#user-repositories-list li h3 a');
    return Array.from(repos).map(repo => repo.href);
  });

  // const html = await page.content();
  // await page.setContent(html);
  await page.setContent(contents);
  await page.pdf({
    path: `${user}.pdf`,
    format: 'Letter',
    margin: {
      top: '1in',
      bottom: '1in',
      left: '1in',
      right: '1in',
    },
  });

  await browser.close();
};

const simulation = async () => {
  // await page.focus('selector');
  // await page.keyboard.type('data');
  // await page.click('selector');
  // await page.waitForSelector('selector');
  // await page.waitFor(duration: number);
};

getSource('sabertazimi');
