const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');

function readData() {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

function writeData(data) {
  const json = JSON.stringify(data);
  fs.writeFileSync(DATA_FILE, json);
}

module.exports = {
  readData,
  writeData,
}
