const fs = require('fs');
let content = fs.readFileSync('components/AudioPlayer.tsx', 'utf-8');

// Update the overlay logic
const originalOverlay = `{!hasInteracted && !error && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900/90 backdrop-blur-sm transition-opacity duration-500">
          <div className="text-center p-8">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-paper-200 mb-6 drop-shadow-md">
              Siap Bernostalgia?
            </h2>
            <p className="text-paper-400 font-serif mb-8 max-w-md mx-auto text-lg">
              Klik tombol di bawah untuk memulai pengalaman dengan iringan musik.
            </p>
            <button
              onClick={handleStartExperience}
              className="px-10 py-5 bg-paper-200 text-navy-900 font-serif font-bold text-xl uppercase tracking-widest border-2 border-navy-900 shadow-[8px_8px_0px_#1e293b] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#1e293b] transition-all"
            >
              Mulai Pengalaman
            </button>
          </div>
        </div>
      )}`;

const newOverlay = `{!hasInteracted && !error && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-900/90 backdrop-blur-sm transition-opacity duration-500 overflow-hidden">
          {data?.introVideoUrl && (
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
            >
              <source src={data.introVideoUrl} type="video/mp4" />
            </video>
          )}
          <div className="text-center p-8 relative z-10">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-paper-200 mb-6 drop-shadow-md">
              Siap Bernostalgia?
            </h2>
            <p className="text-paper-400 font-serif mb-8 max-w-md mx-auto text-lg">
              Klik tombol di bawah untuk memulai pengalaman dengan iringan musik.
            </p>
            <button
              onClick={handleStartExperience}
              className="px-10 py-5 bg-paper-200 text-navy-900 font-serif font-bold text-xl uppercase tracking-widest border-2 border-navy-900 shadow-[8px_8px_0px_#1e293b] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#1e293b] transition-all"
            >
              Mulai Pengalaman
            </button>
          </div>
        </div>
      )}`;

content = content.replace(originalOverlay, newOverlay);

fs.writeFileSync('components/AudioPlayer.tsx', content);
