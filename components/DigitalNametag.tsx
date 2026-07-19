import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { toPng } from 'html-to-image';
import { Download, Loader2 } from 'lucide-react';

interface Props {
  name: string;
  className: string;
  photo?: string;
}

const DigitalNametag: React.FC<Props> = ({ name, className, photo }) => {
  const nametagRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!nametagRef.current) return;
    try {
      setIsDownloading(true);
      
      // We temporarily remove the hover rotation class during capture to avoid 3D distortion
      const originalTransform = nametagRef.current.style.transform;
      nametagRef.current.style.transform = 'none';

      const dataUrl = await toPng(nametagRef.current, { 
        quality: 1.0,
        pixelRatio: 3, // High quality
        cacheBust: true,
      });

      nametagRef.current.style.transform = originalTransform;

      const link = document.createElement('a');
      link.download = `Nametag-${name.replace(/\s+/g, '-').toLowerCase() || 'peserta'}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-[300px] sm:w-[320px] aspect-[4/5] relative perspective-1000 group">
        {/* Lanyard/Clip mockup (top) */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-8 h-14 z-20 flex flex-col items-center pointer-events-none">
          <div className="w-6 h-10 border-4 border-gray-300 rounded-full bg-transparent shadow-sm"></div>
          <div className="w-3 h-6 bg-gray-400 rounded-b-sm -mt-1 shadow-md"></div>
        </div>

        {/* Card Holder (Plastic Sleeve effect) */}
        <motion.div 
          ref={nametagRef}
          className="w-full h-full bg-white/20 backdrop-blur-[2px] rounded-[32px] p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50 relative overflow-hidden transform transition-transform duration-500 group-hover:rotate-y-12 bg-white"
        >
          {/* Reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-50 z-30 pointer-events-none rounded-[30px]"></div>
          
          {/* Actual Paper Card */}
          <div className="w-full h-full bg-white rounded-[26px] relative overflow-hidden flex flex-col items-center justify-between p-5 border border-gray-100 z-10"
               style={{
                 backgroundImage: 'linear-gradient(#f0f0f0 1.5px, transparent 1.5px), linear-gradient(90deg, #f0f0f0 1.5px, transparent 1.5px)',
                 backgroundSize: '16px 16px',
                 backgroundPosition: 'center center'
               }}>
            
            {/* Header Logo */}
            <div className="w-full h-20 flex items-center justify-center mb-2 z-10">
              <img 
                src="https://storage.googleapis.com/aistudio-v2-dev-images/00f75c85-e6b2-4355-938d-b7849df1152c/20260718_231058_1_image.png" 
                alt="Logo" 
                className="h-full object-contain drop-shadow-sm"
              />
            </div>

            {/* Center Content */}
            <div className="relative flex-1 w-full flex flex-col items-center justify-center">
              {/* Splash Blob (CSS approximation) */}
              <div className="absolute m-auto w-[240px] h-[240px] z-0 opacity-90 scale-110 blur-[1px]"
                   style={{
                     background: 'radial-gradient(circle at 30% 30%, #ff007f, transparent 60%), radial-gradient(circle at 70% 30%, #ffaa00, transparent 60%), radial-gradient(circle at 30% 70%, #00ccff, transparent 60%), radial-gradient(circle at 70% 70%, #00ff88, transparent 60%)',
                     borderRadius: '45% 55% 60% 40% / 50% 40% 60% 50%',
                     animation: 'spin-slow 20s linear infinite',
                     mixBlendMode: 'multiply'
                   }}>
              </div>
              
              {/* Additional splashes */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-400 rounded-full mix-blend-multiply opacity-60 blur-md translate-x-4 -translate-y-4"></div>
              <div className="absolute bottom-4 left-0 w-32 h-32 bg-pink-500 rounded-full mix-blend-multiply opacity-60 blur-lg -translate-x-8"></div>
              <div className="absolute top-1/2 left-4 w-20 h-20 bg-orange-400 rounded-full mix-blend-multiply opacity-70 blur-md -translate-y-1/2"></div>

              {/* Optional Photo */}
              {photo && (
                <div className="relative z-10 w-24 h-24 mb-3 rounded-full border-[3px] border-white shadow-lg overflow-hidden bg-white">
                  <img src={photo} alt={name} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Name Plate */}
              <div className="relative z-10 bg-white rounded-2xl px-6 py-2 shadow-xl border border-gray-100 min-w-[85%] text-center max-w-[95%]">
                <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tighter break-words" style={{ fontFamily: 'Inter, system-ui, sans-serif', lineHeight: '1.1' }}>
                  {name ? name.split(' ').slice(0, 2).join('\n') : 'NAMA\nPESERTA'}
                </h2>
              </div>

              {/* Class Plate */}
              <div className="relative z-10 bg-rose-500 rounded-full px-6 py-1.5 text-white font-bold text-base mt-2 shadow-lg border-2 border-white uppercase tracking-wider">
                {className ? (className.includes('Kelas') ? className.replace('Kelas ', '') : className) : 'IPA/IPS'}
              </div>
            </div>

            {/* Bottom Stickers & Quote */}
            <div className="w-full mt-4 flex justify-between items-end z-10 relative">
              <div className="w-12 h-12 bg-white rounded-full flex flex-col items-center justify-center border-2 border-gray-800 shadow-sm rotate-12 -ml-2">
                <span className="text-[7px] font-bold leading-none">BAKED</span>
                <span className="text-[7px] font-bold leading-none">IN</span>
                <span className="text-xs font-black">TAI</span>
              </div>
              
              <p className="flex-1 text-center text-[10px] sm:text-xs font-serif font-bold text-gray-800 leading-tight px-2">
                "Kita semua kembali setara<br/>sebagai sahabat lama."
              </p>
              
              <div className="w-12 h-12 bg-[#ffcc00] rounded-full flex flex-col items-center justify-center border-2 border-gray-800 shadow-sm -rotate-12 -mr-2">
                 <div className="w-6 h-4 bg-orange-400 rounded-full mb-0.5"></div>
                 <span className="text-[6px] font-black leading-none tracking-tighter">FRESH</span>
                 <span className="text-[6px] font-black leading-none tracking-tighter">GOODS</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white px-6 py-3 rounded-full font-bold shadow-[4px_4px_0px_#142030] border-2 border-navy-900 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed z-30"
      >
        {isDownloading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Download className="w-5 h-5" />
        )}
        {isDownloading ? 'Menyimpan...' : 'Download Nametag'}
      </button>
    </div>
  );
};

export default DigitalNametag;
