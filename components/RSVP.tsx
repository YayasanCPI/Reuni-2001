import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Download } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

const RSVP = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data } = useContent();

  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    city: '',
    jobStatus: '',
    jobTitle: '',
    companyName: '',
    class: '',
    attendance: '',
    attendedEvents: {
      pagi: false,
      sore: false,
      minggu: false
    },
    photo: ''
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data?.googleSheetWebAppUrl) {
      // Simulate submission if no URL is configured
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1000);
      return;
    }

    setIsSubmitting(true);
    try {
      // Save to Firebase first
      try {
        await addDoc(collection(db, 'attendees'), {
          ...formData,
          createdAt: serverTimestamp(),
          status: 'confirmed'
        });
      } catch (fbErr) {
        console.error("Firebase save error", fbErr);
      }

      // We use no-cors because Apps Script might not return proper CORS headers for JSON
      await fetch(data.googleSheetWebAppUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // no-cors means we can't read the response, but if it didn't throw it's likely fine.
      setIsSubmitted(true);
    } catch (err) {
      console.error("Failed to submit RSVP", err);
      alert("Gagal mengirim RSVP. Pastikan URL Google Apps Script valid.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-24 bg-paper-500 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-marker text-navy-900 mb-6 transform -rotate-2">Kehadiranmu Sangat Berarti</h2>
            <p className="text-lg text-navy-800 mb-10 leading-relaxed font-serif">
              Bantu panitia mempersiapkan acara dengan lebih baik dengan mengkonfirmasi kehadiranmu. Kami tidak sabar untuk bertemu kembali!
            </p>
            
            <div className="space-y-6 font-serif">
              <div className="flex flex-col gap-2 border-l-2 border-dashed border-navy-700 pl-6 bg-paper-400 p-4 transform rotate-1">
                <div className="tape -top-2 -left-4 w-12 rotate-90"></div>
                <h4 className="font-bold text-navy-900 font-marker text-lg">Narahubung:</h4>
                {data?.contacts?.map((contact, idx) => (
                  <p key={idx} className="text-navy-800">{contact.name} ({contact.phone})</p>
                )) || (
                  <>
                    <p className="text-navy-800">Budi Santoso (0812-3456-7890)</p>
                    <p className="text-navy-800">Siti Aminah (0811-9876-5432)</p>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-2 border-l-2 border-dashed border-navy-700 pl-6 bg-paper-400 p-4 transform -rotate-1">
                <div className="tape -top-2 -left-4 w-12 rotate-90"></div>
                <h4 className="font-bold text-navy-900 font-marker text-lg">Rekening Panitia:</h4>
                {data?.bankAccounts?.map((bank, idx) => (
                  <p key={idx} className="text-navy-800">{bank.bank}: {bank.number} a.n. {bank.name}</p>
                )) || (
                  <>
                    <p className="text-navy-800">BCA: 1234567890 a.n. Reuni SMANSA</p>
                    <p className="text-navy-800">Mandiri: 0987654321 a.n. Reuni SMANSA</p>
                  </>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-paper-200 p-8 md:p-10 shadow-[4px_4px_0px_#142030] border-2 border-navy-900 relative transform rotate-1"
          >
            <div className="tape -top-4 left-1/2 -translate-x-1/2 w-24"></div>
            
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-4 text-center h-full">
                <div className="w-16 h-16 bg-navy-800 flex items-center justify-center mb-4 transform rotate-3">
                  <CheckCircle2 className="w-8 h-8 text-paper-200" />
                </div>
                <h3 className="text-2xl font-marker text-navy-900 mb-2 transform -rotate-2">Terima Kasih!</h3>
                <p className="text-navy-700 mb-8 font-serif text-sm">
                  Simpan (Screenshot) Nametag Digital Anda di bawah ini sebagai kenang-kenangan dan bukti kehadiran.
                </p>

                {/* Nametag Dummy */}
                <div className="flex flex-col md:flex-row gap-6 mb-8 w-full justify-center perspective-1000">
                  {/* Depan */}
                  <div className="w-full max-w-[240px] bg-gradient-to-b from-blue-700 to-blue-900 rounded-xl overflow-hidden shadow-xl border border-gray-300 relative mx-auto transform transition-transform hover:scale-105 hover:-rotate-2 cursor-pointer">
                    <div className="h-8 bg-gray-200 w-full flex justify-center items-center rounded-t-xl border-b border-gray-400">
                       <div className="w-16 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                    <div className="p-4 flex flex-col items-center">
                      <img src="https://i.ibb.co.com/wZrZzHDN/Logosmansa-1-removebg-preview.png" alt="Logo" className="w-12 h-12 mb-2 bg-white rounded-full p-1" />
                      <h4 className="text-white font-bold text-center leading-tight mb-4 text-sm font-serif">REUNI PERAK<br/>SMANSA 2001</h4>
                      
                      <div className="w-24 h-32 bg-gray-200 border-2 border-white rounded mb-2 overflow-hidden">
                        {formData.photo ? (
                          <img src={formData.photo} alt="Foto Profil" className="w-full h-full object-cover grayscale-[20%]" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">Poto Jadul</div>
                        )}
                      </div>
                      
                      <h2 className="text-3xl font-marker text-white uppercase tracking-wider mt-2 mb-1">{formData.nickname || formData.name.split(' ')[0] || 'NAMA'}</h2>
                      <div className="bg-white text-blue-900 px-4 py-1 rounded-full font-bold text-sm mb-4">
                        {formData.class || 'KELAS'}
                      </div>

                      <div className="w-full flex justify-between items-end mt-2 border-t border-blue-800 pt-2">
                         <div className="text-[8px] text-left text-blue-200 leading-tight">
                           Panitia<br/>Reuni Perak<br/>SMANSA 2001
                         </div>
                         <img src="https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=SMANSA2001" alt="QR" className="w-10 h-10 bg-white p-0.5 rounded" />
                      </div>
                    </div>
                  </div>

                  {/* Belakang */}
                  <div className="w-full max-w-[240px] bg-gradient-to-b from-gray-200 to-gray-300 rounded-xl overflow-hidden shadow-xl border border-gray-400 relative mx-auto transform transition-transform hover:scale-105 hover:rotate-2 cursor-pointer hidden md:block">
                     <div className="h-8 bg-blue-800 w-full flex justify-center items-center rounded-t-xl border-b border-blue-900">
                       <div className="w-16 h-2 bg-blue-900 rounded-full"></div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-center text-navy-900 mb-4 text-sm border-b-2 border-navy-900 pb-2">RUNDOWN<br/>ACARA SINGKAT</h4>
                      
                      <div className="space-y-3 text-xs text-navy-800 font-serif">
                        <div>
                          <strong className="block text-navy-900">HARI SABTU (Di SMANSA)</strong>
                          <span className="font-bold">08.00 - 11.30:</span><br/>
                          Sharing Session & Apresiasi Guru<br/>
                          <span className="font-bold">18.00 - 22.00:</span><br/>
                          Gala Dinner & Sesi Nostalgia
                        </div>
                        <div>
                          <strong className="block text-navy-900 mt-2">HARI MINGGU (Di SMANSA Lama)</strong>
                          <span className="font-bold">06.30 - Selesai:</span><br/>
                          Olahraga, Napak Tilas, & Katupek Gulai Cubadak.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-sm font-bold text-navy-600 hover:text-navy-900 transition-colors font-serif underline"
                >
                  Kirim tanggapan lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-3xl font-serif font-bold text-navy-900 mb-6 border-b-2 border-dashed border-navy-300 pb-4">Form RSVP</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-xs font-bold text-navy-800 font-serif">Nama Lengkap</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 bg-paper-100 border border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 transition-all font-marker text-navy-900 text-sm"
                      placeholder="Nama Lengkap"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="nickname" className="text-xs font-bold text-navy-800 font-serif">Nama Panggilan</label>
                    <input 
                      type="text" 
                      id="nickname" 
                      required
                      value={formData.nickname}
                      onChange={e => setFormData({...formData, nickname: e.target.value})}
                      className="w-full px-3 py-2 bg-paper-100 border border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 transition-all font-marker text-navy-900 text-sm"
                      placeholder="Nama Panggilan"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label htmlFor="city" className="text-xs font-bold text-navy-800 font-serif">Kota Domisili</label>
                    <input 
                      type="text" 
                      id="city" 
                      required
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                      className="w-full px-3 py-2 bg-paper-100 border border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 transition-all font-marker text-navy-900 text-sm"
                      placeholder="Contoh: Padang"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="jobStatus" className="text-xs font-bold text-navy-800 font-serif">Status Pekerjaan</label>
                    <select 
                      id="jobStatus" 
                      required
                      value={formData.jobStatus}
                      onChange={e => setFormData({...formData, jobStatus: e.target.value, jobTitle: '', companyName: ''})}
                      className="w-full px-3 py-2 bg-paper-100 border border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 transition-all font-marker text-navy-900 text-sm"
                    >
                      <option value="">Pilih Status</option>
                      <option value="Pegawai Swasta">Pegawai Swasta</option>
                      <option value="Pegawai Negeri Sipil (PNS) / BUMN">Pegawai Negeri Sipil (PNS) / BUMN</option>
                      <option value="Wiraswasta / Punya Usaha">Wiraswasta / Punya Usaha</option>
                      <option value="Relawan / Pekerja Sosial">Relawan / Pekerja Sosial</option>
                      <option value="Ibu Rumah Tangga">Ibu Rumah Tangga</option>
                      <option value="Tidak Bekerja / Lainnya">Tidak Bekerja / Lainnya</option>
                    </select>
                  </div>
                </div>

                {formData.jobStatus === 'Pegawai Swasta' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label htmlFor="jobTitle" className="text-xs font-bold text-navy-800 font-serif">Pekerjaan Sebagai Apa</label>
                      <input 
                        type="text" 
                        id="jobTitle" 
                        required
                        value={formData.jobTitle}
                        onChange={e => setFormData({...formData, jobTitle: e.target.value})}
                        className="w-full px-3 py-2 bg-paper-100 border border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 transition-all font-marker text-navy-900 text-sm"
                        placeholder="Contoh: Manajer Operasional"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="companyName" className="text-xs font-bold text-navy-800 font-serif">Di Perusahaan Apa</label>
                      <input 
                        type="text" 
                        id="companyName" 
                        required
                        value={formData.companyName}
                        onChange={e => setFormData({...formData, companyName: e.target.value})}
                        className="w-full px-3 py-2 bg-paper-100 border border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 transition-all font-marker text-navy-900 text-sm"
                        placeholder="Contoh: PT. Maju Bersama"
                      />
                    </div>
                  </div>
                )}

                {formData.jobStatus === 'Pegawai Negeri Sipil (PNS) / BUMN' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label htmlFor="jobTitle" className="text-xs font-bold text-navy-800 font-serif">Pekerjaan Sebagai Apa</label>
                      <input 
                        type="text" 
                        id="jobTitle" 
                        required
                        value={formData.jobTitle}
                        onChange={e => setFormData({...formData, jobTitle: e.target.value})}
                        className="w-full px-3 py-2 bg-paper-100 border border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 transition-all font-marker text-navy-900 text-sm"
                        placeholder="Contoh: Staf IT / Dokter"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="companyName" className="text-xs font-bold text-navy-800 font-serif">Di Instansi / Dinas Apa</label>
                      <input 
                        type="text" 
                        id="companyName" 
                        required
                        value={formData.companyName}
                        onChange={e => setFormData({...formData, companyName: e.target.value})}
                        className="w-full px-3 py-2 bg-paper-100 border border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 transition-all font-marker text-navy-900 text-sm"
                        placeholder="Contoh: Pemkot Padang / PLN"
                      />
                    </div>
                  </div>
                )}

                {formData.jobStatus === 'Wiraswasta / Punya Usaha' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label htmlFor="jobTitle" className="text-xs font-bold text-navy-800 font-serif">Bidang Usaha</label>
                      <input 
                        type="text" 
                        id="jobTitle" 
                        required
                        value={formData.jobTitle}
                        onChange={e => setFormData({...formData, jobTitle: e.target.value})}
                        className="w-full px-3 py-2 bg-paper-100 border border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 transition-all font-marker text-navy-900 text-sm"
                        placeholder="Contoh: Kuliner / Konstruksi"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="companyName" className="text-xs font-bold text-navy-800 font-serif">Nama Usaha</label>
                      <input 
                        type="text" 
                        id="companyName" 
                        required
                        value={formData.companyName}
                        onChange={e => setFormData({...formData, companyName: e.target.value})}
                        className="w-full px-3 py-2 bg-paper-100 border border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 transition-all font-marker text-navy-900 text-sm"
                        placeholder="Contoh: Toko Barokah / CV. Sukses"
                      />
                    </div>
                  </div>
                )}

                {formData.jobStatus === 'Relawan / Pekerja Sosial' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1">
                      <label htmlFor="jobTitle" className="text-xs font-bold text-navy-800 font-serif">Bidang Fokus</label>
                      <input 
                        type="text" 
                        id="jobTitle" 
                        required
                        value={formData.jobTitle}
                        onChange={e => setFormData({...formData, jobTitle: e.target.value})}
                        className="w-full px-3 py-2 bg-paper-100 border border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 transition-all font-marker text-navy-900 text-sm"
                        placeholder="Contoh: Pendidikan / Kemanusiaan"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="companyName" className="text-xs font-bold text-navy-800 font-serif">Nama Organisasi / Yayasan</label>
                      <input 
                        type="text" 
                        id="companyName" 
                        required
                        value={formData.companyName}
                        onChange={e => setFormData({...formData, companyName: e.target.value})}
                        className="w-full px-3 py-2 bg-paper-100 border border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 transition-all font-marker text-navy-900 text-sm"
                        placeholder="Contoh: Dompet Dhuafa / PMI"
                      />
                    </div>
                  </div>
                )}

                {(formData.jobStatus === 'Ibu Rumah Tangga' || formData.jobStatus === 'Tidak Bekerja / Lainnya') && (
                  <div className="space-y-1">
                    <label htmlFor="jobTitle" className="text-xs font-bold text-navy-800 font-serif">Keterangan / Aktivitas Saat Ini (Opsional)</label>
                    <input 
                      type="text" 
                      id="jobTitle" 
                      value={formData.jobTitle}
                      onChange={e => setFormData({...formData, jobTitle: e.target.value})}
                      className="w-full px-3 py-2 bg-paper-100 border border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 transition-all font-marker text-navy-900 text-sm"
                      placeholder="Contoh: Mengurus anak, dll"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label htmlFor="class" className="text-xs font-bold text-navy-800 font-serif">Kelas Semasa SMA</label>
                    <select 
                      id="class" 
                      required
                      value={formData.class}
                      onChange={e => setFormData({...formData, class: e.target.value})}
                      className="w-full px-3 py-2 bg-paper-100 border border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 transition-all font-marker text-navy-900 text-sm"
                    >
                      <option value="">Pilih Kelas</option>
                      <option value="2.1">2.1</option>
                      <option value="2.2">2.2</option>
                      <option value="2.3">2.3</option>
                      <option value="2.4">2.4</option>
                      <option value="2.5">2.5</option>
                      <option value="2.6">2.6</option>
                      <option value="2.7">2.7</option>
                      <option value="2.8">2.8</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="photo" className="text-xs font-bold text-navy-800 font-serif">Upload Foto (Untuk Nametag)</label>
                    <input 
                      type="file" 
                      id="photo" 
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="w-full px-3 py-1.5 bg-paper-100 border border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 transition-all font-marker text-navy-900 text-sm file:mr-4 file:py-1 file:px-3 file:border-0 file:text-sm file:font-semibold file:bg-navy-900 file:text-paper-100 hover:file:bg-navy-800 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-navy-800 font-serif block mb-2">Status Kehadiran</label>
                  <div className="flex flex-wrap gap-3 font-marker text-sm mb-4">
                    <label className={`flex items-center gap-2 cursor-pointer p-2 border border-navy-900 transition-colors ${formData.attendance === 'yes' ? 'bg-navy-900 text-white' : 'bg-paper-100 hover:bg-paper-300 text-navy-900'}`}>
                      <input type="radio" name="attendance" value="yes" checked={formData.attendance === 'yes'} onChange={e => setFormData({...formData, attendance: e.target.value})} required className="sr-only" />
                      <span>Hadir</span>
                    </label>
                    <label className={`flex items-center gap-2 cursor-pointer p-2 border border-navy-900 transition-colors ${formData.attendance === 'maybe' ? 'bg-navy-900 text-white' : 'bg-paper-100 hover:bg-paper-300 text-navy-900'}`}>
                      <input type="radio" name="attendance" value="maybe" checked={formData.attendance === 'maybe'} onChange={e => setFormData({...formData, attendance: e.target.value})} className="sr-only" />
                      <span>Mungkin</span>
                    </label>
                    <label className={`flex items-center gap-2 cursor-pointer p-2 border border-navy-900 transition-colors ${formData.attendance === 'no' ? 'bg-navy-900 text-white' : 'bg-paper-100 hover:bg-paper-300 text-navy-900'}`}>
                      <input type="radio" name="attendance" value="no" checked={formData.attendance === 'no'} onChange={e => setFormData({...formData, attendance: e.target.value})} className="sr-only" />
                      <span>Maaf, skip</span>
                    </label>
                  </div>
                  
                  {formData.attendance === 'yes' && (
                    <div className="bg-paper-200 border border-navy-900 p-4 space-y-3">
                      <label className="text-xs font-bold text-navy-800 font-serif block mb-2">Acara yang Dihadiri:</label>
                      <label className="flex items-center gap-2 text-sm font-sans text-navy-900 cursor-pointer">
                        <input type="checkbox" checked={formData.attendedEvents.pagi} onChange={e => setFormData({...formData, attendedEvents: {...formData.attendedEvents, pagi: e.target.checked}})} className="w-4 h-4 text-navy-900" />
                        <span>Pagi (Napak Tilas)</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm font-sans text-navy-900 cursor-pointer">
                        <input type="checkbox" checked={formData.attendedEvents.sore} onChange={e => setFormData({...formData, attendedEvents: {...formData.attendedEvents, sore: e.target.checked}})} className="w-4 h-4 text-navy-900" />
                        <span>Sore / Malam (Gala Dinner)</span>
                      </label>
                      <label className="flex items-center gap-2 text-sm font-sans text-navy-900 cursor-pointer">
                        <input type="checkbox" checked={formData.attendedEvents.minggu} onChange={e => setFormData({...formData, attendedEvents: {...formData.attendedEvents, minggu: e.target.checked}})} className="w-4 h-4 text-navy-900" />
                        <span>Minggu (Olahraga / Kuliner)</span>
                      </label>
                    </div>
                  )}
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-navy-900 text-paper-200 px-6 py-3 font-serif font-bold hover:bg-navy-800 transition-colors mt-6 shadow-[2px_2px_0px_#8c7d66] text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
                  {isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi & Buat Nametag'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RSVP;

