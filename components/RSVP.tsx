import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2 } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const RSVP = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data } = useContent();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <section id="rsvp" className="py-24 bg-paper-500 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
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
              <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                <div className="w-20 h-20 bg-navy-800 flex items-center justify-center mb-6 transform rotate-3">
                  <CheckCircle2 className="w-10 h-10 text-paper-200" />
                </div>
                <h3 className="text-3xl font-marker text-navy-900 mb-4 transform -rotate-2">Terima Kasih!</h3>
                <p className="text-navy-700 mb-8 font-serif">
                  Konfirmasi kehadiran Anda telah kami terima. Kami akan segera menghubungi Anda untuk informasi lebih lanjut.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-sm font-bold text-navy-600 hover:text-navy-900 transition-colors font-serif underline"
                >
                  Kirim tanggapan lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-3xl font-serif font-bold text-navy-900 mb-8 border-b-2 border-dashed border-navy-300 pb-4">Form RSVP</h3>
                
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-navy-800 font-serif">Nama Lengkap</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    className="w-full px-4 py-3 bg-paper-100 border border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 transition-all font-marker text-navy-900"
                    placeholder="Tulis nama disini..."
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="class" className="text-sm font-bold text-navy-800 font-serif">Kelas Semasa SMA</label>
                  <select 
                    id="class" 
                    required
                    className="w-full px-4 py-3 bg-paper-100 border border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 transition-all font-marker text-navy-900"
                  >
                    <option value="">Pilih Kelas</option>
                    <option value="IPA 1">IPA 1</option>
                    <option value="IPA 2">IPA 2</option>
                    <option value="IPA 3">IPA 3</option>
                    <option value="IPS 1">IPS 1</option>
                    <option value="IPS 2">IPS 2</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-bold text-navy-800 font-serif">Nomor WhatsApp</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    required
                    className="w-full px-4 py-3 bg-paper-100 border border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 transition-all font-marker text-navy-900"
                    placeholder="08..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy-800 font-serif block mb-2">Status Kehadiran</label>
                  <div className="flex flex-col sm:flex-row gap-4 font-marker">
                    <label className="flex items-center gap-2 cursor-pointer p-2 border border-navy-900 bg-paper-100 hover:bg-paper-300">
                      <input type="radio" name="attendance" value="yes" required className="w-4 h-4 text-navy-900 accent-navy-900" />
                      <span className="text-navy-900">Hadir</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer p-2 border border-navy-900 bg-paper-100 hover:bg-paper-300">
                      <input type="radio" name="attendance" value="maybe" className="w-4 h-4 text-navy-900 accent-navy-900" />
                      <span className="text-navy-900">Mungkin</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer p-2 border border-navy-900 bg-paper-100 hover:bg-paper-300">
                      <input type="radio" name="attendance" value="no" className="w-4 h-4 text-navy-900 accent-navy-900" />
                      <span className="text-navy-900">Maaf, skip</span>
                    </label>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-navy-900 text-paper-200 px-8 py-4 font-serif font-bold hover:bg-navy-800 transition-colors mt-8 shadow-[2px_2px_0px_#8c7d66]"
                >
                  <Send className="w-5 h-5" />
                  Kirim Konfirmasi
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
