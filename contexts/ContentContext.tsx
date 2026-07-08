import React, { createContext, useContext, useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface Foreword {
  title: string;
  name: string;
  photoUrl: string;
  message: string;
}

export interface DetailedScheduleItem {
  time: string;
  description: string;
}

export interface DetailedScheduleSection {
  title: string;
  location: string;
  timeRange: string;
  description: string;
  items: DetailedScheduleItem[];
}

export interface BudgetItem {
  category: string;
  amount: string;
  details: string;
}

export interface TimelineItem {
  phase: string;
  time: string;
  target: string;
}

export interface SponsorshipPackage {
  title: string;
  price: string;
  benefits: string[];
  color: string;
  borderColor: string;
}

export interface LandingPageData {
  heroTitle: string;
  heroSubtitle: string;
  eventDate: string;
  eventDateISO?: string;
  eventLocation: string;
  aboutText1: string;
  aboutText2: string;
  contributionAmount: string;
  contacts: { name: string; phone: string }[];
  bankAccounts: { bank: string; number: string; name: string }[];
  schedule: { time: string; title: string; description: string; location: string }[];
  detailedSchedule?: {
    pagi: DetailedScheduleSection;
    sore: DetailedScheduleSection;
    minggu: DetailedScheduleSection;
  };
  budgetItems?: BudgetItem[];
  timelineItems?: TimelineItem[];
  sponsorshipPackages?: SponsorshipPackage[];
  sponsorshipProposalUrl?: string;
  baseAttendeeCount?: number;
  gallery: { src: string; caption: string; rot: string }[];
  backgroundMusicUrl?: string;
  googleSheetWebAppUrl?: string;
  forewords?: {
    alumniHead: Foreword;
    committeeHead: Foreword;
  };
}

const defaultData: LandingPageData = {
  heroTitle: "REUNI PERAK",
  heroSubtitle: "Nostalgia Putih Abu-Abu",
  eventDate: "Sabtu, 10 Okt '26",
  eventDateISO: "2026-10-10T08:00:00+07:00",
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
  detailedSchedule: {
    pagi: {
      title: "Detail Kegiatan Pagi: Napak Tilas di Old SMANSA",
      location: "Gedung Lama SMANSA (Old Smansa) Sudirman",
      timeRange: "08:00 - 14:00",
      description: "Agenda pagi yang dikelola dengan pendekatan outing. Dengan bantuan tim EO, kami merancang rangkaian kegiatan yang fokus pada 'menjalin keakraban kembali'.",
      items: [
        { time: "08:00 - 09:00", description: "Registrasi Alumni & Pendaftaran Outing." },
        { time: "09:00 - 10:00", description: "Sesi Foto Angkatan & Kelas (Drone Formasi)." },
        { time: "10:00 - 12:00", description: "Outing Keakraban: Didukung EO, kami akan menggunakan area gedung lama untuk permainan tim bonding. Aktivitas ini dirancang untuk mencairkan batas-batas profesional dan mengembalikan semangat kebersamaan tahun 2001." },
        { time: "12:00 - 13:00", description: "Makan Siang Bersama (Kuliner Lokal Padang)." },
        { time: "13:00 - 14:00", description: "Napak Tilas Area Sekolah & Istirahat." }
      ]
    },
    sore: {
      title: "Detail Kegiatan Sore: Gala Dinner Puncak",
      location: "Venue TBD (Hotel Premium atau Aula Smansa Baru)",
      timeRange: "16:00 - 21:00",
      description: "Acara puncak reuni perak dimulai sore hari. Kami merancang Gala Dinner yang premium dan khidmat untuk merayakan 25 tahun.",
      items: [
        { time: "16:00 - 17:00", description: "Area Penyambutan: Buku Kenangan & Wall of Memories (Kolase Polaroid). Daftar lagu era 1998-2001 diputar." },
        { time: "17:00 - 17:30", description: "Video Opening: Penayangan video kompilasi foto sekolah, gedung, guru, dan event ekskul berdurasi 3-5 menit (profesional production)." },
        { time: "17:30 - 18:30", description: "Sesi Nostalgia MC (60 Menit): Interaksi MC yang lucu membahas profil guru paling galak hingga anak paling aktif." },
        { time: "18:30 - 19:30", description: "Talkshow Lintas Profesi: Bincang santai alumni lintas profesi bertema '25 Tahun Perjalanan Hidup Kita'." },
        { time: "19:30 - 20:30", description: "Sesi Tribute Guru & Refleksi: Penyerahan sumbangan fisik untuk sekolah dan cendera mata eksklusif untuk 30 orang guru. Sesi khidmat mendoakan rekan yang telah berpulang." },
        { time: "20:30 - 21:00", description: "Penutupan & Sesi Foto Akhir: Formasi lingkaran besar, menyanyikan lagu 'Kemesraan' dan 'Persahabatan Bagai Kepompong'." }
      ]
    },
    minggu: {
      title: "Detail Kegiatan Hari Minggu: Bebas & Kuliner Jadul",
      location: "Rute Lingkungan Sekolah (Old Smansa)",
      timeRange: "06:30 - 11:00",
      description: "Agenda penutup yang bersifat santai dan terbuka untuk alumni yang ingin ikut serta. Fokus kegiatan ini adalah kesehatan dan rekreasi kuliner.",
      items: [
        { time: "06:30 - 08:00", description: "Olahraga Pagi: Rute lari pagi/jalan santai di sekitar area lingkungan sekolah lama." },
        { time: "08:00 - 10:00", description: "Kuliner Tempo Dulu: Peserta akan diajak 'cari makanan jadul tempo dulu' yang ada di sekitar Padang. Sarapan bersama (Kuliner Khas Makanan Khas/Tempo Dulu)." },
        { time: "10:00 - 11:00", description: "Sesi Foto Akhir & Komitmen Pembubaran Panitia." }
      ]
    }
  },
  budgetItems: [
    { category: "Venue & Catering", amount: "Rp 45,000,000,-", details: "(Pagi-Outing + Sore-Gala Dinner TBD)" },
    { category: "Event Organizer Fee", amount: "Rp 15,000,000,-", details: "Professional Outing & Event Management" },
    { category: "Merchandise & Dresscode", amount: "Rp 20,000,000,-", details: "(Alumni Seragam + Tidak Hadir)" },
    { category: "Cendera Mata Guru & Sekolah", amount: "Rp 10,000,000,-", details: "Sumbangan Fisik & 30 Cendera Mata" },
    { category: "Publikasi & Dok (Video Op)", amount: "Rp 5,000,000,-", details: "(Video Op, ID Card Yearbook-style)" },
    { category: "Keamanan & Perizinan", amount: "Rp 5,000,000,-", details: "Perizinan Gedung & Lokasi" },
    { category: "Dana Cadangan", amount: "Rp 5,000,000,-", details: "Contingency Fund" }
  ],
  timelineItems: [
    { phase: "Fase 1: Persiapan", time: "Nov 2025 - Jan 2026", target: "Pembentukan Panitia Lengkap, RAB Rinci" },
    { phase: "Fase 2: Pendanaan", time: "Feb 2026 - Mei 2026", target: "Iuran Kelas, Target Sponsor & Donatur" },
    { phase: "Fase 3: Produksi", time: "Jun 2026 - Ags 2026", target: "Seleksi EO, Fiksasi Venue TBD, Produksi Merch" },
    { phase: "Fase 4: Publikasi", time: "Sep 2026 - Okt 2026", target: "Publikasi Medsos, Pengiriman ID Cards" },
    { phase: "Fase 5: Eksekusi", time: "10 - 11 Okt 2026", target: "Pelaksanaan Acara 'Nostalgia Putih Abu-Abu'" }
  ],
  sponsorshipProposalUrl: "",
  baseAttendeeCount: 45,
  sponsorshipPackages: [
    {
      title: "Platinum",
      price: "15-20 Juta",
      benefits: [
        "Logo di kaos seragam alumni",
        "Logo di topi & tumbler",
        "Logo di backdrop utama ukuran BESAR",
        "Logo di Flyer Event & ID Card (Yearbook-style)",
        "Penyebutan di video opening",
        "Sesi sharing khusus / penyebutan oleh MC"
      ],
      color: "bg-slate-800 text-white",
      borderColor: "border-slate-800"
    },
    {
      title: "Gold",
      price: "8-12 Juta",
      benefits: [
        "Logo di kaos seragam alumni",
        "Logo di tumbler",
        "Logo di backdrop utama ukuran SEDANG",
        "Logo di Flyer Event & ID Card",
        "Khusus penyebutan oleh MC"
      ],
      color: "bg-amber-600 text-white",
      borderColor: "border-amber-600"
    },
    {
      title: "Silver",
      price: "3-5 Juta",
      benefits: [
        "Logo di backdrop utama ukuran KECIL",
        "Logo di Flyer Event & ID Card",
        "Khusus penyebutan oleh MC"
      ],
      color: "bg-slate-400 text-navy-900",
      borderColor: "border-slate-400"
    }
  ],
  gallery: [
    { src: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=2070&auto=format&fit=crop", caption: "Kelas 1", rot: "-rotate-2" },
    { src: "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?q=80&w=2070&auto=format&fit=crop", caption: "Lulus!", rot: "rotate-3" }
  ],
  backgroundMusicUrl: "https://youtu.be/Ch3l_Q9PxpQ",
  introVideoUrl: "https://www.image2url.com/r2/default/videos/1783431340717-7a9d71cd-bd4e-4e3c-bd1e-28603f7af861.mp4",
  introVideoUrlMobile: "",
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
