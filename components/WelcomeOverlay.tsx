import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useContent } from '../contexts/ContentContext';
import { X, Clock } from 'lucide-react';

export const WelcomeOverlay = () => {
  const { data } = useContent();
  const [visitorInfo, setVisitorInfo] = useState<{ name: string; kelas: string } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [kelasInput, setKelasInput] = useState('');
  const [daysLeft, setDaysLeft] = useState<number>(0);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Calculate days left
    if (data?.eventDateISO) {
      const eventDate = new Date(data.eventDateISO).getTime();
      const now = new Date().getTime();
      const difference = eventDate - now;
      const days = Math.ceil(difference / (1000 * 3600 * 24));
      setDaysLeft(days > 0 ? days : 0);
    }

    // Check local storage
    const stored = localStorage.getItem('smansa_2001_visitor');
    if (stored) {
      const parsed = JSON.parse(stored);
      setVisitorInfo(parsed);
      setShowBanner(true);
    } else {
      // Small delay before showing modal for better effect
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [data?.eventDateISO]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !kelasInput) return;

    const info = { name: nameInput, kelas: kelasInput };
    localStorage.setItem('smansa_2001_visitor', JSON.stringify(info));
    setVisitorInfo(info);
    setShowModal(false);
    
    setTimeout(() => {
      setShowBanner(true);
    }, 500);
  };

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-navy-900/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: -20 }}
              className="bg-paper-200 p-8 max-w-md w-full shadow-[8px_8px_0px_#e8dcc4] border-4 border-navy-900 relative"
            >
              <div className="tape -top-4 left-1/2 -translate-x-1/2 w-24"></div>
              
              <div className="text-center mb-6">
                <h2 className="text-3xl font-marker text-navy-900 mb-2">Selamat Datang Kawan!</h2>
                <p className="text-navy-700 font-serif">Sebelum masuk mesin waktu, isi buku tamu dulu ya biar makin akrab.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5 font-serif">
                <div>
                  <label className="block text-sm font-bold text-navy-800 mb-1">Nama Panggilan (Zaman SMA)</label>
                  <input 
                    type="text" 
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full px-4 py-2 bg-white border-2 border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500"
                    placeholder="Contoh: Budi 'Si Kancil'"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-navy-800 mb-1">Dulu Kelas 2 Berapa?</label>
                  <select 
                    value={kelasInput}
                    onChange={(e) => setKelasInput(e.target.value)}
                    className="w-full px-4 py-2 bg-white border-2 border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500"
                    required
                  >
                    <option value="" disabled>Pilih Kelas</option>
                    <option value="Kelas 2.1">Kelas 2.1</option>
                    <option value="Kelas 2.2">Kelas 2.2</option>
                    <option value="Kelas 2.3">Kelas 2.3</option>
                    <option value="Kelas 2.4">Kelas 2.4</option>
                    <option value="Kelas 2.5">Kelas 2.5</option>
                    <option value="Kelas 2.6">Kelas 2.6</option>
                    <option value="Kelas 2.7">Kelas 2.7</option>
                    <option value="Kelas 2.8">Kelas 2.8</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 mt-4 bg-navy-900 text-white font-marker tracking-wider text-xl hover:bg-navy-800 transition-colors border-2 border-transparent hover:border-navy-900 hover:shadow-[4px_4px_0px_#142030]"
                >
                  Masuk Mesin Waktu!
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBanner && visitorInfo && (
          <motion.div 
            initial={{ y: -100, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            exit={{ y: -100, opacity: 0, x: '-50%' }}
            className="fixed top-24 left-1/2 z-[60] bg-navy-900/70 backdrop-blur-md text-paper-200 py-3 px-6 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-paper-500/50 flex justify-center items-center max-w-[90vw] md:max-w-max"
          >
            <div className="flex items-center gap-3 text-sm md:text-base font-serif">
              <span className="font-bold whitespace-nowrap">
                👋 Halo, {visitorInfo.name}!
              </span>
              <span className="hidden sm:block text-paper-500">|</span>
              <span className="flex items-center gap-2 whitespace-nowrap">
                <Clock className="w-4 h-4 text-paper-400" />
                <span>
                  Reuni <strong className="text-paper-100 font-marker text-lg tracking-wider mx-1">{daysLeft}</strong> hari lagi!
                </span>
              </span>
              <button 
                onClick={() => setShowBanner(false)}
                className="ml-2 text-paper-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WelcomeOverlay;
