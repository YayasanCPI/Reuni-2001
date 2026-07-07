const fs = require('fs');
let content = fs.readFileSync('components/AudioPlayer.tsx', 'utf-8');

const search = `<button
              onClick={handleStartExperience}
              className="px-10 py-5 bg-paper-200 text-navy-900 font-serif font-bold text-xl uppercase tracking-widest border-2 border-navy-900 shadow-[8px_8px_0px_#1e293b] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#1e293b] transition-all"
            >
              Mulai Pengalaman
            </button>`;

const replace = `<button
              onClick={handleStartExperience}
              className="px-6 py-2.5 bg-navy-900/40 text-paper-200 backdrop-blur-md border border-paper-200/50 rounded-full font-serif font-semibold text-sm uppercase tracking-widest hover:bg-navy-900/60 transition-all shadow-lg"
            >
              Mulai Pengalaman
            </button>`;

content = content.replace(search, replace);

fs.writeFileSync('components/AudioPlayer.tsx', content);
