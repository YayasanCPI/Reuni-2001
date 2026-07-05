import React from 'react';
import { motion } from 'motion/react';
import { useContent } from '../contexts/ContentContext';

const Gallery = () => {
  const { data } = useContent();
  const galleryImages = data?.gallery || [];

  return (
    <section id="gallery" className="py-24 bg-navy-800 relative border-y-[12px] border-paper-300 border-double">
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E')]"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div className="max-w-2xl text-paper-200">
            <h2 className="text-4xl md:text-5xl font-marker mb-6 text-paper-100">Galeri Kenangan</h2>
            <p className="text-lg font-serif">
              Sekilas memori masa-masa indah berseragam. Setiap sudut sekolah menyimpan cerita yang tak terlupakan.
            </p>
          </div>
          <button className="text-paper-100 font-marker underline underline-offset-4 hover:text-paper-300 transition-colors text-xl transform -rotate-2">
            Lihat Semua Foto
          </button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
          {galleryImages.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`polaroid group transform transition-transform hover:scale-105 hover:z-20 cursor-pointer ${img.rot}`}
            >
              <div className="tape -top-3 left-1/2 -translate-x-1/2 w-16 opacity-80"></div>
              <div className="relative aspect-square overflow-hidden bg-navy-100 border border-paper-300">
                <img 
                  src={img.src} 
                  alt={img.caption} 
                  className="w-full h-full object-cover grayscale-[50%] sepia-[.3] contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:sepia-0"
                  loading="lazy"
                />
              </div>
              <p className="font-marker text-navy-900 text-center mt-4 text-lg md:text-xl">{img.caption}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
