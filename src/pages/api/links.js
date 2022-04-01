import { collection, getDocs, query, where } from 'firebase/firestore';
import db from './firebaseHandler';

export default async function handler(req, res) {
  const { oneLink } = req.body;
  const users = collection(db, 'users');
  const userNameSnapshot = await getDocs(
    query(users, where('oneLink', '==', oneLink))
  );
  const results = userNameSnapshot.docs.map((x) => ({
    username: x.get('username'),
    oneLink: x.get('oneLink'),
    links: x.get('links'),
    likes: x.get('likes'),
    firstName: x.get('firstName'),
    lastName: x.get('lastName'),
  }));
  console.log(results);
  res.status(200).json(results[0]);
}
