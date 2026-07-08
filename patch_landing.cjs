const fs = require('fs');
let content = fs.readFileSync('LandingPage.tsx', 'utf-8');

const importSearch = `import BackgroundDecorations from './components/BackgroundDecorations';`;
const importReplace = `import BackgroundDecorations from './components/BackgroundDecorations';\nimport FloatingWhatsApp from './components/FloatingWhatsApp';`;

const componentSearch = `      <Footer />
    </div>`;
const componentReplace = `      <Footer />\n      <FloatingWhatsApp />\n    </div>`;

if (content.includes(importSearch) && content.includes(componentSearch)) {
  content = content.replace(importSearch, importReplace);
  content = content.replace(componentSearch, componentReplace);
  fs.writeFileSync('LandingPage.tsx', content);
} else {
  console.log("Failed to patch LandingPage.tsx");
}
