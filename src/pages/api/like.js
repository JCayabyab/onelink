import { collection, getDocs, query, where } from 'firebase/firestore';
import db from './firebaseHandler';

export default async function handler(req, res) {
  const { username, oneLink } = req.body;
  const users = collection(db, 'users');
  const userNameSnapshot = await getDocs(
    query(users, where('oneLink', '==', oneLink))
  );
  const updatePath = `likes.${username}`;
  const docId = userNameSnapshot.docs.at(0).id;
  await db.collection('users').doc(docId).update(updatePath, username);
  res.status(200).json('');
}
