import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import db from './firebaseHandler';

export default async function handler(req, res) {
  const { username, oneLink } = req.body;
  const users = collection(db, 'users');
  const userNameSnapshot = await getDocs(
    query(users, where('oneLink', '==', oneLink))
  );
  await setDoc(
    doc(
      db,
      `users/${userNameSnapshot.docs.at(0).data().username}/likes`,
      username
    ),
    {}
  );
  res.status(200).json('');
}
