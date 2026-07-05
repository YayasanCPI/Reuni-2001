const fs = require('fs');
let content = fs.readFileSync('components/AudioPlayer.tsx', 'utf-8');
content = content.replace(/VolumeX className="w-3 h-3"/g, 'VolumeX className="w-4 h-4"');
content = content.replace(/Volume2 className="w-3 h-3"/g, 'Volume2 className="w-4 h-4"');
fs.writeFileSync('components/AudioPlayer.tsx', content);
