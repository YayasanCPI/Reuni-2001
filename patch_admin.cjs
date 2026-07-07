const fs = require('fs');
let content = fs.readFileSync('Admin.tsx', 'utf-8');

if (!content.includes('formData.introVideoUrl')) {
  // Find backgroundMusicUrl input and add introVideoUrl input after it
  const searchStr = '<input type="text" value={formData.backgroundMusicUrl || \'\'} onChange={e => setFormData({...formData, backgroundMusicUrl: e.target.value})} className="w-full px-3 py-2 bg-paper-100 border border-navy-900" placeholder="https://youtu.be/..." />';
  
  const replaceStr = searchStr + '\n              </div>\n              <div>\n                <label className="block text-xs font-bold font-serif mb-1">URL Video Intro Depan (kosongkan jika tidak ada)</label>\n                <input type="text" value={formData.introVideoUrl || \'\'} onChange={e => setFormData({...formData, introVideoUrl: e.target.value})} className="w-full px-3 py-2 bg-paper-100 border border-navy-900" placeholder="https://..." />';
  
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync('Admin.tsx', content);
}
