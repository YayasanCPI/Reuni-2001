import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
const firebaseConfig = {
  projectId: "gen-lang-client-0272992675",
  appId: "1:467670747714:web:bb6ad64051097872373bdb",
  apiKey: "AIzaSyDt_YbGXyqHP8oBokz0DJba_O66u_M7VRw",
  authDomain: "gen-lang-client-0272992675.firebaseapp.com",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
addDoc(collection(db, 'attendees'), {test: 1}).then(console.log).catch(console.error);
