const fs = require('fs');
const path = require('path');

// Read the test results JSON file
const resultsPath = path.join(__dirname, '..', 'test-results.json');
const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

// Extract stats (this is the reliable part)
const stats = results.stats;

// Calculate metrics
const totalTests = stats.expected + stats.unexpected;
const passed = stats.expected;
const failed = stats.unexpected;
const skipped = stats.skipped;
const passRate = ((passed / totalTests) * 100).toFixed(2);
const durationSeconds = Math.round(stats.duration / 1000);

// Format timestamp
const startTime = new Date(stats.startTime);
const date = startTime.toISOString().split('T')[0]; // YYYY-MM-DD
const time = startTime.toTimeString().split(' ')[0]; // HH:MM:SS

// Output results in the format needed for Google Sheets
const output = {
  date,
  time,
  browser: 'All Browsers',
  totalTests,
  passed,
  failed,
  skipped,
  passRate: parseFloat(passRate),
  duration: durationSeconds,
  module: 'All Modules',
  testFile: 'All Tests',
  notes: `${failed} failures${skipped > 0 ? ', ' + skipped + ' skipped' : ''}`
};

// Output as JSON
console.log(JSON.stringify(output, null, 2));
