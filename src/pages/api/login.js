import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

export async function getUser() {
  const docRef = doc(db, 'users', 'Ej4FSoTvZRqjKVJ8LP1L');
  const docSnap = await getDoc(docRef);
  console.log('Document data:', docSnap.data());
}

export default function handler(req, res) {
  const { username, password } = req.body;
  getUser();
  if (username === 'username' && password === 'password') {
    res.status(200).json({ user: { username } });
    return;
  }
  res.status(401).send('Incorrect credentials');
}
