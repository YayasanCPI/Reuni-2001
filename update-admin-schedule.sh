#!/bin/bash
cat Admin.tsx | sed '/{.. Schedule ..}/i \
        {/* Detailed Schedule (Advanced) */}\
        <section className="bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative">\
          <h2 className="text-2xl font-marker mb-6">Detail Jadwal Acara (Pagi, Sore, Minggu)</h2>\
          <div className="space-y-4">\
            <div className="bg-paper-100 p-4 border border-navy-900 relative">\
                <p className="text-xs font-serif text-navy-700 mb-2">Edit format JSON di bawah untuk mengubah jadwal Pagi, Sore, dan Minggu. Harap pastikan format JSON valid.</p>\
                <textarea \
                    value={JSON.stringify(formData.detailedSchedule, null, 2)} \
                    onChange={e => {\
                        try {\
                            const parsed = JSON.parse(e.target.value);\
                            setFormData({...formData, detailedSchedule: parsed});\
                        } catch (err) {\
                            // Ignore invalid JSON while typing\
                        }\
                    }} \
                    rows={15} \
                    className="w-full px-3 py-2 bg-white border border-navy-900 font-mono text-sm" \
                />\
            </div>\
          </div>\
        </section>\
' > temp.tsx && mv temp.tsx Admin.tsx
