import React from 'react';
import { motion } from 'motion/react';
import { useContent } from '../contexts/ContentContext';

const Forewords = () => {
  const { data } = useContent();
  const forewords = data.forewords;

  if (!forewords) return null;

  return (
    <section id="forewords" className="py-24 relative overflow-hidden bg-navy-900 text-paper-100">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider text-paper-200 drop-shadow-lg mb-4">
            Kata Pengantar
          </h2>
          <h3 className="font-serif text-2xl md:text-3xl text-paper-400 font-bold uppercase tracking-widest drop-shadow-md">
            Dari Pimpinan Alumni
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-start">
          
          {/* Alumni Head */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-paper-400 transform -rotate-2 rounded-xl scale-105 opacity-20 transition-transform group-hover:rotate-0"></div>
            <div className="bg-paper-100 text-navy-900 p-6 md:p-8 rounded-xl shadow-2xl relative transform rotate-1 transition-transform group-hover:rotate-0">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-6">
                <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-lg overflow-hidden border-4 border-white shadow-md transform -rotate-3 bg-paper-300">
                  <img 
                    src={forewords.alumniHead.photoUrl || undefined} 
                    alt={forewords.alumniHead.name} 
                    className="w-full h-full object-cover grayscale contrast-125 sepia-[.3]"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h4 className="font-serif font-bold text-xl uppercase mb-1">{forewords.alumniHead.title}</h4>
                  <h5 className="font-serif text-3xl font-black tracking-wider text-navy-800">{forewords.alumniHead.name}</h5>
                </div>
              </div>
              <div className="prose prose-navy max-w-none text-navy-800 font-medium leading-relaxed">
                <p className="whitespace-pre-line text-lg italic">"{forewords.alumniHead.message}"</p>
              </div>
            </div>
          </motion.div>

          {/* Committee Head */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative group md:mt-16"
          >
            <div className="absolute inset-0 bg-paper-400 transform rotate-2 rounded-xl scale-105 opacity-20 transition-transform group-hover:rotate-0"></div>
            <div className="bg-paper-100 text-navy-900 p-6 md:p-8 rounded-xl shadow-2xl relative transform -rotate-1 transition-transform group-hover:rotate-0">
              <div className="flex flex-col md:flex-row gap-6 items-center md:items-start mb-6">
                <div className="text-center md:text-right order-2 md:order-1 flex-grow">
                  <h4 className="font-serif font-bold text-xl uppercase mb-1">{forewords.committeeHead.title}</h4>
                  <h5 className="font-serif text-3xl font-black tracking-wider text-navy-800">{forewords.committeeHead.name}</h5>
                </div>
                <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 rounded-lg overflow-hidden border-4 border-white shadow-md transform rotate-3 bg-paper-300 order-1 md:order-2">
                  <img 
                    src={forewords.committeeHead.photoUrl || undefined} 
                    alt={forewords.committeeHead.name} 
                    className="w-full h-full object-cover grayscale contrast-125 sepia-[.3]"
                  />
                </div>
              </div>
              <div className="prose prose-navy max-w-none text-navy-800 font-medium leading-relaxed">
                <p className="whitespace-pre-line text-lg italic">"{forewords.committeeHead.message}"</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Forewords;
