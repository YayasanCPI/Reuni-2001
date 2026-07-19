import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { useContent } from './contexts/ContentContext';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './lib/firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { LogOut, Save, Plus, Trash2 } from 'lucide-react';
import { LandingPageData } from './contexts/ContentContext';

const Admin = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { data, updateData, loading: dataLoading } = useContent();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  
  const [formData, setFormData] = useState<LandingPageData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [attendees, setAttendees] = useState<any[]>([]);

  React.useEffect(() => {
    if (!user) return;
    const q = query(collection(db, 'attendees'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const attendeesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).sort((a: any, b: any) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });
      setAttendees(attendeesData);
    }, (error) => {
      console.error("Admin onSnapshot error:", error.code, error.message);
    });
    return () => unsubscribe();
  }, [user]);

  // Initialize form data when data loads
  React.useEffect(() => {
    if (data && !dataLoading && !formData) {
      setFormData(data);
    }
  }, [data, dataLoading, formData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setLoginError(err.message || 'Gagal login.');
    }
  };

  const handleSave = async () => {
    if (!formData) return;
    setIsSaving(true);
    try {
      await updateData(formData);
      alert('Data berhasil disimpan!');
    } catch (err) {
      alert('Gagal menyimpan data.');
      console.error(err);
    }
    setIsSaving(false);
  };

  if (authLoading || dataLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-paper-500 font-sans text-navy-900">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-paper-500 font-sans text-navy-900 px-4">
        <div className="bg-paper-200 p-8 rounded shadow-md border-2 border-navy-900 w-full max-w-md relative transform rotate-1">
          <div className="tape -top-4 left-1/2 -translate-x-1/2 w-24"></div>
          <h2 className="text-3xl font-marker text-navy-900 mb-6 text-center transform -rotate-2">
            {isRegistering ? 'Daftar Admin Baru' : 'Admin Login'}
          </h2>
          {loginError && <div className="bg-red-100 text-red-600 p-3 mb-4 rounded text-sm font-bold border border-red-300">{loginError}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-navy-800 font-serif mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-paper-100 border border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 font-sans"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-navy-800 font-serif mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-paper-100 border border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 font-sans"
                required
              />
            </div>
            <button type="submit" className="w-full bg-navy-900 text-paper-200 py-3 font-serif font-bold shadow-[2px_2px_0px_#8c7d66] hover:bg-navy-800 mt-4">
              {isRegistering ? 'Daftar' : 'Masuk'}
            </button>
            <div className="text-center mt-4">
              <button 
                type="button" 
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-sm font-serif text-navy-600 hover:text-navy-900 underline"
              >
                {isRegistering ? 'Sudah punya akun? Masuk' : 'Belum punya akun? Daftar Admin Baru'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (!formData) return null;

  return (
    <div className="min-h-screen bg-paper-500 font-sans text-navy-900 pb-20">
      {/* Admin Header */}
      <div className="bg-navy-900 text-paper-200 py-4 px-6 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <h1 className="text-2xl font-marker">Admin Panel Reuni</h1>
        <div className="flex gap-4">
          <button 
            onClick={handleSave} 
            disabled={isSaving}
            className="flex items-center gap-2 bg-paper-200 text-navy-900 px-4 py-2 font-bold font-serif shadow-[2px_2px_0px_#8c7d66] hover:bg-paper-100 disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {isSaving ? 'Menyimpan...' : 'Simpan'}
          </button>
          <button 
            onClick={signOut} 
            className="flex items-center gap-2 border border-paper-400 px-4 py-2 font-bold font-serif hover:bg-navy-800"
          >
            <LogOut className="w-4 h-4" /> Keluar
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-8 space-y-12">
        {/* Attendees List */}
        <section className="bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative">
          <h2 className="text-2xl font-marker mb-6">Daftar Peserta Konfirmasi</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-navy-900 bg-white">
              <thead>
                <tr className="bg-paper-400">
                  <th className="border border-navy-900 p-2 font-serif text-sm">Nama Lengkap & Panggilan</th>
                  <th className="border border-navy-900 p-2 font-serif text-sm">Kelas & Domisili</th>
                  <th className="border border-navy-900 p-2 font-serif text-sm">Pekerjaan / Aktivitas</th>
                  <th className="border border-navy-900 p-2 font-serif text-sm">Kehadiran</th>
                </tr>
              </thead>
              <tbody>
                {attendees.map(a => (
                  <tr key={a.id} className="hover:bg-paper-100">
                    <td className="border border-navy-900 p-2 text-sm">
                      <div className="font-bold">{a.name}</div>
                      <div className="text-navy-600 text-xs">Panggilan: {a.nickname}</div>
                    </td>
                    <td className="border border-navy-900 p-2 text-sm">
                      <div>Kelas: {a.class}</div>
                      <div className="text-navy-600 text-xs">{a.city}</div>
                    </td>
                    <td className="border border-navy-900 p-2 text-sm">
                      <div className="font-bold">{a.jobStatus || a.job}</div>
                      {a.jobTitle && <div className="text-xs">{a.jobTitle}</div>}
                      {a.companyName && <div className="text-navy-600 text-xs">{a.companyName}</div>}
                    </td>
                    <td className="border border-navy-900 p-2 text-sm">
                      <span className={`px-2 py-1 text-xs font-bold ${
                        a.attendance === 'yes' ? 'bg-green-100 text-green-800' :
                        a.attendance === 'maybe' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {a.attendance === 'yes' ? 'Hadir' : a.attendance === 'maybe' ? 'Mungkin' : 'Skip'}
                      </span>
                      {a.attendance === 'yes' && a.attendedEvents && (
                        <div className="mt-2 text-xs flex flex-col gap-1">
                          {a.attendedEvents.pagi && <span className="bg-paper-200 px-1 border border-navy-300">Pagi</span>}
                          {a.attendedEvents.sore && <span className="bg-paper-200 px-1 border border-navy-300">Sore</span>}
                          {a.attendedEvents.minggu && <span className="bg-paper-200 px-1 border border-navy-300">Minggu</span>}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {attendees.length === 0 && (
                  <tr>
                    <td colSpan={4} className="border border-navy-900 p-4 text-center text-navy-600 font-serif">Belum ada peserta yang mengkonfirmasi kehadiran.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* General Settings */}
        <section className="bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative">
          <div className="tape -top-3 -left-3 w-16 rotate-45"></div>
          <h2 className="text-2xl font-marker mb-6">Informasi Umum</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-navy-800 font-serif mb-1">Judul Utama</label>
              <input type="text" value={formData.heroTitle} onChange={e => setFormData({...formData, heroTitle: e.target.value})} className="w-full px-3 py-2 bg-paper-100 border border-navy-900" />
            </div>
            <div>
              <label className="block text-sm font-bold text-navy-800 font-serif mb-1">Sub Judul</label>
              <input type="text" value={formData.heroSubtitle} onChange={e => setFormData({...formData, heroSubtitle: e.target.value})} className="w-full px-3 py-2 bg-paper-100 border border-navy-900" />
            </div>
            <div>
              <label className="block text-sm font-bold text-navy-800 font-serif mb-1">Tanggal Acara</label>
              <input type="text" value={formData.eventDate} onChange={e => setFormData({...formData, eventDate: e.target.value})} className="w-full px-3 py-2 bg-paper-100 border border-navy-900" />
            </div>
            <div>
              <label className="block text-sm font-bold text-navy-800 font-serif mb-1">Waktu Countdown (Format ISO: YYYY-MM-DDTHH:mm:ss+07:00)</label>
              <input type="text" value={formData.eventDateISO || ''} onChange={e => setFormData({...formData, eventDateISO: e.target.value})} className="w-full px-3 py-2 bg-paper-100 border border-navy-900" />
            </div>
            <div>
              <label className="block text-sm font-bold text-navy-800 font-serif mb-1">Lokasi Singkat</label>
              <input type="text" value={formData.eventLocation} onChange={e => setFormData({...formData, eventLocation: e.target.value})} className="w-full px-3 py-2 bg-paper-100 border border-navy-900" />
            </div>
            <div>
              <label className="block text-sm font-bold text-navy-800 font-serif mb-1">Base Attendee Count (Jumlah Peserta Awal Tambahan di Counter)</label>
              <input type="number" value={formData.baseAttendeeCount || 0} onChange={e => setFormData({...formData, baseAttendeeCount: parseInt(e.target.value) || 0})} className="w-full px-3 py-2 bg-paper-100 border border-navy-900 mb-4" />
              <label className="block text-sm font-bold text-navy-800 font-serif mb-1">Google Apps Script Web App URL (Untuk RSVP)</label>
              <input type="text" value={formData.googleSheetWebAppUrl || ''} onChange={e => setFormData({...formData, googleSheetWebAppUrl: e.target.value})} className="w-full px-3 py-2 bg-paper-100 border border-navy-900" placeholder="https://script.google.com/macros/s/.../exec" />
            </div>
            <div>
              <label className="block text-sm font-bold text-navy-800 font-serif mb-1">Biaya Kontribusi</label>
              <input type="text" value={formData.contributionAmount} onChange={e => setFormData({...formData, contributionAmount: e.target.value})} className="w-full px-3 py-2 bg-paper-100 border border-navy-900" />
            </div>
            <div>
              <label className="block text-sm font-bold text-navy-800 font-serif mb-1">URL Musik Background (YouTube)</label>
              <input type="text" value={formData.backgroundMusicUrl || ''} onChange={e => setFormData({...formData, backgroundMusicUrl: e.target.value})} className="w-full px-3 py-2 bg-paper-100 border border-navy-900" placeholder="https://youtu.be/..." />
              </div>
              <div>
                <label className="block text-xs font-bold font-serif mb-1">URL Video Intro Depan (kosongkan jika tidak ada)</label>
                <input type="text" value={formData.introVideoUrl || ''} onChange={e => setFormData({...formData, introVideoUrl: e.target.value})} className="w-full px-3 py-2 bg-paper-100 border border-navy-900" placeholder="https://..." />
            </div>
              <div>
                <label className="block text-xs font-bold font-serif mb-1">URL Video Intro Depan Mobile (Rasio 9:16)</label>
                <input type="text" value={formData.introVideoUrlMobile || ''} onChange={e => setFormData({...formData, introVideoUrlMobile: e.target.value})} className="w-full px-3 py-2 bg-paper-100 border border-navy-900" placeholder="https://..." />
              </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-navy-800 font-serif mb-1">Teks Tentang 1</label>
              <textarea value={formData.aboutText1} onChange={e => setFormData({...formData, aboutText1: e.target.value})} rows={3} className="w-full px-3 py-2 bg-paper-100 border border-navy-900" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-navy-800 font-serif mb-1">Teks Tentang 2</label>
              <textarea value={formData.aboutText2} onChange={e => setFormData({...formData, aboutText2: e.target.value})} rows={3} className="w-full px-3 py-2 bg-paper-100 border border-navy-900" />
            </div>
          </div>
        </section>

        {/* Forewords */}
        {formData.forewords && (
          <section className="bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative">
            <h2 className="text-2xl font-marker mb-6">Kata Pengantar</h2>
            
            <div className="space-y-8">
              {/* Alumni Head */}
              <div className="bg-paper-100 p-4 border border-navy-900">
                <h3 className="font-serif font-bold text-lg mb-4 text-navy-800">Pimpinan Alumni</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold font-serif mb-1">Gelar / Jabatan</label>
                    <input type="text" value={formData.forewords.alumniHead.title} onChange={e => {
                      setFormData({...formData, forewords: { ...formData.forewords!, alumniHead: { ...formData.forewords!.alumniHead, title: e.target.value } }});
                    }} className="w-full px-3 py-2 bg-white border border-navy-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold font-serif mb-1">Nama</label>
                    <input type="text" value={formData.forewords.alumniHead.name} onChange={e => {
                      setFormData({...formData, forewords: { ...formData.forewords!, alumniHead: { ...formData.forewords!.alumniHead, name: e.target.value } }});
                    }} className="w-full px-3 py-2 bg-white border border-navy-900" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold font-serif mb-1">URL Foto (Unsplash/Imgur dll)</label>
                    <input type="text" value={formData.forewords.alumniHead.photoUrl} onChange={e => {
                      setFormData({...formData, forewords: { ...formData.forewords!, alumniHead: { ...formData.forewords!.alumniHead, photoUrl: e.target.value } }});
                    }} className="w-full px-3 py-2 bg-white border border-navy-900" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold font-serif mb-1">Pesan / Sambutan</label>
                    <textarea value={formData.forewords.alumniHead.message} onChange={e => {
                      setFormData({...formData, forewords: { ...formData.forewords!, alumniHead: { ...formData.forewords!.alumniHead, message: e.target.value } }});
                    }} rows={4} className="w-full px-3 py-2 bg-white border border-navy-900" />
                  </div>
                </div>
              </div>

              {/* Committee Head */}
              <div className="bg-paper-100 p-4 border border-navy-900">
                <h3 className="font-serif font-bold text-lg mb-4 text-navy-800">Ketua Pelaksana</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold font-serif mb-1">Gelar / Jabatan</label>
                    <input type="text" value={formData.forewords.committeeHead.title} onChange={e => {
                      setFormData({...formData, forewords: { ...formData.forewords!, committeeHead: { ...formData.forewords!.committeeHead, title: e.target.value } }});
                    }} className="w-full px-3 py-2 bg-white border border-navy-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold font-serif mb-1">Nama</label>
                    <input type="text" value={formData.forewords.committeeHead.name} onChange={e => {
                      setFormData({...formData, forewords: { ...formData.forewords!, committeeHead: { ...formData.forewords!.committeeHead, name: e.target.value } }});
                    }} className="w-full px-3 py-2 bg-white border border-navy-900" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold font-serif mb-1">URL Foto (Unsplash/Imgur dll)</label>
                    <input type="text" value={formData.forewords.committeeHead.photoUrl} onChange={e => {
                      setFormData({...formData, forewords: { ...formData.forewords!, committeeHead: { ...formData.forewords!.committeeHead, photoUrl: e.target.value } }});
                    }} className="w-full px-3 py-2 bg-white border border-navy-900" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold font-serif mb-1">Pesan / Sambutan</label>
                    <textarea value={formData.forewords.committeeHead.message} onChange={e => {
                      setFormData({...formData, forewords: { ...formData.forewords!, committeeHead: { ...formData.forewords!.committeeHead, message: e.target.value } }});
                    }} rows={4} className="w-full px-3 py-2 bg-white border border-navy-900" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Contacts */}
        <section className="bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative">
          <h2 className="text-2xl font-marker mb-6">Narahubung / Panitia</h2>
          <div className="space-y-4">
            {formData.contacts.map((contact, idx) => (
              <div key={idx} className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-bold font-serif mb-1">Nama</label>
                  <input type="text" value={contact.name} onChange={e => {
                    const newContacts = [...formData.contacts];
                    newContacts[idx].name = e.target.value;
                    setFormData({...formData, contacts: newContacts});
                  }} className="w-full px-3 py-2 bg-paper-100 border border-navy-900" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold font-serif mb-1">No. Telp / WA</label>
                  <input type="text" value={contact.phone} onChange={e => {
                    const newContacts = [...formData.contacts];
                    newContacts[idx].phone = e.target.value;
                    setFormData({...formData, contacts: newContacts});
                  }} className="w-full px-3 py-2 bg-paper-100 border border-navy-900" />
                </div>
                <button onClick={() => {
                  setFormData({...formData, contacts: formData.contacts.filter((_, i) => i !== idx)});
                }} className="bg-red-500 text-white p-2 rounded mb-1 hover:bg-red-600">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button onClick={() => {
              setFormData({...formData, contacts: [...formData.contacts, { name: '', phone: '' }]});
            }} className="flex items-center gap-2 text-navy-700 font-bold font-serif hover:text-navy-900">
              <Plus className="w-4 h-4" /> Tambah Narahubung
            </button>
          </div>
        </section>

        {/* Bank Accounts */}
        <section className="bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative">
          <h2 className="text-2xl font-marker mb-6">Rekening Pembayaran</h2>
          <div className="space-y-4">
            {formData.bankAccounts.map((bank, idx) => (
              <div key={idx} className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-bold font-serif mb-1">Bank</label>
                  <input type="text" value={bank.bank} onChange={e => {
                    const newBanks = [...formData.bankAccounts];
                    newBanks[idx].bank = e.target.value;
                    setFormData({...formData, bankAccounts: newBanks});
                  }} className="w-full px-3 py-2 bg-paper-100 border border-navy-900" placeholder="Misal: BCA" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold font-serif mb-1">Nomor</label>
                  <input type="text" value={bank.number} onChange={e => {
                    const newBanks = [...formData.bankAccounts];
                    newBanks[idx].number = e.target.value;
                    setFormData({...formData, bankAccounts: newBanks});
                  }} className="w-full px-3 py-2 bg-paper-100 border border-navy-900" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold font-serif mb-1">Atas Nama</label>
                  <input type="text" value={bank.name} onChange={e => {
                    const newBanks = [...formData.bankAccounts];
                    newBanks[idx].name = e.target.value;
                    setFormData({...formData, bankAccounts: newBanks});
                  }} className="w-full px-3 py-2 bg-paper-100 border border-navy-900" />
                </div>
                <button onClick={() => {
                  setFormData({...formData, bankAccounts: formData.bankAccounts.filter((_, i) => i !== idx)});
                }} className="bg-red-500 text-white p-2 rounded mb-1 hover:bg-red-600">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button onClick={() => {
              setFormData({...formData, bankAccounts: [...formData.bankAccounts, { bank: '', number: '', name: '' }]});
            }} className="flex items-center gap-2 text-navy-700 font-bold font-serif hover:text-navy-900">
              <Plus className="w-4 h-4" /> Tambah Rekening
            </button>
          </div>
        </section>

        {/* Progress Kontribusi Kelas */}
        <section className="bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative">
          <div className="tape -top-3 left-10 w-16"></div>
          <h2 className="text-2xl font-marker mb-6">Progress Kontribusi Kelas</h2>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.classFundingProgress && formData.classFundingProgress.map((cls, idx) => (
                <div key={idx} className="bg-paper-100 p-4 border border-navy-900">
                  <div className="flex justify-between items-center mb-4">
                    <input 
                      type="text" 
                      value={cls.className} 
                      onChange={e => {
                        const newProgress = [...(formData.classFundingProgress || [])];
                        newProgress[idx].className = e.target.value;
                        setFormData({...formData, classFundingProgress: newProgress});
                      }} 
                      className="px-3 py-1 bg-white border border-navy-900 font-bold font-serif text-sm w-1/2" 
                      placeholder="Nama Kelas"
                    />
                    <button onClick={() => {
                      const newProgress = formData.classFundingProgress?.filter((_, i) => i !== idx);
                      setFormData({...formData, classFundingProgress: newProgress});
                    }} className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold font-serif mb-1">Terkumpul (Rp)</label>
                      <input 
                        type="number" 
                        value={cls.collected} 
                        onChange={e => {
                          const newProgress = [...(formData.classFundingProgress || [])];
                          newProgress[idx].collected = parseInt(e.target.value) || 0;
                          setFormData({...formData, classFundingProgress: newProgress});
                        }} 
                        className="w-full px-3 py-2 bg-white border border-navy-900" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold font-serif mb-1">Target (Rp)</label>
                      <input 
                        type="number" 
                        value={cls.target} 
                        onChange={e => {
                          const newProgress = [...(formData.classFundingProgress || [])];
                          newProgress[idx].target = parseInt(e.target.value) || 0;
                          setFormData({...formData, classFundingProgress: newProgress});
                        }} 
                        className="w-full px-3 py-2 bg-white border border-navy-900" 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => {
              const newProgress = [...(formData.classFundingProgress || []), { className: 'Kelas Baru', collected: 0, target: 12500000 }];
              setFormData({...formData, classFundingProgress: newProgress});
            }} className="flex items-center gap-2 text-navy-700 font-bold font-serif hover:text-navy-900">
              <Plus className="w-4 h-4" /> Tambah Kelas
            </button>
          </div>
        </section>

        {/* Detailed Schedule (Advanced) */}
        <section className="bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative">
          <h2 className="text-2xl font-marker mb-6">Detail Jadwal Acara (Pagi, Sore, Minggu)</h2>
          <div className="space-y-4">
            <div className="bg-paper-100 p-4 border border-navy-900 relative">
                <p className="text-xs font-serif text-navy-700 mb-2">Edit format JSON di bawah untuk mengubah jadwal Pagi, Sore, dan Minggu. Harap pastikan format JSON valid.</p>
                <textarea 
                    value={JSON.stringify(formData.detailedSchedule, null, 2)} 
                    onChange={e => {
                        try {
                            const parsed = JSON.parse(e.target.value);
                            setFormData({...formData, detailedSchedule: parsed});
                        } catch (err) {
                            // Ignore invalid JSON while typing
                        }
                    }} 
                    rows={15} 
                    className="w-full px-3 py-2 bg-white border border-navy-900 font-mono text-sm" 
                > </textarea>
            </div>
          </div>
        </section>

        {/* Budget */}
        <section className="bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative">
          <h2 className="text-2xl font-marker mb-6">Anggaran (Budget)</h2>
          <div className="space-y-4">
            {formData.budgetItems?.map((item, idx) => (
              <div key={idx} className="bg-paper-100 p-4 border border-navy-900 relative pr-10">
                <button onClick={() => {
                  setFormData({...formData, budgetItems: formData.budgetItems?.filter((_, i) => i !== idx)});
                }} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold font-serif mb-1">Kategori</label>
                    <input type="text" value={item.category} onChange={e => {
                      const newItems = [...(formData.budgetItems || [])];
                      newItems[idx].category = e.target.value;
                      setFormData({...formData, budgetItems: newItems});
                    }} className="w-full px-3 py-2 bg-white border border-navy-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold font-serif mb-1">Jumlah</label>
                    <input type="text" value={item.amount} onChange={e => {
                      const newItems = [...(formData.budgetItems || [])];
                      newItems[idx].amount = e.target.value;
                      setFormData({...formData, budgetItems: newItems});
                    }} className="w-full px-3 py-2 bg-white border border-navy-900" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold font-serif mb-1">Keterangan Tambahan</label>
                    <input type="text" value={item.details} onChange={e => {
                      const newItems = [...(formData.budgetItems || [])];
                      newItems[idx].details = e.target.value;
                      setFormData({...formData, budgetItems: newItems});
                    }} className="w-full px-3 py-2 bg-white border border-navy-900" />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => {
              setFormData({...formData, budgetItems: [...(formData.budgetItems || []), { category: "", amount: "", details: "" }]});
            }} className="flex items-center gap-2 text-navy-700 font-bold font-serif hover:text-navy-900">
              <Plus className="w-4 h-4" /> Tambah Anggaran
            </button>
          </div>
        </section>

        {/* Timeline */}
        <section className="bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative">
          <h2 className="text-2xl font-marker mb-6">Linimasa (Timeline)</h2>
          <div className="space-y-4">
            {formData.timelineItems?.map((item, idx) => (
              <div key={idx} className="bg-paper-100 p-4 border border-navy-900 relative pr-10">
                <button onClick={() => {
                  setFormData({...formData, timelineItems: formData.timelineItems?.filter((_, i) => i !== idx)});
                }} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold font-serif mb-1">Fase / Tahap</label>
                    <input type="text" value={item.phase} onChange={e => {
                      const newItems = [...(formData.timelineItems || [])];
                      newItems[idx].phase = e.target.value;
                      setFormData({...formData, timelineItems: newItems});
                    }} className="w-full px-3 py-2 bg-white border border-navy-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold font-serif mb-1">Waktu</label>
                    <input type="text" value={item.time} onChange={e => {
                      const newItems = [...(formData.timelineItems || [])];
                      newItems[idx].time = e.target.value;
                      setFormData({...formData, timelineItems: newItems});
                    }} className="w-full px-3 py-2 bg-white border border-navy-900" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold font-serif mb-1">Target / Output</label>
                    <input type="text" value={item.target} onChange={e => {
                      const newItems = [...(formData.timelineItems || [])];
                      newItems[idx].target = e.target.value;
                      setFormData({...formData, timelineItems: newItems});
                    }} className="w-full px-3 py-2 bg-white border border-navy-900" />
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => {
              setFormData({...formData, timelineItems: [...(formData.timelineItems || []), { phase: "", time: "", target: "" }]});
            }} className="flex items-center gap-2 text-navy-700 font-bold font-serif hover:text-navy-900">
              <Plus className="w-4 h-4" /> Tambah Timeline
            </button>
          </div>
        </section>

        {/* Sponsorship */}
        <section className="bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative">
          <h2 className="text-2xl font-marker mb-6">Sponsorship</h2>
          <div className="mb-6">
            <label className="block text-sm font-bold text-navy-800 font-serif mb-1">URL Proposal Sponsorship (PDF/Link)</label>
            <input type="text" value={formData.sponsorshipProposalUrl || ''} onChange={e => setFormData({...formData, sponsorshipProposalUrl: e.target.value})} className="w-full px-3 py-2 bg-paper-100 border border-navy-900" placeholder="https://..." />
            <p className="text-xs text-navy-600 mt-1">Kosongkan jika tidak ada file proposal.</p>
          </div>
          <div className="space-y-4">
            {formData.sponsorshipPackages?.map((item, idx) => (
              <div key={idx} className="bg-paper-100 p-4 border border-navy-900 relative pr-10">
                <button onClick={() => {
                  setFormData({...formData, sponsorshipPackages: formData.sponsorshipPackages?.filter((_, i) => i !== idx)});
                }} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                  <Trash2 className="w-5 h-5" />
                </button>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold font-serif mb-1">Nama Paket</label>
                    <input type="text" value={item.title} onChange={e => {
                      const newItems = [...(formData.sponsorshipPackages || [])];
                      newItems[idx].title = e.target.value;
                      setFormData({...formData, sponsorshipPackages: newItems});
                    }} className="w-full px-3 py-2 bg-white border border-navy-900" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold font-serif mb-1">Harga / Nilai</label>
                    <input type="text" value={item.price} onChange={e => {
                      const newItems = [...(formData.sponsorshipPackages || [])];
                      newItems[idx].price = e.target.value;
                      setFormData({...formData, sponsorshipPackages: newItems});
                    }} className="w-full px-3 py-2 bg-white border border-navy-900" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold font-serif mb-1">Keuntungan (Pisahkan dengan Koma)</label>
                    <textarea value={item.benefits.join(", ")} onChange={e => {
                      const newItems = [...(formData.sponsorshipPackages || [])];
                      newItems[idx].benefits = e.target.value.split(",").map(s => s.trim());
                      setFormData({...formData, sponsorshipPackages: newItems});
                    }} rows={3} className="w-full px-3 py-2 bg-white border border-navy-900" > </textarea>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={() => {
              setFormData({...formData, sponsorshipPackages: [...(formData.sponsorshipPackages || []), { title: "", price: "", benefits: [], color: "bg-slate-400 text-navy-900", borderColor: "border-slate-400" }]});
            }} className="flex items-center gap-2 text-navy-700 font-bold font-serif hover:text-navy-900">
              <Plus className="w-4 h-4" /> Tambah Paket Sponsorship
            </button>
          </div>
        </section>

        {/* Gallery */}
        <section className="bg-paper-200 p-6 shadow-md border-2 border-navy-900 relative">
          <h2 className="text-2xl font-marker mb-6">Galeri Foto</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            {formData.gallery.map((img, idx) => (
              <div key={idx} className="bg-paper-100 p-4 border border-navy-900 relative flex flex-col gap-2">
                <button onClick={() => {
                  setFormData({...formData, gallery: formData.gallery.filter((_, i) => i !== idx)});
                }} className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white/80 rounded p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
                <img src={img.src || undefined} alt={img.caption} className="w-full h-32 object-cover border border-paper-400 mb-2" />
                <div>
                  <label className="block text-xs font-bold font-serif mb-1">URL Foto (Unsplash/Imgur dll)</label>
                  <input type="text" value={img.src} onChange={e => {
                    const newGal = [...formData.gallery];
                    newGal[idx].src = e.target.value;
                    setFormData({...formData, gallery: newGal});
                  }} className="w-full px-2 py-1 bg-white border border-navy-900 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold font-serif mb-1">Caption / Keterangan</label>
                  <input type="text" value={img.caption} onChange={e => {
                    const newGal = [...formData.gallery];
                    newGal[idx].caption = e.target.value;
                    setFormData({...formData, gallery: newGal});
                  }} className="w-full px-2 py-1 bg-white border border-navy-900 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold font-serif mb-1">Rotasi Polaroid</label>
                  <select value={img.rot} onChange={e => {
                    const newGal = [...formData.gallery];
                    newGal[idx].rot = e.target.value;
                    setFormData({...formData, gallery: newGal});
                  }} className="w-full px-2 py-1 bg-white border border-navy-900 text-sm">
                    <option value="rotate-1">Kanan 1 deg</option>
                    <option value="rotate-2">Kanan 2 deg</option>
                    <option value="rotate-3">Kanan 3 deg</option>
                    <option value="-rotate-1">Kiri 1 deg</option>
                    <option value="-rotate-2">Kiri 2 deg</option>
                    <option value="-rotate-3">Kiri 3 deg</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => {
            setFormData({...formData, gallery: [...formData.gallery, { src: 'https://images.unsplash.com/photo-1523580494112-071d16940a1c?q=80&w=2070&auto=format&fit=crop', caption: 'Kenangan Baru', rot: 'rotate-1' }]});
          }} className="flex items-center gap-2 text-navy-700 font-bold font-serif hover:text-navy-900">
            <Plus className="w-4 h-4" /> Tambah Foto
          </button>
        </section>
        </div>
      </div>
  );
};

export default Admin;
