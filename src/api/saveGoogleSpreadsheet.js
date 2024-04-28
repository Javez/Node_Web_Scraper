const { google } = require("googleapis");

async function uploadToSpreadsheet(data) {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  // Use sheets.spreadsheets.create and sheets.spreadsheets.values.append methods to create a new spreadsheet and add data to it
}
