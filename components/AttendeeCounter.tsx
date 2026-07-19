import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion, useAnimation, useInView } from 'motion/react';
import { Users } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

const AttendeeCounter = () => {
  const [count, setCount] = useState(0);
  const { data } = useContent();
  const baseCount = data?.baseAttendeeCount || 0; // In case we want to add existing spreadsheet attendees
  const displayCount = count + baseCount;
  
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    // Listen to Firebase 'attendees' collection for confirmed attendees
    const q = query(
      collection(db, 'attendees'),
      where('attendance', '==', 'yes')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setCount(snapshot.size);
    }, (error) => {
      console.error("Error fetching attendees count:", error);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <div ref={ref} className="py-12 bg-navy-900 text-paper-200 border-y-4 border-paper-400 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.6, type: 'spring', bounce: 0.5 } }
          }}
          className="bg-paper-200 text-navy-900 rounded-full p-6 inline-block mb-6 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          <Users className="w-12 h-12" />
        </motion.div>
        
        <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">Total Peserta Terkonfirmasi</h3>
        
        <div className="flex gap-4 justify-center items-center font-marker text-6xl md:text-8xl tracking-wider text-paper-100 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">
          {/* Animated counter representation */}
          <Counter value={displayCount} />
        </div>
        
        <p className="mt-6 text-paper-400 font-serif max-w-md mx-auto text-lg">
          Kawan-kawan kita sudah siap meramaikan Nostalgia Putih Abu-Abu! Jangan sampai kamu ketinggalan momen berharga ini.
        </p>
      </div>
    </div>
  );
};

// Simple animated counter component
const Counter = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value.toString(), 10);
    if (start === end) return;

    let totalDuration = 2000;
    let incrementTime = (totalDuration / end) * 2;
    
    // Cap increment time so it's not too slow for small numbers
    if (incrementTime > 100) incrementTime = 100;

    const timer = setInterval(() => {
      start += 1;
      setDisplayValue(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue}</span>;
};

export default AttendeeCounter;
