import React, { useState } from 'react';
export default function Test() {
  const [formData, setFormData] = useState<any>({ sponsorshipPackages: [{ benefits: [] }] });
  const item = formData.sponsorshipPackages[0];
  const idx = 0;
  return (
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold font-serif mb-1">Keuntungan (Pisahkan dengan Koma)</label>
                    <textarea value={item.benefits.join(", ")} onChange={e => {
                      const newItems = [...(formData.sponsorshipPackages || [])];
                      newItems[idx].benefits = e.target.value.split(",").map(s => s.trim());
                      setFormData({...formData, sponsorshipPackages: newItems});
                    }} rows={3} className="w-full px-3 py-2 bg-white border border-navy-900" > </textarea>
                  </div>
  );
}
