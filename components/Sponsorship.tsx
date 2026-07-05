import React from 'react';
import { motion } from 'motion/react';
import { FileText, Phone } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const Sponsorship = () => {
  const { data } = useContent();
  const packages = data?.sponsorshipPackages || [];

  return (
    <section id="sponsorship" className="py-24 bg-paper-400 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 relative"
        >
          <div className="tape -top-6 left-1/2 -translate-x-1/2 w-32 rotate-2"></div>
          <h2 className="text-4xl md:text-5xl font-marker text-navy-900 mb-6 mt-4">Peluang Kerja Sama</h2>
          <p className="text-lg text-navy-800 font-serif max-w-3xl mx-auto leading-relaxed">
            Halaman ini adalah ajakan bagi perusahaan atau donatur luar untuk mendukung perayaan 25 tahun ini. Kami menawarkan paket sponsorship yang tersedia bagi perusahaan yang akan menyumbang berupa logo perusahaan di flyer / banner / backdrop.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-navy-900 text-paper-200 p-8 shadow-[8px_8px_0px_#8c7d66] mb-16 transform -rotate-1 relative"
        >
          <h3 className="text-2xl font-bold font-serif mb-4 text-paper-100">Keuntungan Sponsor</h3>
          <p className="font-serif leading-relaxed mb-0">
            Branding visual logo perusahaan di Flyer Event, Banner, Backdrop, ID Card (Yearbook-style), dan penyebutan di video opening. Ini adalah kesempatan branding kepada 200-250 alumni profesional lintas industri.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`bg-paper-100 border-2 ${pkg.borderColor} shadow-[4px_4px_0px_#1e293b] flex flex-col transform transition-transform hover:-translate-y-2`}
            >
              <div className={`${pkg.color} p-6 text-center border-b-2 ${pkg.borderColor}`}>
                <h3 className="text-2xl font-serif font-bold uppercase tracking-wider mb-2">{pkg.title}</h3>
                <p className="font-marker text-xl opacity-90">{pkg.price}</p>
              </div>
              <div className="p-6 flex-grow">
                <ul className="space-y-4 font-serif text-sm">
                  {pkg.benefits.map((benefit, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="text-navy-500 font-bold">✓</span>
                      <span className="text-navy-900">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-paper-200 p-8 md:p-12 border-2 border-dashed border-navy-700 text-center max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-serif font-bold text-navy-900 mb-6">Tertarik Menjadi Sponsor?</h3>
          <p className="text-navy-800 font-serif mb-8">
            Hubungi panitia kami untuk berdiskusi lebih lanjut tentang peluang kerja sama ini. Proposal lengkap dapat diunduh melalui tombol di bawah.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
            {data?.contacts?.map((contact, idx) => (
              <div key={idx} className="flex items-center gap-2 text-navy-900 font-bold font-serif bg-paper-300 px-4 py-2 rounded-full border border-navy-300">
                <Phone className="w-4 h-4" />
                {contact.name}: {contact.phone}
              </div>
            )) || (
              <div className="flex items-center gap-2 text-navy-900 font-bold font-serif bg-paper-300 px-4 py-2 rounded-full border border-navy-300">
                <Phone className="w-4 h-4" />
                Budi: 0812-3456-7890
              </div>
            )}
          </div>

          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); alert('Link download proposal akan segera tersedia.'); }}
            className="inline-flex items-center gap-2 bg-navy-900 text-paper-200 px-8 py-4 font-serif font-bold hover:bg-navy-800 transition-colors shadow-[4px_4px_0px_#8c7d66]"
          >
            <FileText className="w-5 h-5" />
            Download PDF Proposal Sponsorship
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Sponsorship;
