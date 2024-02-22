const puppeteer = require('puppeteer'); 

async function scrapeProduct(url) {
    const browser = await puppeteer.launch(); 
    const page = await browser.newPage(); 
    await page.goto(url); 

    //obtaining image url 
    const el = await page.$('#landingImage');
    const src = await el.getProperty('src'); 
    const srcTxt = await src.jsonValue();  

    //getting price of item
    const el2 = await page.$('.a-offscreen'); 
    const price = await el2.getProperty('textContent'); 
    const priceTxt = await price.jsonValue();

    //getting item name 
    const el3 = await page.$('#productTitle'); 
    const itemName = await el3.getProperty('textContent'); 
    const nameTxt = await itemName.jsonValue();

    console.log({srcTxt}, {priceTxt}, {nameTxt});

    browser.close();
}

scrapeProduct('https://www.amazon.ca/gp/product/B08CDJB1BT/ref=ox_sc_act_title_1?smid=A3GLPH6N4HHFRW&psc=1')
