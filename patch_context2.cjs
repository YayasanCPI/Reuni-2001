const fs = require('fs');
let content = fs.readFileSync('contexts/ContentContext.tsx', 'utf-8');

content = content.replace(
  'introVideoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"',
  'introVideoUrl: "https://drive.google.com/uc?export=download&id=1WRkl1-stUHNsxdb7Pqwrkg4N6gwpudoZ"'
);

fs.writeFileSync('contexts/ContentContext.tsx', content);
