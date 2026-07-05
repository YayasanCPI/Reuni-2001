const fs = require('fs');
let content = fs.readFileSync('components/AudioPlayer.tsx', 'utf-8');

// Change position to center and transparent
content = content.replace('fixed bottom-6 right-6 z-50 group', 'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 group');

// Change opacity/transparent on the container
content = content.replace('bg-paper-100 border-2 border-navy-900 rounded-full p-2 flex items-center gap-2 shadow-[4px_4px_0px_#1e293b]', 'bg-paper-100/70 backdrop-blur-md border border-navy-900/50 rounded-full p-1.5 flex items-center gap-1.5 shadow-[2px_2px_0px_rgba(30,41,59,0.5)]');

// Make the button smaller by changing dimensions
// From w-24 h-16 to w-16 h-10
content = content.replace('relative w-24 h-16 rounded-md bg-navy-800', 'relative w-16 h-10 rounded-sm bg-navy-800');

// Reel sizes: w-5 h-5 to w-3 h-3
content = content.replace(/w-5 h-5/g, 'w-3 h-3');

// Left/right reel lines
content = content.replace(/w-1\.5 h-1\.5/g, 'w-1 h-1');
content = content.replace(/top-\[1px\] left-\[8px\]/g, 'top-[0.5px] left-[5px]');
content = content.replace(/bottom-\[1px\] left-\[8px\]/g, 'bottom-[0.5px] left-[5px]');
content = content.replace(/left-\[1px\] top-\[8px\]/g, 'left-[0.5px] top-[5px]');
content = content.replace(/right-\[1px\] top-\[8px\]/g, 'right-[0.5px] top-[5px]');

// Middle window: w-6 h-3 to w-4 h-2
content = content.replace('w-6 h-3 bg-navy-800', 'w-4 h-2 bg-navy-800');

// Bottom trapezium shape: w-14 h-3 to w-10 h-2
content = content.replace('w-14 h-3 bg-navy-800', 'w-10 h-2 bg-navy-800');

// Cassette label lines margin: mt-2 to mt-1
content = content.replace('w-full mt-2 space-y-1', 'w-full mt-1 space-y-[2px]');

// Volume icon: w-5 h-5 to w-4 h-4
content = content.replace(/VolumeX className="w-5 h-5"/g, 'VolumeX className="w-4 h-4"');
content = content.replace(/Volume2 className="w-5 h-5"/g, 'Volume2 className="w-4 h-4"');

fs.writeFileSync('components/AudioPlayer.tsx', content);
