import React from 'react';
import { motion } from 'motion/react';
import { useContent } from '../contexts/ContentContext';

const Timeline = () => {
  const { data } = useContent();
  const timelineItems = data?.timelineItems || [];

  return (
    <section id="timeline" className="py-24 bg-paper-500 relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          <div className="tape -top-6 left-1/2 -translate-x-1/2 w-40 -rotate-2"></div>
          <h2 className="text-4xl md:text-5xl font-marker text-navy-900 mb-6 mt-4">Linimasa Pelaksanaan</h2>
          <p className="text-lg text-navy-800 font-serif">
            Tahapan kerja panitia dari persiapan hingga hari H.
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-navy-300 transform md:-translate-x-1/2"></div>
          
          <div className="space-y-12">
            {timelineItems.map((item, index) => (
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
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-navy-900 rounded-full transform -translate-x-[14px] md:-translate-x-1/2 mt-4 md:mt-0 md:top-1/2 md:-translate-y-1/2 z-10 border-4 border-paper-500 flex items-center justify-center">
                  <div className="w-2 h-2 bg-paper-200 rounded-full"></div>
                </div>
                
                <div className={`md:w-1/2 pl-12 md:pl-0 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}>
                  <div className={`bg-paper-200 p-6 shadow-[4px_4px_0px_#142030] border-2 border-navy-900 relative transform transition-transform hover:-translate-y-1 ${index % 2 === 0 ? 'rotate-[-1deg]' : 'rotate-[1deg]'}`}>
                    <span className="inline-block bg-navy-800 text-paper-200 font-marker text-sm px-3 py-1 mb-3 rounded-sm shadow-sm">
                      {item.time}
                    </span>
                    <h3 className="text-xl font-serif font-bold text-navy-900 mb-2">{item.phase}</h3>
                    <p className="text-navy-800 text-sm md:text-base leading-relaxed font-serif">
                      {item.target}
                    </p>
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

export default Timeline;
