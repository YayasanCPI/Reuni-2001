import React from 'react';
import { motion } from 'motion/react';
import { useContent } from '../contexts/ContentContext';

const Schedule = () => {
  const { data } = useContent();
  const scheduleData = data?.detailedSchedule;

  if (!scheduleData) return null;

  return (
    <section id="schedule" className="py-24 bg-paper-500 relative">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          <div className="tape -top-6 left-1/2 -translate-x-1/2 w-40 rotate-2"></div>
          <h2 className="text-4xl md:text-5xl font-marker text-navy-900 mb-6 mt-4">Jadwal Acara</h2>
          <p className="text-lg text-navy-800 font-serif">
            Rangkaian kegiatan detail Reuni Perak Angkatan 2001
          </p>
        </motion.div>

        <div className="space-y-16">
          {/* Bagian 1: Pagi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-paper-200 p-8 shadow-[4px_4px_0px_#142030] border-2 border-navy-900 relative transform -rotate-1"
          >
            <div className="tape -top-4 left-4 w-24 -rotate-3"></div>
            <div className="mb-6 border-b-2 border-dashed border-navy-300 pb-4">
              <h3 className="text-2xl font-serif font-bold text-navy-900 uppercase">{scheduleData.pagi.title}</h3>
              <p className="text-navy-700 font-bold mt-2 font-serif">Lokasi: {scheduleData.pagi.location}</p>
              <p className="text-navy-700 font-bold font-serif">Waktu: {scheduleData.pagi.timeRange}</p>
            </div>
            <p className="text-navy-800 mb-6 font-serif">
              {scheduleData.pagi.description}
            </p>
            <div className="space-y-4 font-serif">
              {scheduleData.pagi.items.map((item, idx) => (
                <div key={idx} className="flex gap-4"><div className="w-32 shrink-0 font-bold text-navy-900">{item.time}</div><div className="text-navy-800">{item.description}</div></div>
              ))}
            </div>
          </motion.div>

          {/* Bagian 2: Sore */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-paper-200 p-8 shadow-[4px_4px_0px_#142030] border-2 border-navy-900 relative transform rotate-1"
          >
            <div className="tape -top-4 right-4 w-24 rotate-3"></div>
            <div className="mb-6 border-b-2 border-dashed border-navy-300 pb-4">
              <h3 className="text-2xl font-serif font-bold text-navy-900 uppercase">{scheduleData.sore.title}</h3>
              <p className="text-navy-700 font-bold mt-2 font-serif">Lokasi: {scheduleData.sore.location}</p>
              <p className="text-navy-700 font-bold font-serif">Waktu: {scheduleData.sore.timeRange}</p>
            </div>
            <p className="text-navy-800 mb-6 font-serif">
              {scheduleData.sore.description}
            </p>
            <div className="space-y-4 font-serif">
              {scheduleData.sore.items.map((item, idx) => (
                <div key={idx} className="flex gap-4"><div className="w-32 shrink-0 font-bold text-navy-900">{item.time}</div><div className="text-navy-800">{item.description}</div></div>
              ))}
            </div>
          </motion.div>

          {/* Bagian 3: Minggu */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-paper-200 p-8 shadow-[4px_4px_0px_#142030] border-2 border-navy-900 relative transform -rotate-1"
          >
            <div className="tape -top-4 left-1/2 -translate-x-1/2 w-24"></div>
            <div className="mb-6 border-b-2 border-dashed border-navy-300 pb-4">
              <h3 className="text-2xl font-serif font-bold text-navy-900 uppercase">{scheduleData.minggu.title}</h3>
              <p className="text-navy-700 font-bold mt-2 font-serif">Lokasi: {scheduleData.minggu.location}</p>
              <p className="text-navy-700 font-bold font-serif">Waktu: {scheduleData.minggu.timeRange}</p>
            </div>
            <p className="text-navy-800 mb-6 font-serif">
              {scheduleData.minggu.description}
            </p>
            <div className="space-y-4 font-serif">
              {scheduleData.minggu.items.map((item, idx) => (
                <div key={idx} className="flex gap-4"><div className="w-32 shrink-0 font-bold text-navy-900">{item.time}</div><div className="text-navy-800">{item.description}</div></div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;

