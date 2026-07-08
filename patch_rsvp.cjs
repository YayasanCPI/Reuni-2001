const fs = require('fs');
let content = fs.readFileSync('components/RSVP.tsx', 'utf-8');

const importSearch = `import { useContent } from '../contexts/ContentContext';`;
const importReplace = `import { useContent } from '../contexts/ContentContext';\nimport { collection, addDoc, serverTimestamp } from 'firebase/firestore';\nimport { db } from '../lib/firebase';`;

const trySearch = `    try {
      // We use no-cors because Apps Script might not return proper CORS headers for JSON`;
const tryReplace = `    try {
      // Save to Firebase first
      try {
        await addDoc(collection(db, 'attendees'), {
          ...formData,
          createdAt: serverTimestamp(),
          status: 'confirmed'
        });
      } catch (fbErr) {
        console.error("Firebase save error", fbErr);
      }

      // We use no-cors because Apps Script might not return proper CORS headers for JSON`;

if (content.includes(importSearch) && content.includes(trySearch)) {
  content = content.replace(importSearch, importReplace);
  content = content.replace(trySearch, tryReplace);
  fs.writeFileSync('components/RSVP.tsx', content);
  console.log("Patched RSVP.tsx");
} else {
  console.log("Could not patch RSVP.tsx");
}
