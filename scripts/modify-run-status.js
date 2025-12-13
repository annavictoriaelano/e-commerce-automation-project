const { google } = require('googleapis');
const fs = require('fs');

// Credentials file path
const CREDENTIALS_PATH = 'D:\\Project Credentials\\e-commerce-automation-project-d45821641781.json';

// Your Google Sheet ID
const SPREADSHEET_ID = '1l3-RczqZHXSKHfZpiDKxRFKxIrd-i4scV3rUL_MBk5E';

// Sheet name (the tab in your spreadsheet)
const SHEET_NAME = 'Test Results';

async function resetLatestRunFlag() {
  try {
    // Load credentials
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
    
    // Authenticate with Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // First, get all existing data to find how many rows have data
    const getResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:M`,
    });

    const rows = getResponse.data.values;
    if (!rows || rows.length <= 1) {
      console.log('No data rows to update (only header row exists)');
      return;
    }

    // Prepare update: Set all Latest Run values (column M) to 0
    // Starting from row 2 (after header)
    const numDataRows = rows.length - 1;
    const updates = [];
    
    for (let i = 0; i < numDataRows; i++) {
      updates.push([0]); // Set to 0
    }

    // Update column M (Latest Run) for all data rows
    const updateResponse = await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!M2:M${rows.length}`,
      valueInputOption: 'RAW',
      resource: {
        values: updates
      },
    });

    console.log('✅ Successfully reset all "Latest Run" flags to 0');
    console.log(`Updated ${numDataRows} rows`);

  } catch (error) {
    console.error('❌ Error resetting Latest Run flags:', error.message);
    throw error;
  }
}

// Run the function
resetLatestRunFlag();
