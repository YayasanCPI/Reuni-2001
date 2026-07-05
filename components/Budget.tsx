import React from 'react';
import { motion } from 'motion/react';
import { useContent } from '../contexts/ContentContext';

const Budget = () => {
  const { data } = useContent();
  const budgetItems = data?.budgetItems || [];

  return (
    <section id="budget" className="py-24 bg-paper-400 relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          <h2 className="text-4xl md:text-5xl font-marker text-navy-900 mb-6">Rencana Anggaran & Pendanaan</h2>
          <p className="text-lg text-navy-800 font-serif">
            Transparansi anggaran untuk mensukseskan acara kita bersama.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-paper-100 border-2 border-navy-900 shadow-[8px_8px_0px_#1e293b] overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left font-serif border-collapse">
              <thead>
                <tr className="bg-navy-900 text-paper-100">
                  <th className="p-4 font-bold border-r border-navy-700">Kategori Pengeluaran</th>
                  <th className="p-4 font-bold border-r border-navy-700">Estimasi Biaya (Total Max)</th>
                  <th className="p-4 font-bold">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {budgetItems.map((item, index) => (
                  <tr key={index} className={`border-b border-navy-200 ${index % 2 === 0 ? 'bg-paper-200' : 'bg-paper-100'}`}>
                    <td className="p-4 text-navy-900 font-bold">{item.category}</td>
                    <td className="p-4 text-navy-800 font-mono font-medium">{item.amount}</td>
                    <td className="p-4 text-navy-700 text-sm">{item.details}</td>
                  </tr>
                ))}
                <tr className="bg-navy-800 text-paper-100 font-bold text-lg">
                  <td className="p-4 border-r border-navy-700">Total Anggaran</td>
                  <td className="p-4 border-r border-navy-700 font-mono">Rp 100,000,000,-</td>
                  <td className="p-4 text-sm font-normal text-paper-300">(Maksimal)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-paper-200 p-6 border-l-4 border-navy-900 shadow-sm"
        >
          <h3 className="text-xl font-bold font-serif text-navy-900 mb-3">Sumber Pendanaan</h3>
          <p className="text-navy-800 font-serif leading-relaxed">
            Total anggaran adalah 100 juta maksimal yang akan dibagi ke 8 kelas (estimasi iuran per kelas +/- 12.5 juta). Panitia menjamin pengelolaan dana berjalan transparan dan amanah. Kami juga membuka peluang donasi alumni dan sponsorship untuk menutupi kekurangan.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Budget;
