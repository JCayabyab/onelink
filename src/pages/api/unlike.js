import {
  collection,
  doc,
  deleteDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import db from './firebaseHandler';

export default async function handler(req, res) {
  const { username, oneLink } = req.body;
  const users = collection(db, 'users');
  const userNameSnapshot = await getDocs(
    query(users, where('oneLink', '==', oneLink))
  );
  await deleteDoc(
    doc(
      db,
      `users/${userNameSnapshot.docs.at(0).data().username}/likes`,
      username
    )
  );
  res.status(200).json('');
}
