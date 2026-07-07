const fs = require('fs');

// 1. Update ContentContext.tsx
let context = fs.readFileSync('contexts/ContentContext.tsx', 'utf-8');
if (!context.includes('introVideoUrlMobile')) {
  context = context.replace(
    'gallery: { src: string; caption: string; rot: string }[];\n  backgroundMusicUrl: string;',
    'gallery: { src: string; caption: string; rot: string }[];\n  backgroundMusicUrl: string;\n  introVideoUrl?: string;\n  introVideoUrlMobile?: string;'
  );
  context = context.replace(
    'introVideoUrl: "https://www.image2url.com/r2/default/videos/1783431340717-7a9d71cd-bd4e-4e3c-bd1e-28603f7af861.mp4",',
    'introVideoUrl: "https://www.image2url.com/r2/default/videos/1783431340717-7a9d71cd-bd4e-4e3c-bd1e-28603f7af861.mp4",\n  introVideoUrlMobile: "",'
  );
  fs.writeFileSync('contexts/ContentContext.tsx', context);
}

// 2. Update Admin.tsx
let admin = fs.readFileSync('Admin.tsx', 'utf-8');
if (!admin.includes('introVideoUrlMobile')) {
  const searchStr = '<input type="text" value={formData.introVideoUrl || \'\'} onChange={e => setFormData({...formData, introVideoUrl: e.target.value})} className="w-full px-3 py-2 bg-paper-100 border border-navy-900" placeholder="https://..." />\n            </div>';
  
  const replaceStr = searchStr + '\n              <div>\n                <label className="block text-xs font-bold font-serif mb-1">URL Video Intro Depan Mobile (Rasio 9:16)</label>\n                <input type="text" value={formData.introVideoUrlMobile || \'\'} onChange={e => setFormData({...formData, introVideoUrlMobile: e.target.value})} className="w-full px-3 py-2 bg-paper-100 border border-navy-900" placeholder="https://..." />\n              </div>';
  
  admin = admin.replace(searchStr, replaceStr);
  fs.writeFileSync('Admin.tsx', admin);
}

// 3. Update AudioPlayer.tsx
let audio = fs.readFileSync('components/AudioPlayer.tsx', 'utf-8');
if (!audio.includes('data.introVideoUrlMobile')) {
  const oldOverlay = `{data?.introVideoUrl && (
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none"
            >
              <source src={data.introVideoUrl} type="video/mp4" />
            </video>
          )}`;

  const newOverlay = `{data?.introVideoUrl && (
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className={\`absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none \${data?.introVideoUrlMobile ? 'hidden md:block' : ''}\`}
            >
              <source src={data.introVideoUrl} type="video/mp4" />
            </video>
          )}
          {data?.introVideoUrlMobile && (
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-50 pointer-events-none md:hidden"
            >
              <source src={data.introVideoUrlMobile} type="video/mp4" />
            </video>
          )}`;
          
  audio = audio.replace(oldOverlay, newOverlay);
  fs.writeFileSync('components/AudioPlayer.tsx', audio);
}
