const puppeteer = require('puppeteer'); 

//variable that holds search term 
let searchTerm = "AA batteries"; 

async function EbayScrape() {
    const browser = await puppeteer.launch({headless: false}); 
    const page = await browser.newPage(); 

    //going to ebay
    await page.goto('https://www.ebay.ca');

    //waiting for search input field and insert search term
    await page.waitForSelector('input#gh-ac'); 
    await page.type('input#gh-ac', searchTerm); 

    //wait for search button and click it
    await page.waitForSelector('input[type="submit"]'); 
    await page.click('input[type="submit"]'); 

    //wait for results to load 
    await page.waitForSelector('.ITALIC'); 
    const url = await page.url();  

    //extracting title and price of first listing
    const firstItemPrice = await page.$eval('.ITALIC', el => el.innerText); 

    console.log('Price: ', firstItemPrice);
    console.log('Link: ', url);  
    console.log('----------------------------------------------------------------------------------')

    //trying to click on a listing 
    await page.waitForSelector('a.s-item__link'); 
    await page.click('a.s-item__link'); 

    //wait for listing to load 
    await page.waitForSelector('.x-item-title__mainTitle'); 
    const listingTitle = await page.$eval('.x-item-title__mainTitle', el => el.innerText); 
    console.log(listingTitle);
    
    await browser.close();
}

EbayScrape(); 
