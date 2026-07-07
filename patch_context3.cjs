const fs = require('fs');
let content = fs.readFileSync('contexts/ContentContext.tsx', 'utf-8');

content = content.replace(
  'introVideoUrl: "https://drive.google.com/uc?export=download&id=1WRkl1-stUHNsxdb7Pqwrkg4N6gwpudoZ"',
  'introVideoUrl: "https://www.image2url.com/r2/default/videos/1783431340717-7a9d71cd-bd4e-4e3c-bd1e-28603f7af861.mp4"'
);

fs.writeFileSync('contexts/ContentContext.tsx', content);
