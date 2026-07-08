const fs = require('fs');
let content = fs.readFileSync('Admin.tsx', 'utf-8');

const search = `        {/* Sponsorship */}
        <section className="bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative">
          <h2 className="text-2xl font-marker mb-6">Sponsorship</h2>
          <div className="space-y-4">`;

const replace = `        {/* Sponsorship */}
        <section className="bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative">
          <h2 className="text-2xl font-marker mb-6">Sponsorship</h2>
          <div className="mb-6">
            <label className="block text-sm font-bold text-navy-800 font-serif mb-1">URL Proposal Sponsorship (PDF/Link)</label>
            <input type="text" value={formData.sponsorshipProposalUrl || ''} onChange={e => setFormData({...formData, sponsorshipProposalUrl: e.target.value})} className="w-full px-3 py-2 bg-paper-100 border border-navy-900" placeholder="https://..." />
            <p className="text-xs text-navy-600 mt-1">Kosongkan jika tidak ada file proposal.</p>
          </div>
          <div className="space-y-4">`;

if (content.includes(search)) {
  content = content.replace(search, replace);
  fs.writeFileSync('Admin.tsx', content);
}
