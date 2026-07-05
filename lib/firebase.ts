import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

const firebaseConfig = {
  projectId: "gen-lang-client-0272992675",
  appId: "1:467670747714:web:bb6ad64051097872373bdb",
  apiKey: "AIzaSyDt_YbGXyqHP8oBokz0DJba_O66u_M7VRw",
  authDomain: "gen-lang-client-0272992675.firebaseapp.com",
  storageBucket: "gen-lang-client-0272992675.firebasestorage.app",
  messagingSenderId: "467670747714"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, "ai-studio-reuniperakangkat-00f75c85-e6b2-4355-938d-b7849df1152c");
export const auth = getAuth(app);
