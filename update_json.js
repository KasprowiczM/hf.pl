const fs = require('fs');

function updateJson(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);
  if (filePath.includes('pl.json')) {
    data.footer_desc = "Polska Domena Premium na Sprzedaż.";
    data.footer_rights = "Wszelkie prawa zastrzeżone.";
  } else {
    data.footer_desc = "Premium Polish Domain for Sale.";
    data.footer_rights = "All rights reserved.";
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

updateJson('/Users/mk/Dev_Env/hf-pl/src/locales/pl.json');
updateJson('/Users/mk/Dev_Env/hf-pl/src/locales/en.json');
console.log('JSON updated successfully');
