import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { toPng } from 'html-to-image';
import { Download, Loader2, Camera } from 'lucide-react';

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
        skipFonts: true,
        fontEmbedCSS: '',
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
      <div className="w-[300px] sm:w-[320px] relative perspective-1000 group">
        {/* Lanyard/Clip mockup (top) */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-8 h-14 z-20 flex flex-col items-center pointer-events-none">
          <div className="w-6 h-10 border-4 border-gray-300 rounded-full bg-transparent shadow-sm"></div>
          <div className="w-3 h-6 bg-gray-400 rounded-b-sm -mt-1 shadow-md"></div>
        </div>

        {/* Card Holder (Plastic Sleeve effect) */}
        <motion.div 
          ref={nametagRef}
          className="w-full bg-white/20 backdrop-blur-[2px] rounded-xl p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/50 relative overflow-hidden transform transition-transform duration-500 group-hover:rotate-y-6 bg-white"
        >
          {/* Reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-50 z-30 pointer-events-none rounded-xl"></div>
          
          {/* Actual Paper Card */}
          <div className="w-full relative overflow-hidden rounded-lg border border-gray-100 z-10 bg-white shadow-inner aspect-[638/1008]">
            <img 
              src="https://i.ibb.co.com/pjV6R85T/Nama-Lengkap-Alumni-3.png" 
              alt="Background" 
              className="absolute inset-0 w-full h-full object-cover"
              crossOrigin="anonymous"
            />
            
            {/* Absolute positioning container for content */}
            <div className="absolute inset-0 flex flex-col items-center">
              
              {/* Photo Area - Positioned to match the circle in the image */}
              <div className="absolute top-[43%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[52%] aspect-square rounded-full flex items-center justify-center overflow-hidden z-20">
                {photo ? (
                  <img src={photo} alt={name} className="w-full h-full object-cover" crossOrigin="anonymous" />
                ) : (
                  <div className="w-full h-full bg-gray-100/80 flex flex-col items-center justify-center text-gray-500">
                    <Camera className="w-8 h-8 mb-1 opacity-50" />
                    <span className="text-[10px] font-bold text-center leading-tight opacity-70">FOTO<br/>ALUMNI</span>
                  </div>
                )}
              </div>

              {/* Name Area */}
              <div className="absolute top-[68%] w-full px-8 text-center z-20 flex flex-col gap-1">
                <h2 className="text-white font-black uppercase tracking-widest leading-tight text-2xl sm:text-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  {name || 'NAMA LENGKAP ALUMNI'}
                </h2>
                <h3 className="text-white font-bold uppercase tracking-widest text-lg sm:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mt-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  {className || 'JURUSAN/KELAS'}
                </h3>
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
