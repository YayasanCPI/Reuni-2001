const fs = require('fs');
let content = fs.readFileSync('components/AudioPlayer.tsx', 'utf-8');
content = content.replace(/Pause className="w-6 h-6/g, 'Pause className="w-4 h-4');
content = content.replace(/Play className="w-6 h-6/g, 'Play className="w-4 h-4');
fs.writeFileSync('components/AudioPlayer.tsx', content);
