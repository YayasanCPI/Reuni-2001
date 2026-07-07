const fs = require('fs');
let content = fs.readFileSync('types.ts', 'utf-8');

if (!content.includes('introVideoUrl')) {
  content = content.replace(
    'backgroundMusicUrl: string;',
    'backgroundMusicUrl: string;\n  introVideoUrl?: string;'
  );
  fs.writeFileSync('types.ts', content);
}
