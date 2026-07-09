import React from 'react';
import { motion } from 'motion/react';
import { Users, BookOpen, Heart } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const About = () => {
  const { data } = useContent();

  return (
    <section id="about" className="py-24 bg-paper-500 relative">
      {/* Torn paper edge effect at top */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-navy-700" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 10%, 98% 30%, 95% 10%, 93% 50%, 90% 20%, 88% 60%, 85% 10%, 82% 40%, 80% 15%, 78% 70%, 75% 20%, 72% 50%, 70% 10%, 68% 40%, 65% 15%, 62% 60%, 60% 20%, 58% 50%, 55% 10%, 52% 40%, 50% 15%, 48% 70%, 45% 20%, 42% 50%, 40% 10%, 38% 40%, 35% 15%, 32% 60%, 30% 20%, 28% 50%, 25% 10%, 22% 40%, 20% 15%, 18% 70%, 15% 20%, 12% 50%, 10% 10%, 8% 40%, 5% 15%, 2% 60%, 0 20%)' }}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center relative">
          
          {/* Background decorative tapes */}
          <div className="tape -top-10 left-10 w-24 hidden lg:block rotate-12"></div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-paper-200 p-8 md:p-12 shadow-md border border-paper-400 relative"
          >
            <div className="tape -top-4 right-10 w-20 -rotate-3"></div>
            
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-navy-900 mb-6 leading-tight">
              25 Tahun Berlalu, <br />
              <span className="font-marker text-navy-600 text-3xl md:text-4xl block mt-4 rotate-[-2deg]">Kenangan Tetap Baru.</span>
            </h2>
            <p className="text-lg text-navy-800 mb-6 leading-relaxed font-serif whitespace-pre-wrap">
              {data?.aboutText1 || "Telah 25 tahun kita meninggalkan gerbang SMAN 1 Padang. Membawa mimpi masing-masing, menempuh jalan yang berbeda. Kini saatnya kita kembali sejenak, memutar waktu, dan mengenang kembali masa-masa putih abu-abu yang penuh cerita."}
            </p>
            <p className="text-lg text-navy-800 mb-10 leading-relaxed font-serif whitespace-pre-wrap">
              {data?.aboutText2 || "Reuni Perak ini bukan sekadar ajang berkumpul, melainkan momen untuk merajut kembali tali persaudaraan, berbagi cerita perjalanan hidup, dan mensyukuri pencapaian kita bersama."}
            </p>

            <div className="grid sm:grid-cols-2 gap-8 mt-12 border-t border-paper-400 pt-8 border-dashed">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 bg-navy-800 flex items-center justify-center rounded-sm shadow-sm transform -rotate-3">
                  <Users className="w-6 h-6 text-paper-200" />
                </div>
                <h3 className="font-serif font-bold text-navy-900 text-xl">Silaturahmi</h3>
                <p className="text-sm text-navy-700 leading-relaxed">Menyambung kembali komunikasi yang sempat terputus oleh jarak.</p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 bg-navy-800 flex items-center justify-center rounded-sm shadow-sm transform rotate-3">
                  <Heart className="w-6 h-6 text-paper-200" />
                </div>
                <h3 className="font-serif font-bold text-navy-900 text-xl">Nostalgia</h3>
                <p className="text-sm text-navy-700 leading-relaxed">Mengenang canda tawa di kelas, dan cerita tak terlupakan.</p>
              </div>
            </div>
            
            {/* Hand-drawn arrow */}
            <svg className="absolute -bottom-10 -right-10 w-24 h-24 text-navy-600 hidden lg:block transform rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="polaroid rotate-3 mx-auto max-w-md">
              <div className="tape -top-4 left-1/2 -translate-x-1/2 w-24"></div>
              <div className="relative aspect-[4/5] bg-navy-100 mb-4 overflow-hidden border border-paper-300">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Soto_ayam.JPG/1280px-Soto_ayam.JPG" 
                  alt="Kantin Sekolah" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover sepia-[.4] contrast-110 grayscale-[30%]"
                />
              </div>
              <p className="font-marker text-navy-900 text-center text-xl mt-4">Kantin Sekolah 🏫</p>
            </div>
            
            <div className="absolute -bottom-10 -left-10 polaroid -rotate-6 w-48 hidden md:block">
              <div className="tape -top-3 left-4 w-16"></div>
              <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b4/SMA_Labschool_Basketball_Club.jpg" 
                  alt="Jam Kosong" 
                  referrerPolicy="no-referrer"
                  className="w-full h-32 object-cover sepia-[.2] contrast-125"
                />
              <p className="font-marker text-navy-900 text-center text-sm mt-3">Jam Kosong!</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
