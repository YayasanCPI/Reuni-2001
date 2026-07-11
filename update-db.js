import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

try {
  const serviceAccount = JSON.parse(readFileSync('/home/user/.config/firebase/service_account.json', 'utf-8'));
  const app = initializeApp({
    credential: cert(serviceAccount)
  });
  const db = getFirestore(app);
  
  await db.collection('reuni_content').doc('main').update({
    contributionAmount: 'Rp 12.500.000'
  });
  console.log('Database updated successfully');
} catch (e) {
  console.log('Error updating database:', e.message);
  // It's possible the document doesn't exist or isn't initialized yet
}
