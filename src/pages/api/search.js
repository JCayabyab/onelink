import { collection, getDocs, query, where } from 'firebase/firestore';
import db from './firebaseHandler';

export default async function handler(req, res) {
  const searchString = req.body.query;
  const users = collection(db, 'users');
  const userNameSnapshot = await getDocs(
    query(users, where('username', '==', searchString))
  );
  const results = userNameSnapshot.docs.map((x) => ({
    username: x.get('username'),
    oneLink: x.get('oneLink'),
    likes: x.get('likes'),
    links: x.get('links'),
    firstName: x.get('firstName'),
    lastName: x.get('lastName'),
  }));
  res.status(200).json(results);
}
