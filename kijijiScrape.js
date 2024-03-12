const puppeteer = require('puppeteer'); 

//variable that holds search term 
let searchTerm = "AA batteries"; 

async function EbayScrape() {
    const browser = await puppeteer.launch({headless: false}); 
    const page = await browser.newPage(); 

    //going to ebay
    await page.goto('https://www.kijiji.ca/b-kitchener-area/light-bulb/k0l1700209?rb=true&dc=true', { waitUntil: 'networkidle0' });

    const firstItemPrice = await page.$eval('ul.sc-68931dd3-0.dFkkEs li[data-testid="listing-card-list-item-1"] p[data-testid="listing-price"]', el => el.innerText); 
    const url = await page.$eval('ul.sc-68931dd3-0.dFkkEs li[data-testid="listing-card-list-item-1"] a', el => el.getAttribute('href'));

    console.log('Price: ', firstItemPrice);
    console.log('Link: ', url);  
    console.log('----------------------------------------------------------------------------------')
    
    await browser.close();
}

EbayScrape(); 
