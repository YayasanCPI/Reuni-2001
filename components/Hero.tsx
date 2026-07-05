import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, ArrowRight, Clock } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const Hero = () => {
  const { data } = useContent();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Target date using ISO string from data or fallback to Oct 10, 2026
    const dateString = data?.eventDateISO || '2026-10-10T08:00:00+07:00';
    const targetDate = new Date(dateString).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden bg-navy-700 text-paper-200">
      {/* Decorative background texture like a book cover */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}>
      </div>
      
      {/* Vintage borders / corners */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-paper-500/30"></div>
      <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-paper-500/30"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-paper-500/30"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-paper-500/30"></div>

      <div className="relative max-w-6xl mx-auto w-full z-10 grid lg:grid-cols-2 gap-12 items-center mt-10">
        <div className="flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
            animate={{ opacity: 1, rotate: -2, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-paper-100 text-navy-900 border border-paper-400 shadow-sm font-marker text-sm transform -rotate-2"
          >
            <div className="tape -top-3 left-1/2 -translate-x-1/2 w-16 h-6"></div>
            Perayaan 25 Tahun Kelulusan
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-paper-100 via-paper-300 to-paper-500 leading-tight mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]"
          >
            {data?.heroTitle || 'REUNI PERAK'}
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          >
            {data?.heroSubtitle || 'Nostalgia Putih Abu-Abu'}
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-8"
          >
            <div className="flex items-center gap-3 text-navy-900 bg-paper-200 px-5 py-3 rounded-sm shadow-md border border-paper-400">
              <Calendar className="w-5 h-5 text-navy-600" />
              <span className="font-serif font-semibold">{data?.eventDate || 'Sabtu, 15 Ags \'26'}</span>
            </div>
            <div className="flex items-center gap-3 text-navy-900 bg-paper-200 px-5 py-3 rounded-sm shadow-md border border-paper-400">
              <MapPin className="w-5 h-5 text-navy-600" />
              <span className="font-serif font-semibold">{data?.eventLocation || 'Padang, Sumbar'}</span>
            </div>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex gap-4 mb-10"
          >
            {[
              { label: 'Hari', value: timeLeft.days },
              { label: 'Jam', value: timeLeft.hours },
              { label: 'Menit', value: timeLeft.minutes },
              { label: 'Detik', value: timeLeft.seconds }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center bg-navy-800 border-2 border-paper-400 p-3 shadow-md w-20 relative">
                <div className="absolute top-0 left-0 w-2 h-2 border-r border-b border-paper-400/50"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-l border-b border-paper-400/50"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-r border-t border-paper-400/50"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-l border-t border-paper-400/50"></div>
                <span className="font-mono text-2xl text-paper-200 font-bold tracking-wider">{item.value.toString().padStart(2, '0')}</span>
                <span className="text-[10px] uppercase tracking-widest text-paper-400 font-serif mt-1">{item.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a 
              href="#rsvp" 
              className="group inline-flex items-center gap-2 bg-paper-200 text-navy-900 px-8 py-4 font-serif font-bold text-lg hover:bg-paper-100 transition-all border border-navy-900 shadow-[4px_4px_0px_#1e3047] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_#1e3047]"
            >
              Daftar Sekarang
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Right side - Scrapbook collage */}
        <div className="relative h-[500px] hidden lg:block">
          <motion.div 
            initial={{ opacity: 0, rotate: 5, x: 20 }}
            animate={{ opacity: 1, rotate: 8, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-10 right-10 z-20 polaroid w-64 transform rotate-6"
          >
            <div className="tape -top-3 left-1/2 -translate-x-1/2"></div>
            <img src="https://images.unsplash.com/photo-1523580494112-071d16940a1c?q=80&w=2070&auto=format&fit=crop" alt="Kenangan SMA" className="w-full h-48 object-cover sepia-[.3] contrast-125" />
            <p className="font-marker text-navy-900 text-center mt-4 text-xl">1998 - 2001</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, rotate: -15, x: -20 }}
            animate={{ opacity: 1, rotate: -12, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute top-40 left-0 z-10 polaroid w-56 transform -rotate-12"
          >
            <div className="tape -top-3 left-4"></div>
            <img src="https://images.unsplash.com/photo-1511629091441-ee46146481b6?q=80&w=2070&auto=format&fit=crop" alt="Teman SMA" className="w-full h-40 object-cover grayscale-[0.8] contrast-125" />
            <p className="font-marker text-navy-900 text-center mt-3 text-lg">Cemara Class!</p>
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-20 right-40 z-30 opacity-70"
          >
            <div className="w-24 h-24 rounded-full border-[8px] border-paper-400 bg-transparent relative flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-4 border-paper-400"></div>
              <p className="absolute -bottom-8 font-marker text-paper-200 text-sm whitespace-nowrap -rotate-6">CD Mix '01</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
