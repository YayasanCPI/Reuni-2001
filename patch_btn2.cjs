const fs = require('fs');
let content = fs.readFileSync('components/AudioPlayer.tsx', 'utf-8');

const search = `<button
              onClick={handleStartExperience}
              className="px-6 py-2.5 bg-navy-900/40 text-paper-200 backdrop-blur-md border border-paper-200/50 rounded-full font-serif font-semibold text-sm uppercase tracking-widest hover:bg-navy-900/60 transition-all shadow-lg"
            >
              Mulai Pengalaman
            </button>`;

const replace = `<button
              onClick={handleStartExperience}
              className="px-5 py-2 bg-navy-900/40 text-paper-200 backdrop-blur-md border border-paper-200/50 rounded-2xl font-serif font-medium text-xs md:text-sm uppercase tracking-widest hover:bg-navy-900/60 transition-all shadow-lg flex flex-col items-center mx-auto"
            >
              <span>Mulai</span>
              <span>Pengalaman</span>
            </button>`;

content = content.replace(search, replace);

fs.writeFileSync('components/AudioPlayer.tsx', content);
