const fs = require('fs');

function updateJson(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(content);
  if (filePath.includes('pl.json')) {
    data.seo_title = "hf.pl - Dwuliterowa Polska Domena Premium na Sprzedaż";
    data.seo_desc = "Kup ultra-rzadką, dwuliterową domenę hf.pl. Zaledwie 676 takich kombinacji w polskim internecie. Idealna na markę funduszu, technologii lub mody.";
    data.seo_keywords = "domena hf.pl, hf.pl wymiana, domeny premium, domeny 2-literowe, inwestycje w domeny";
    data.footer_btn = "Złóż Ofertę";
  } else {
    data.seo_title = "hf.pl - Premium Two-Letter Polish Domain for Sale";
    data.seo_desc = "Acquire the ultra-rare, two-character domain hf.pl. Only 676 such combinations exist in Poland. Perfect for finance, tech, or fashion brands.";
    data.seo_keywords = "hf.pl domain, premium domains, 2-letter domains, domain investment, brandable domains";
    data.footer_btn = "Submit Offer";
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

updateJson('/Users/mk/Dev_Env/hf-pl/src/locales/pl.json');
updateJson('/Users/mk/Dev_Env/hf-pl/src/locales/en.json');
console.log('JSON updated successfully');
