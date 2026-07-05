import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-navy-900 text-paper-400 py-12 border-t-4 border-paper-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
          <a href="#home" className="text-2xl font-serif font-bold text-paper-200 mb-2 inline-block">
            SMANSA <span className="font-marker text-paper-500 text-lg -rotate-2 inline-block">2001</span>
          </a>
          <p className="text-sm font-serif italic text-paper-500">
            Nostalgia Putih Abu-abu. Reuni Perak Angkatan 2001.
          </p>
        </div>

        <div className="flex gap-6 text-sm font-serif">
          <a href="#home" className="hover:text-paper-100 transition-colors">Beranda</a>
          <a href="#about" className="hover:text-paper-100 transition-colors">Tentang</a>
          <a href="#schedule" className="hover:text-paper-100 transition-colors">Jadwal</a>
          <a href="#gallery" className="hover:text-paper-100 transition-colors">Galeri</a>
        </div>
        
        <div className="text-sm text-navy-500 font-serif">
          &copy; {new Date().getFullYear()} Panitia Reuni Perak SMAN 1 Padang 2001.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
