import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Landmark, Phone, User, Check, Copy } from 'lucide-react';

const PaymentCard = () => {
  const [copied, setCopied] = useState(false);
  const accountNumber = "10020210135036";
  const formattedNumber = "1002.0210.13503-6";

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 my-8 w-full">
      {/* Title */}
      <div className="flex items-center justify-center gap-4 mb-2">
        <div className="w-6 h-1 bg-navy-900 rotate-12 rounded"></div>
        <div className="w-8 h-1 bg-navy-900 -rotate-6 rounded"></div>
        <h3 className="bg-yellow-500 text-navy-900 font-marker text-xl md:text-2xl px-6 py-2 transform -rotate-1 shadow-[4px_4px_0px_#142030] border-2 border-navy-900">
          SALURKAN DONASI ANDA KE :
        </h3>
        <div className="w-8 h-1 bg-navy-900 rotate-6 rounded"></div>
        <div className="w-6 h-1 bg-navy-900 -rotate-12 rounded"></div>
      </div>

      {/* Main Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row w-full border-2 border-navy-900 rounded-2xl overflow-hidden shadow-[8px_8px_0px_#142030] bg-paper-100"
      >
        {/* Left Side (Dark) */}
        <div className="bg-navy-900 text-white p-6 md:w-1/3 flex flex-col justify-center items-center md:items-start space-y-6">
          <div className="flex items-center gap-3">
            <Landmark className="w-10 h-10 text-blue-400" />
            <span className="font-sans text-2xl font-bold tracking-wider">Bank <span className="font-serif">Nagari</span></span>
          </div>
          <div className="w-full h-px border-t border-dashed border-navy-600"></div>
          <div className="flex items-start gap-3">
            <Landmark className="w-8 h-8 text-yellow-500 shrink-0" />
            <div className="font-sans font-bold text-sm tracking-widest text-paper-200">
              <p>BANK NAGARI</p>
              <p>CABANG UTAMA</p>
              <p>PADANG</p>
            </div>
          </div>
        </div>

        {/* Right Side (Light) */}
        <div className="p-6 md:p-8 md:w-2/3 flex flex-col items-center justify-center text-center space-y-4 relative">
          <div className="absolute top-4 left-6 right-6 border-t-2 border-dashed border-paper-400"></div>
          
          <div className="space-y-1">
            <p className="font-bold font-sans tracking-widest text-navy-600 text-sm md:text-base">REKENING ATAS NAMA</p>
            <h4 className="font-bold font-sans text-xl md:text-3xl text-navy-900 leading-tight">
              ALUMNI SMAN 1 PADANG<br/>AKT 2001
            </h4>
          </div>

          <div className="space-y-2 mt-4 w-full flex flex-col items-center">
            <p className="font-bold font-sans tracking-widest text-yellow-600 text-sm md:text-base">NO. REKENING</p>
            <button 
              onClick={handleCopy}
              className="group relative flex items-center justify-center gap-3 bg-navy-900 hover:bg-navy-800 text-white rounded-full px-6 md:px-10 py-3 md:py-4 transition-all active:scale-95 border-2 border-navy-900 shadow-[4px_4px_0px_#142030]"
              title="Klik untuk menyalin"
            >
              <span className="font-bold font-sans text-2xl md:text-4xl tracking-wider">{formattedNumber}</span>
              {copied ? <Check className="w-6 h-6 text-green-400" /> : <Copy className="w-6 h-6 text-paper-300 opacity-50 group-hover:opacity-100 transition-opacity" />}
              
              {/* Tooltip */}
              {copied && (
                <span className="absolute -top-10 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded shadow">
                  Tersalin!
                </span>
              )}
            </button>
            <p className="text-xs text-navy-600 font-serif italic mt-2">Klik nomor rekening untuk menyalin</p>
          </div>
        </div>
      </motion.div>

      {/* Confirmation Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="flex flex-col md:flex-row w-full gap-6 mt-8"
      >
        {/* Main Info */}
        <div className="flex-1 bg-paper-200 p-6 md:p-8 border-2 border-navy-900 shadow-[6px_6px_0px_#142030] relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <Phone className="w-40 h-40 text-navy-900" />
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-navy-900 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 text-yellow-500" />
            </div>
            <h4 className="bg-yellow-500 text-navy-900 font-sans font-black tracking-wide text-lg md:text-xl px-4 py-1 uppercase rounded-sm border-2 border-navy-900 transform -rotate-1">
              Setelah Melakukan Donasi
            </h4>
          </div>
          
          <p className="font-serif text-navy-800 text-lg mb-6 max-w-lg leading-relaxed">
            Mohon konfirmasi kepada Bendahara kami agar donasi Anda dapat kami catat.
          </p>

          <div className="flex items-center gap-4 border-t border-dashed border-navy-900 pt-6">
            <div className="w-14 h-14 rounded-full bg-navy-900 flex items-center justify-center shrink-0 border-2 border-navy-900">
              <User className="w-8 h-8 text-paper-200" />
            </div>
            <div>
              <p className="font-sans font-bold text-navy-900 text-lg md:text-xl">YULIE <span className="text-navy-600 text-sm md:text-base font-serif italic">(BENDAHARA)</span></p>
              <a href="https://wa.me/6281363373683" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group cursor-pointer mt-1">
                <span className="bg-green-500 text-white rounded-full p-1 border border-navy-900 group-hover:scale-110 transition-transform">
                  <Phone className="w-4 h-4" />
                </span>
                <span className="font-sans font-black text-navy-900 text-xl md:text-2xl tracking-wider group-hover:text-green-600 transition-colors">0813-6337-3683</span>
              </a>
            </div>
          </div>
        </div>

        {/* Sticky Note */}
        <div className="md:w-64 shrink-0 bg-yellow-100 p-6 shadow-[4px_4px_10px_rgba(0,0,0,0.1)] relative transform rotate-3">
          <div className="tape -top-3 left-1/2 -translate-x-1/2 w-16"></div>
          <p className="font-marker text-navy-900 text-lg text-center leading-relaxed mt-4">
            Terima kasih atas dukungan dan partisipasi Anda! 
            <br/><br/>
            ❤️
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentCard;
