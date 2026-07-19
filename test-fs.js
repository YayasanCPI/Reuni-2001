import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
const firebaseConfig = {
  projectId: "gen-lang-client-0272992675",
  appId: "1:467670747714:web:bb6ad64051097872373bdb",
  apiKey: "AIzaSyDt_YbGXyqHP8oBokz0DJba_O66u_M7VRw",
  authDomain: "gen-lang-client-0272992675.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-reuni-v4-00f75c85-e6b2"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-reuni-v4-00f75c85-e6b2");
addDoc(collection(db, 'attendees'), {test: 1}).then(console.log).catch(console.error);
