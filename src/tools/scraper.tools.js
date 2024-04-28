const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeData() {
  const url = "https://interaction24.ixda.org/";
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    // Extract data using Cheerio selectors
  } catch (error) {
    console.error("Error scraping data", error);
  }
}

scrapeData();
