import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'motion/react';
import { Send, Pin } from 'lucide-react';

const colors = [
  'bg-yellow-200',
  'bg-pink-200',
  'bg-blue-200',
  'bg-green-200',
  'bg-purple-200',
  'bg-orange-200'
];

const NostalgiaMessages = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !senderName.trim()) return;

    setIsSubmitting(true);
    try {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomRotation = Math.floor(Math.random() * 10) - 5; // -5 to 5 degrees

      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        sender: senderName,
        color: randomColor,
        rotation: randomRotation,
        createdAt: serverTimestamp()
      });

      setNewMessage('');
      setSenderName('');
    } catch (error) {
      console.error("Error adding message: ", error);
      alert("Gagal mengirim pesan nostalgia :(");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="nostalgia" className="py-24 bg-[url('https://www.transparenttextures.com/patterns/cork-board.png')] bg-[#8c6b4a] relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-marker text-white mb-4 drop-shadow-lg transform -rotate-2 inline-block bg-navy-900/80 px-6 py-2 border-2 border-dashed border-white">Mading Nostalgia</h2>
          <p className="text-xl text-paper-100 font-serif max-w-2xl mx-auto bg-black/40 p-4 rounded-lg backdrop-blur-sm shadow-inner">
            Coret-coret mading lagi yuk! Tulis kenangan paling memalukan, lucu, atau ngangenin pas jaman sekolah dulu.
          </p>
        </div>

        {/* Form to add message */}
        <motion.form 
          onSubmit={handleSubmit}
          className="max-w-md mx-auto mb-16 bg-paper-100 p-6 shadow-[8px_8px_0px_rgba(0,0,0,0.5)] border-4 border-navy-900 transform rotate-1"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="tape -top-4 left-1/2 -translate-x-1/2 w-24"></div>
          
          <div className="space-y-4 font-serif">
            <div>
              <label className="block text-sm font-bold text-navy-800 mb-1">Nama / Panggilan Zaman Dulu</label>
              <input 
                type="text" 
                value={senderName}
                onChange={e => setSenderName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white border-2 border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500"
                placeholder="Cth: Budi 'Si Kancil'"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-navy-800 mb-1">Pesan Nostalgia</label>
              <textarea 
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                required
                rows={3}
                className="w-full px-3 py-2 bg-white border-2 border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500 resize-none"
                placeholder="Inget gak waktu kita ketahuan bolos terus dihukum cabut rumput..."
              />
            </div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-3 bg-navy-900 text-white font-marker tracking-wider text-xl hover:bg-navy-800 transition-colors flex justify-center items-center gap-2 disabled:opacity-50 border-2 border-transparent hover:border-white shadow-[4px_4px_0px_rgba(0,0,0,0.3)]"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? 'Nempel...' : 'Tempel di Mading!'}
            </button>
          </div>
        </motion.form>

        {/* Messages Board */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-start">
          {messages.map((msg, idx) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 10) * 0.1 }}
              className={`p-5 shadow-[4px_4px_10px_rgba(0,0,0,0.4)] relative ${msg.color || 'bg-yellow-200'}`}
              style={{ transform: `rotate(${msg.rotation || 0}deg)` }}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-red-600 drop-shadow-md">
                <Pin className="w-8 h-8 fill-red-600" />
              </div>
              
              <div className="mt-4 font-marker text-navy-900 text-lg leading-snug">
                "{msg.text}"
              </div>
              <div className="mt-4 font-serif text-sm font-bold text-navy-800 text-right border-t border-navy-900/20 pt-2">
                - {msg.sender}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NostalgiaMessages;
