import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCB32f4Kr8Tn_6GHPiPzou3Mgjvl5-RxaU',
  authDomain: 'onelink-77abb.firebaseapp.com',
  projectId: 'onelink-77abb',
  storageBucket: 'onelink-77abb.appspot.com',
  messagingSenderId: '1054200075725',
  appId: '1:1054200075725:web:dc37490fc4fa435bffe084',
  measurementId: 'G-TLF5SY4HHS',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
