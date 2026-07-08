import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#home' },
    { name: 'Tentang', href: '#about' },
    { name: 'Acara', href: '#event' },
    { name: 'Jadwal', href: '#schedule' },
    { name: 'Sponsor', href: '#sponsorship' },
    { name: 'Mading', href: '#nostalgia' },
    { name: 'Galeri', href: '#gallery' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-paper-200/90 backdrop-blur-md shadow-sm border-b border-paper-400 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        <a href="#home" className="text-2xl font-serif font-bold tracking-tight flex items-center gap-2">
          <img src="https://i.ibb.co.com/wZrZzHDN/Logosmansa-1-removebg-preview.png" alt="Logo Smansa" className="w-8 h-8 rounded-full object-cover border border-navy-900" />
          <span className="text-navy-900">SMANSA</span>
          <span className="text-navy-500 font-marker text-xl rotate-[-2deg] mt-1">2001</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-navy-600 ${
                isScrolled ? 'text-navy-800' : 'text-navy-900'
              }`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#rsvp" 
            className="bg-navy-700 text-paper-100 px-5 py-2.5 rounded shadow-md text-sm font-medium hover:bg-navy-800 transition-colors border border-navy-900"
          >
            RSVP Sekarang
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-navy-900"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-paper-200 px-6 py-6 md:hidden flex flex-col bg-[url('data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.06\'/%3E%3C/svg%3E')]"
          >
            <div className="flex justify-between items-center mb-12">
              <a href="#home" className="text-2xl font-serif font-bold text-navy-900 flex items-center gap-2">
                <img src="https://i.ibb.co.com/wZrZzHDN/Logosmansa-1-removebg-preview.png" alt="Logo Smansa" className="w-8 h-8 rounded-full object-cover border border-navy-900" />
                <span>SMANSA</span>
                <span className="font-marker text-navy-500 rotate-[-2deg] inline-block">2001</span>
              </a>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6 text-navy-900" />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 items-center text-lg">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-navy-800 font-medium font-serif"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#rsvp" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-6 bg-navy-700 text-paper-100 px-8 py-3 rounded shadow-md font-medium border border-navy-900"
              >
                RSVP Sekarang
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
