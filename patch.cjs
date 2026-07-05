const fs = require('fs');
let content = fs.readFileSync('Admin.tsx.bak', 'utf-8');
const lines = content.split('\n');

const replacement = `                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold font-serif mb-1">Keuntungan (Pisahkan dengan Koma)</label>
                    <input type="text" value={item.benefits.join(", ")} onChange={e => {
                      const newItems = [...(formData.sponsorshipPackages || [])];
                      newItems[idx].benefits = e.target.value.split(",").map(s => s.trim());
                      setFormData({...formData, sponsorshipPackages: newItems});
                    }} className="w-full px-3 py-2 bg-white border border-navy-900" />
                  </div>`;

lines.splice(461, 9, replacement);
fs.writeFileSync('Admin.tsx', lines.join('\n'));
