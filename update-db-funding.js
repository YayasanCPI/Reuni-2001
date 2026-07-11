import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

try {
  const serviceAccount = JSON.parse(readFileSync('/home/user/.config/firebase/service_account.json', 'utf-8'));
  const app = initializeApp({
    credential: cert(serviceAccount)
  });
  const db = getFirestore(app);
  
  await db.collection('settings').doc('landingPage').update({
    classFundingProgress: [
      { className: "Kelas 2.1", collected: 2500000, target: 12500000 },
      { className: "Kelas 2.2", collected: 5000000, target: 12500000 },
      { className: "Kelas 2.3", collected: 1500000, target: 12500000 },
      { className: "Kelas 2.4", collected: 0, target: 12500000 },
      { className: "Kelas 2.5", collected: 12500000, target: 12500000 },
      { className: "Kelas 2.6", collected: 1000000, target: 12500000 },
      { className: "Kelas 2.7", collected: 7500000, target: 12500000 },
      { className: "Kelas 2.8", collected: 3000000, target: 12500000 },
    ]
  });
  console.log('Database updated successfully');
} catch (e) {
  console.log('Error updating database:', e.message);
}
