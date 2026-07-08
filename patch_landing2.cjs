const fs = require('fs');
let content = fs.readFileSync('LandingPage.tsx', 'utf-8');

const importSearch = `import RSVP from './components/RSVP';`;
const importReplace = `import RSVP from './components/RSVP';\nimport AttendeeCounter from './components/AttendeeCounter';`;

const componentSearch = `        <Gallery />
        <RSVP />
      </main>`;
const componentReplace = `        <Gallery />\n        <AttendeeCounter />\n        <RSVP />\n      </main>`;

if (content.includes(importSearch) && content.includes(componentSearch)) {
  content = content.replace(importSearch, importReplace);
  content = content.replace(componentSearch, componentReplace);
  fs.writeFileSync('LandingPage.tsx', content);
  console.log("Patched LandingPage.tsx");
} else {
  console.log("Could not patch LandingPage.tsx");
}
