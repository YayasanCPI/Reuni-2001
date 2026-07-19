import { initializeApp } from 'firebase/app';
import { initializeFirestore, doc, getDoc, setDoc, onSnapshot, query, collection, orderBy, addDoc, serverTimestamp, where } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

const firebaseConfig = {
  projectId: "gen-lang-client-0272992675",
  appId: "1:467670747714:web:bb6ad64051097872373bdb",
  apiKey: "AIzaSyDt_YbGXyqHP8oBokz0DJba_O66u_M7VRw",
  authDomain: "gen-lang-client-0272992675.firebaseapp.com",
  storageBucket: "gen-lang-client-0272992675.firebasestorage.app",
  messagingSenderId: "467670747714",
  firestoreDatabaseId: "ai-studio-reuni-v4-00f75c85-e6b2"
};

const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, { experimentalForceLongPolling: true }, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
