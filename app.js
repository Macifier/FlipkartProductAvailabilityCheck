const puppeteer = require("puppeteer");
(async () => {
  try {
    let browser = await puppeteer.launch({
      headless: false,
    });
    let page = await browser.newPage();
    await page.goto(
      "https://www.flipkart.com/realme-x2-pearl-green-64-gb/p/itm75023903eb431"
    );
    await page.waitForSelector("div.bhgxx2");
    let stockAvailability = await page.evaluate(() => {
      let outOfStockDiv = document.querySelector(".bhgxx2 ._9-sL7L");
      if (outOfStockDiv !== null && outOfStockDiv.textContent === "Sold Out") {
        return false;
      } else {
        return true;
      }
    });
    await browser.close();
    stockAvailability ? console.log("In Stock") : console.log("Out Of Stock");
  } catch (err) {
    console.log(err);
    await browser.close();
  }
})();
