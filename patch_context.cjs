const fs = require('fs');
let content = fs.readFileSync('contexts/ContentContext.tsx', 'utf-8');

if (!content.includes('introVideoUrl: "https://www.w3schools.com/html/mov_bbb.mp4"')) {
  content = content.replace(
    'backgroundMusicUrl: "https://youtu.be/Ch3l_Q9PxpQ",',
    'backgroundMusicUrl: "https://youtu.be/Ch3l_Q9PxpQ",\n  introVideoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",'
  );
  fs.writeFileSync('contexts/ContentContext.tsx', content);
}
