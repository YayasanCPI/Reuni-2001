const fs = require('fs');
let content = fs.readFileSync('Admin.tsx', 'utf-8');

const search = `            <div>
              <label className="block text-sm font-bold text-navy-800 font-serif mb-1">Google Apps Script Web App URL (Untuk RSVP)</label>`;

const replace = `            <div>
              <label className="block text-sm font-bold text-navy-800 font-serif mb-1">Base Attendee Count (Jumlah Peserta Awal Tambahan di Counter)</label>
              <input type="number" value={formData.baseAttendeeCount || 0} onChange={e => setFormData({...formData, baseAttendeeCount: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 bg-paper-100 border border-navy-900 mb-4" />
              <label className="block text-sm font-bold text-navy-800 font-serif mb-1">Google Apps Script Web App URL (Untuk RSVP)</label>`;

if (content.includes(search)) {
  content = content.replace(search, replace);
  fs.writeFileSync('Admin.tsx', content);
  console.log("Patched Admin.tsx");
} else {
  console.log("Could not patch Admin.tsx");
}
