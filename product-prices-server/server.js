const express = require("express");
const app = express();
const cors = require("cors");
const puppeteer = require("puppeteer");
//configure cors to accept requests from the frontend server
const corsOptions = {
    //vite servers run on port 5173
    origin : ["http://localhost:5173"],
};

//initialize app to use cors
app.use(cors(corsOptions));

app.get("/prices", async (req,res) => {
    //get product name from search query
    const product = req.query["search"];
    //when no search query is given
    if (product === undefined) {
        return res.send("No search query given")
    }    
    //query is given, so fetch the product prices
    const productsJson = await getProductPrices(req.query["search"])
    res.json(productsJson);
});


/////// potential errors to fix later !!!
// 1.) if a product is able to be financed, the structure of the page is different to show
//  a finaced option, so the queryselector usually used is incorrect. 
//  skips to the next product price offer if it is a financed option
// 2.) something another country's website is pulled up and the currency type doesn't match

//get product prices from product title using puppeteer
//returns json object of prices
async function getProductPrices (productTitle) {
    const offers = [];
    const allRetailers = {};
    console.log(`Getting product prices for ${productTitle}...`);
    
    const browser = await puppeteer.launch({
        //toggle on and off for headless (testing)
        //headless: false,
        defaultViewport: false,
    });
    const page = await browser.newPage();
    await page.goto(`https://www.bing.com/shop?q=${productTitle}&FORM=SHOPTB`, {waitUntil: 'domcontentloaded'});

    //get all elements on page that show the offer for the product (36 by default)
    const currentOffers = await page.$$('li.br-item')
    
    //go through each offer (list element)
    for (let i = 0; i < currentOffers.length; i++) {
        //get retailer name
        const retailerName = await page.evaluate(el => el.querySelector(".br-seller").textContent.toLowerCase(), currentOffers[i]);

        //retailer has not been addeed, so create an object for it
        if (allRetailers[retailerName] == undefined) {
            allRetailers[retailerName] = {}
        } 
        //ensures no dupicate retailers are added
        else {
            continue;
        }

        //get price of the current offer
        const offerPrice = await page.evaluate(el => el.querySelector(".resp-one-line.br-max-width").textContent, currentOffers[i]);

        //get the link that displays the link to the retailer's page for this offer
        const offerLink = await page.evaluate(el => el.querySelector(".l2-crd-clck.sj_spcls").getAttribute("href"), currentOffers[i]);
        
        //go to link of offer details on a new page
        const page2 = await browser.newPage();


        /*for some reason the hrefs will sometimes only have part of the link so account for that here */

        //when full link provided
        if (offerLink.includes("https://www.bing.com")) {
            await page2.goto(offerLink, {waitUntil: 'domcontentloaded'});
        }
        //when part of the link provided
        else {
            await page2.goto(`https://www.bing.com/${offerLink}`, {waitUntil: 'domcontentloaded'});
        }

        /* sometimes an error occurs where the product is not listed anymore, so account for this here
        and just continue if the element with the retailer link is not found*/
        try {
            await page2.waitForSelector('#br-prim-obo > a:nth-child(1)', {visible : true, timeout : 2000})
        }
        catch (error) {
            continue;
        }
        //get link to offer listing on retailer's site 
        const retailerLink = await page2.$eval('#br-prim-obo > a:nth-child(1)', el => el.getAttribute("href"));
        await page2.close();

        //add info to object
        offers.push({
            "retailer" : retailerName,
            "price": offerPrice,
            "link": retailerLink
        });
    }
    console.log(`Completed`);
    await browser.close();    
    return offers;
}

//start server on port 8080
app.listen(8080, () => {
    console.log("Server started on port 8080");
})