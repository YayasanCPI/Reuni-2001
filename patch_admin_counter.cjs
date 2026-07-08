const fs = require('fs');
let content = fs.readFileSync('Admin.tsx', 'utf-8');

const search = `            <label className="block text-sm font-bold text-navy-800 font-serif mb-1">URL Google Sheet Web App (Untuk Form RSVP)</label>`;
const replace = `            <label className="block text-sm font-bold text-navy-800 font-serif mb-1">Base Attendee Count (Jumlah Awal Peserta)</label>
            <input type="number" value={formData.baseAttendeeCount || 0} onChange={e => setFormData({...formData, baseAttendeeCount: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 bg-paper-100 border border-navy-900 mb-4" />
            <label className="block text-sm font-bold text-navy-800 font-serif mb-1">URL Google Sheet Web App (Untuk Form RSVP)</label>`;

if (content.includes(search)) {
  content = content.replace(search, replace);
  fs.writeFileSync('Admin.tsx', content);
  console.log("Patched Admin.tsx for counter");
} else {
  console.log("Could not patch Admin.tsx");
}
