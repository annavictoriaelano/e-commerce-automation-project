const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Credentials file path
const CREDENTIALS_PATH = 'D:\\Project Credentials\\e-commerce-automation-project-d45821641781.json';

// Your Google Sheet ID
const SPREADSHEET_ID = '1l3-RczqZHXSKHfZpiDKxRFKxIrd-i4scV3rUL_MBk5E';

// Sheet name (the tab in your spreadsheet)
const SHEET_NAME = 'Test Results';

async function appendToSheet(data) {
  try {
    // Load credentials
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
    
    // Authenticate with Google Sheets API
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Prepare the row data in the same order as your sheet columns
    const values = [[
      data.date,
      data.time,
      data.browser,
      data.totalTests,
      data.passed,
      data.failed,
      data.skipped,
      data.passRate,
      data.duration,
      data.module,
      data.testFile,
      data.notes,
      1 // Latest Run Flag
    ]];

    // Append the row to the sheet
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:M`,
      valueInputOption: 'USER_ENTERED',
      resource: { values },
    });

    console.log('✅ Successfully added row to Google Sheets');
    console.log(`Updated range: ${response.data.updates.updatedRange}`);
    return response;

  } catch (error) {
    console.error('❌ Error appending to Google Sheets:', error.message);
    throw error;
  }
}

// Main function to read test results and upload
async function main() {
  try {
    // Read test results JSON
    const resultsPath = path.join(__dirname, '..', 'test-results.json');
    const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

    // Extract stats
    const stats = results.stats;

    // Calculate metrics
    const totalTests = stats.expected + stats.unexpected;
    const passed = stats.expected;
    const failed = stats.unexpected;
    const skipped = stats.skipped;
    const passRate = parseFloat(((passed / totalTests) * 100).toFixed(2));
    const durationSeconds = Math.round(stats.duration / 1000);

    // Format timestamp
    const startTime = new Date(stats.startTime);
    const date = startTime.toISOString().split('T')[0];
    const time = startTime.toTimeString().split(' ')[0];

    // Prepare data
    const data = {
      date,
      time,
      browser: 'All Browsers',
      totalTests,
      passed,
      failed,
      skipped,
      passRate,
      duration: durationSeconds,
      module: 'All Modules',
      testFile: 'All Tests',
      notes: `${failed} failures${skipped > 0 ? ', ' + skipped + ' skipped' : ''}`
    };

    console.log('Test Results to upload:', data);
    
    // Upload to Google Sheets
    await appendToSheet(data);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
