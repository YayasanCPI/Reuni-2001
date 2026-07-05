#!/bin/bash
cat Admin.tsx | sed '/{.. Gallery ..}/i \
        {/* Budget */}\
        <section className="bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative">\
          <h2 className="text-2xl font-marker mb-6">Anggaran (Budget)</h2>\
          <div className="space-y-4">\
            {formData.budgetItems?.map((item, idx) => (\
              <div key={idx} className="bg-paper-100 p-4 border border-navy-900 relative pr-10">\
                <button onClick={() => {\
                  setFormData({...formData, budgetItems: formData.budgetItems?.filter((_, i) => i !== idx)});\
                }} className="absolute top-2 right-2 text-red-500 hover:text-red-700">\
                  <Trash2 className="w-5 h-5" />\
                </button>\
                <div className="grid md:grid-cols-2 gap-4">\
                  <div>\
                    <label className="block text-xs font-bold font-serif mb-1">Kategori</label>\
                    <input type="text" value={item.category} onChange={e => {\
                      const newItems = [...(formData.budgetItems || [])];\
                      newItems[idx].category = e.target.value;\
                      setFormData({...formData, budgetItems: newItems});\
                    }} className="w-full px-3 py-2 bg-white border border-navy-900" />\
                  </div>\
                  <div>\
                    <label className="block text-xs font-bold font-serif mb-1">Jumlah</label>\
                    <input type="text" value={item.amount} onChange={e => {\
                      const newItems = [...(formData.budgetItems || [])];\
                      newItems[idx].amount = e.target.value;\
                      setFormData({...formData, budgetItems: newItems});\
                    }} className="w-full px-3 py-2 bg-white border border-navy-900" />\
                  </div>\
                  <div className="md:col-span-2">\
                    <label className="block text-xs font-bold font-serif mb-1">Keterangan Tambahan</label>\
                    <input type="text" value={item.details} onChange={e => {\
                      const newItems = [...(formData.budgetItems || [])];\
                      newItems[idx].details = e.target.value;\
                      setFormData({...formData, budgetItems: newItems});\
                    }} className="w-full px-3 py-2 bg-white border border-navy-900" />\
                  </div>\
                </div>\
              </div>\
            ))}\
            <button onClick={() => {\
              setFormData({...formData, budgetItems: [...(formData.budgetItems || []), { category: "", amount: "", details: "" }]});\
            }} className="flex items-center gap-2 text-navy-700 font-bold font-serif hover:text-navy-900">\
              <Plus className="w-4 h-4" /> Tambah Anggaran\
            </button>\
          </div>\
        </section>\
\
        {/* Timeline */}\
        <section className="bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative">\
          <h2 className="text-2xl font-marker mb-6">Linimasa (Timeline)</h2>\
          <div className="space-y-4">\
            {formData.timelineItems?.map((item, idx) => (\
              <div key={idx} className="bg-paper-100 p-4 border border-navy-900 relative pr-10">\
                <button onClick={() => {\
                  setFormData({...formData, timelineItems: formData.timelineItems?.filter((_, i) => i !== idx)});\
                }} className="absolute top-2 right-2 text-red-500 hover:text-red-700">\
                  <Trash2 className="w-5 h-5" />\
                </button>\
                <div className="grid md:grid-cols-2 gap-4">\
                  <div>\
                    <label className="block text-xs font-bold font-serif mb-1">Fase / Tahap</label>\
                    <input type="text" value={item.phase} onChange={e => {\
                      const newItems = [...(formData.timelineItems || [])];\
                      newItems[idx].phase = e.target.value;\
                      setFormData({...formData, timelineItems: newItems});\
                    }} className="w-full px-3 py-2 bg-white border border-navy-900" />\
                  </div>\
                  <div>\
                    <label className="block text-xs font-bold font-serif mb-1">Waktu</label>\
                    <input type="text" value={item.time} onChange={e => {\
                      const newItems = [...(formData.timelineItems || [])];\
                      newItems[idx].time = e.target.value;\
                      setFormData({...formData, timelineItems: newItems});\
                    }} className="w-full px-3 py-2 bg-white border border-navy-900" />\
                  </div>\
                  <div className="md:col-span-2">\
                    <label className="block text-xs font-bold font-serif mb-1">Target / Output</label>\
                    <input type="text" value={item.target} onChange={e => {\
                      const newItems = [...(formData.timelineItems || [])];\
                      newItems[idx].target = e.target.value;\
                      setFormData({...formData, timelineItems: newItems});\
                    }} className="w-full px-3 py-2 bg-white border border-navy-900" />\
                  </div>\
                </div>\
              </div>\
            ))}\
            <button onClick={() => {\
              setFormData({...formData, timelineItems: [...(formData.timelineItems || []), { phase: "", time: "", target: "" }]});\
            }} className="flex items-center gap-2 text-navy-700 font-bold font-serif hover:text-navy-900">\
              <Plus className="w-4 h-4" /> Tambah Timeline\
            </button>\
          </div>\
        </section>\
\
        {/* Sponsorship */}\
        <section className="bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative">\
          <h2 className="text-2xl font-marker mb-6">Sponsorship</h2>\
          <div className="space-y-4">\
            {formData.sponsorshipPackages?.map((item, idx) => (\
              <div key={idx} className="bg-paper-100 p-4 border border-navy-900 relative pr-10">\
                <button onClick={() => {\
                  setFormData({...formData, sponsorshipPackages: formData.sponsorshipPackages?.filter((_, i) => i !== idx)});\
                }} className="absolute top-2 right-2 text-red-500 hover:text-red-700">\
                  <Trash2 className="w-5 h-5" />\
                </button>\
                <div className="grid md:grid-cols-2 gap-4">\
                  <div>\
                    <label className="block text-xs font-bold font-serif mb-1">Nama Paket</label>\
                    <input type="text" value={item.title} onChange={e => {\
                      const newItems = [...(formData.sponsorshipPackages || [])];\
                      newItems[idx].title = e.target.value;\
                      setFormData({...formData, sponsorshipPackages: newItems});\
                    }} className="w-full px-3 py-2 bg-white border border-navy-900" />\
                  </div>\
                  <div>\
                    <label className="block text-xs font-bold font-serif mb-1">Harga / Nilai</label>\
                    <input type="text" value={item.price} onChange={e => {\
                      const newItems = [...(formData.sponsorshipPackages || [])];\
                      newItems[idx].price = e.target.value;\
                      setFormData({...formData, sponsorshipPackages: newItems});\
                    }} className="w-full px-3 py-2 bg-white border border-navy-900" />\
                  </div>\
                  <div className="md:col-span-2">\
                    <label className="block text-xs font-bold font-serif mb-1">Keuntungan (Pisahkan dengan Koma)</label>\
                    <textarea value={item.benefits.join(", ")} onChange={e => {\
                      const newItems = [...(formData.sponsorshipPackages || [])];\
                      newItems[idx].benefits = e.target.value.split(",").map(s => s.trim());\
                      setFormData({...formData, sponsorshipPackages: newItems});\
                    }} rows={3} className="w-full px-3 py-2 bg-white border border-navy-900" />\
                  </div>\
                </div>\
              </div>\
            ))}\
            <button onClick={() => {\
              setFormData({...formData, sponsorshipPackages: [...(formData.sponsorshipPackages || []), { title: "", price: "", benefits: [], color: "bg-slate-400 text-navy-900", borderColor: "border-slate-400" }]});\
            }} className="flex items-center gap-2 text-navy-700 font-bold font-serif hover:text-navy-900">\
              <Plus className="w-4 h-4" /> Tambah Paket Sponsorship\
            </button>\
          </div>\
        </section>\
' > temp.tsx && mv temp.tsx Admin.tsx
