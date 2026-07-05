import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Clock, Ticket } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const EventDetails = () => {
  const { data } = useContent();

  return (
    <section id="event" className="py-24 bg-paper-400 relative border-y-2 border-dashed border-paper-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 relative"
        >
          <div className="tape -top-8 left-1/2 -translate-x-1/2 w-32"></div>
          <h2 className="text-4xl md:text-5xl font-marker text-navy-900 mb-6 mt-4">Detail Acara</h2>
          <p className="text-lg text-navy-800 font-serif font-medium">
            Persiapkan dirimu untuk rangkaian acara yang telah dirancang khusus untuk membawa kita kembali ke masa-masa indah berseragam putih abu-abu.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-paper-100 p-8 md:p-12 shadow-[4px_4px_0px_#142030] border-2 border-navy-900 relative transform -rotate-1"
          >
            <div className="tape -top-4 -left-4 w-20 rotate-45"></div>
            
            <div className="w-14 h-14 bg-navy-800 flex items-center justify-center mb-8 border-2 border-navy-900 transform rotate-3">
              <Calendar className="w-6 h-6 text-paper-200" />
            </div>
            <h3 className="text-3xl font-serif font-bold text-navy-900 mb-2">Puncak Reuni</h3>
            <p className="text-navy-600 mb-8 font-serif italic">Malam keakraban dan gala dinner bersama seluruh angkatan.</p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 pb-4 border-b border-paper-300 border-dashed">
                <Clock className="w-6 h-6 text-navy-700 mt-1 shrink-0" />
                <div>
                  <p className="font-bold font-serif text-navy-900 text-lg">{data?.eventDate || 'Sabtu, 15 Agustus 2026'}</p>
                  <p className="text-navy-700 font-marker text-sm mt-1">18:00 - Selesai WIB</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-navy-700 mt-1 shrink-0" />
                <div>
                  <p className="font-bold font-serif text-navy-900 text-lg">{data?.eventLocation || 'Grand Zuri Hotel, Padang'}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-navy-800 text-paper-200 p-8 md:p-12 shadow-[4px_4px_0px_#e8dcc4] border-2 border-paper-500 relative transform rotate-1"
          >
            <div className="tape -top-4 right-10 w-24 -rotate-6"></div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-paper-200 flex items-center justify-center mb-8 border-2 border-paper-500 transform -rotate-3">
                <Ticket className="w-6 h-6 text-navy-900" />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-2 text-white">Kontribusi</h3>
              <p className="text-paper-400 mb-8 font-serif">Dana kontribusi digunakan untuk menutupi biaya tempat, konsumsi, suvenir, dan donasi untuk sekolah/guru.</p>
              
              <div className="mb-10 p-4 border-2 border-paper-400 border-dashed text-center bg-navy-900/50">
                <span className="text-4xl font-marker text-paper-100">{data?.contributionAmount || 'Rp 500.000'}</span>
                <span className="text-paper-400 font-serif italic"> / orang</span>
              </div>

              <ul className="space-y-4 mb-10 text-paper-300 font-serif">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-paper-400 rotate-45" /> Gala Dinner
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-paper-400 rotate-45" /> Suvenir Reuni Perak
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-paper-400 rotate-45" /> Donasi Guru Purna Bakti
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-paper-400 rotate-45" /> Hiburan & Doorprize
                </li>
              </ul>

              <a 
                href="#rsvp" 
                className="block w-full text-center bg-paper-200 text-navy-900 font-bold font-serif py-4 hover:bg-paper-100 transition-colors border-2 border-navy-900 shadow-[2px_2px_0px_#e8dcc4]"
              >
                Konfirmasi Kehadiran
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
