const fs = require('fs');
let content = fs.readFileSync('components/AudioPlayer.tsx', 'utf-8');

// Increase padding on the cassette body to make the sticker smaller/more inward
content = content.replace(
  'className={`relative w-16 h-10 rounded-sm bg-navy-800 border-2 border-navy-900 flex items-center justify-center p-1.5',
  'className={`relative w-16 h-11 rounded bg-navy-800 border-2 border-navy-900 flex items-center justify-center p-2'
);

// Inner tape sticker
content = content.replace(
  '<div className="w-full h-full bg-paper-200 rounded flex flex-col items-center justify-center px-1">',
  '<div className="w-full h-full bg-white rounded-sm flex flex-col items-center justify-center px-1 py-0.5">'
);

// Reel positioning: make them smaller and closer
content = content.replace(/w-3 h-3 bg-navy-900/g, 'w-2.5 h-2.5 bg-navy-900');
content = content.replace(/w-1 h-1 bg-paper-200/g, 'w-[3px] h-[3px] bg-white');

// Middle window
content = content.replace(
  '<div className="w-4 h-2 bg-navy-800 rounded-sm flex items-center justify-center overflow-hidden border border-navy-900">',
  '<div className="w-4 h-1.5 bg-navy-800 rounded-sm flex items-center justify-center overflow-hidden border border-navy-900">'
);
content = content.replace('<div className="w-full h-1 bg-navy-900/80"></div>', '<div className="w-full h-[2px] bg-navy-900/80"></div>');

// Remove absolute lines on the reels since they might overlap and look messy at tiny sizes. 
// Let's replace the whole reel div with a simpler one:
content = content.replace(/<div className="absolute w-1 h-1 bg-paper-200 top-\[0\.5px\] left-\[5px\]"><\/div>/g, '');
content = content.replace(/<div className="absolute w-1 h-1 bg-paper-200 bottom-\[0\.5px\] left-\[5px\]"><\/div>/g, '');
content = content.replace(/<div className="absolute w-1 h-1 bg-paper-200 left-\[0\.5px\] top-\[5px\]"><\/div>/g, '');
content = content.replace(/<div className="absolute w-1 h-1 bg-paper-200 right-\[0\.5px\] top-\[5px\]"><\/div>/g, '');

// Cassette label lines:
content = content.replace(
  '<div className="w-full mt-1 space-y-[2px] px-1">',
  '<div className="w-full mt-0.5 space-y-[2px] px-0.5">'
);

// Bottom trapezium
content = content.replace(
  '<div className="absolute -bottom-1 w-10 h-2 bg-navy-800 rounded-t border-t border-navy-900',
  '<div className="absolute -bottom-1 w-12 h-2 bg-navy-800 rounded-t border-t border-navy-900'
);

fs.writeFileSync('components/AudioPlayer.tsx', content);
