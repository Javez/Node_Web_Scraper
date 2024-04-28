const fs = require("fs");

function saveJSON(data) {
  fs.writeFileSync("data.json", JSON.stringify(data));
}

function saveCSV(data) {
  // Write data to CSV file
}
