import React from 'react';
import { motion } from 'motion/react';
import { useContent } from '../contexts/ContentContext';

const Schedule = () => {
  const { data } = useContent();
  const scheduleData = data?.schedule || [];

  return (
    <section id="schedule" className="py-24 bg-paper-500 relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          <div className="tape -top-6 left-1/2 -translate-x-1/2 w-40 rotate-2"></div>
          <h2 className="text-4xl md:text-5xl font-marker text-navy-900 mb-6 mt-4">Jadwal Reuni</h2>
          <p className="text-lg text-navy-800 font-serif">
            Agenda lengkap kegiatan Reuni Perak Angkatan 2001, {data?.eventDate || "Sabtu, 15 Agustus 2026"}.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line - stitched look */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-navy-700 transform md:-translate-x-1/2 opacity-50"></div>
          
          <div className="space-y-12">
            {scheduleData.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot as a button/pin */}
                <div className="absolute left-4 md:left-1/2 w-6 h-6 bg-navy-800 rounded-full transform -translate-x-1/2 mt-4 md:mt-0 md:top-6 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.4)] z-10 border-2 border-paper-200">
                  <div className="w-2 h-2 bg-paper-200 rounded-full mx-auto mt-[6px]"></div>
                </div>
                
                <div className={`md:w-1/2 pl-12 md:pl-0 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}>
                  <div className={`bg-paper-200 p-6 shadow-md border border-paper-400 relative transform transition-transform hover:scale-105 ${index % 2 === 0 ? 'rotate-[-1deg]' : 'rotate-[1deg]'}`}>
                    <div className="tape -top-3 left-1/2 -translate-x-1/2 w-16 opacity-70"></div>
                    
                    <span className="inline-block font-marker text-navy-600 text-lg mb-3">
                      {item.time}
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-navy-900 mb-2">{item.title}</h3>
                    <p className="text-navy-800 mb-4 text-sm md:text-base leading-relaxed font-serif">
                      {item.description}
                    </p>
                    <div className={`flex items-center gap-2 text-sm text-navy-700 font-bold ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <span className="font-marker opacity-50">@</span>
                      {item.location}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
