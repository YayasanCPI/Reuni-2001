import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Foreword {
  title: string;
  name: string;
  photoUrl: string;
  message: string;
}

export interface LandingPageData {
  heroTitle: string;
  heroSubtitle: string;
  eventDate: string;
  eventLocation: string;
  aboutText1: string;
  aboutText2: string;
  contributionAmount: string;
  contacts: { name: string; phone: string }[];
  bankAccounts: { bank: string; number: string; name: string }[];
  schedule: { time: string; title: string; description: string; location: string }[];
  gallery: { src: string; caption: string; rot: string }[];
  backgroundMusicUrl?: string;
  forewords?: {
    alumniHead: Foreword;
    committeeHead: Foreword;
  };
}

const defaultData: LandingPageData = {
  heroTitle: "REUNI PERAK",
  heroSubtitle: "Nostalgia Putih Abu-Abu",
  eventDate: "Sabtu, 15 Ags '26",
  eventLocation: "Padang, Sumbar",
  aboutText1: "Telah 25 tahun kita meninggalkan gerbang SMAN 1 Padang. Membawa mimpi masing-masing, menempuh jalan yang berbeda. Kini saatnya kita kembali sejenak, memutar waktu, dan mengenang kembali masa-masa putih abu-abu yang penuh cerita.",
  aboutText2: "Reuni Perak ini bukan sekadar ajang berkumpul, melainkan momen untuk merajut kembali tali persaudaraan, berbagi cerita perjalanan hidup, dan mensyukuri pencapaian kita bersama.",
  contributionAmount: "Rp 500.000",
  contacts: [
    { name: "Budi Santoso", phone: "0812-3456-7890" },
    { name: "Siti Aminah", phone: "0811-9876-5432" }
  ],
  bankAccounts: [
    { bank: "BCA", number: "1234567890", name: "Reuni SMANSA" },
    { bank: "Mandiri", number: "0987654321", name: "Reuni SMANSA" }
  ],
  schedule: [
    { time: "08:00 - 10:00", title: "Napak Tilas SMANSA", description: "Kumpul bersama di SMAN 1 Padang, mengunjungi kelas, dan bernostalgia.", location: "SMAN 1 Padang" },
    { time: "18:00 - 19:00", title: "Registrasi Ulang", description: "Registrasi dan foto bersama di photobooth.", location: "Grand Zuri Hotel" },
    { time: "19:00 - Selesai", title: "Gala Dinner", description: "Makan malam bersama, hiburan, dan doorprize.", location: "Grand Zuri Hotel" }
  ],
  gallery: [
    { src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=2070&auto=format&fit=crop", caption: "Kelas 1", rot: "-rotate-2" },
    { src: "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?q=80&w=2070&auto=format&fit=crop", caption: "Lulus!", rot: "rotate-3" }
  ],
  backgroundMusicUrl: "https://youtu.be/Ch3l_Q9PxpQ",
  forewords: {
    alumniHead: {
      title: "Dari Ketua Umum Alumni 2001",
      name: "Abe",
      photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=2070",
      message: "Kawan-kawan Alumni SMANSA 2001 yang saya cintai, Selamat datang di lembaran perjalanan nostalgia 25 tahun kita. Reuni Perak ini bukan sekadar pertemuan, tapi panggilan pulang. Proposal ini adalah cetak biru untuk perayaan kita. Mari kita jadikan momen ini sebagai jembatan silaturahmi dan bakti pada almamater. Saya titipkan harapan besar agar kita semua berkolaborasi menyukseskan acara ini. Sampai jumpa di 10 Oktober 2026!"
    },
    committeeHead: {
      title: "Dari Ketua Pelaksana",
      name: "Rendy",
      photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1974",
      message: "Salam Persahabatan! Sebuah kehormatan bagi saya memimpin kepanitiaan ini. Proposal ini adalah hasil kerja keras tim untuk mewujudkan visi 'Nostalgia Putih Abu-Abu' kita. Kami telah merancang alur acara premium dan khidmat. Dukungan Anda adalah kunci keberhasilan ini. Mari kita buat momen 25 tahun ini tak terlupakan. Sampai jumpa!"
    }
  }
};

interface ContentContextType {
  data: LandingPageData;
  updateData: (newData: LandingPageData) => Promise<void>;
  loading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<LandingPageData>(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'landingPage'), (docSnap) => {
      if (docSnap.exists()) {
        setData({ ...defaultData, ...docSnap.data() } as LandingPageData);
      } else {
        // Just use default data in memory if not exists
        setData(defaultData);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const updateData = async (newData: LandingPageData) => {
    await setDoc(doc(db, 'settings', 'landingPage'), newData);
  };

  return (
    <ContentContext.Provider value={{ data, updateData, loading }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within ContentProvider');
  return context;
};
