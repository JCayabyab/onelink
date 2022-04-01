import { query, where, collection, getDocs } from 'firebase/firestore';
import db from './firebaseHandler';

export default async function handler(req, res) {
  const { username, password } = req.body;
  const users = collection(db, 'users');
  const q = query(
    users,
    where('username', '==', username),
    where('password', '==', password)
  );
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size !== 1) {
    res.status(401).send('Incorrect credentials');
    return;
  }
  const user = querySnapshot.docs.map((x) => ({
    username: x.get('username'),
    oneLink: x.get('oneLink'),
    links: x.get('links'),
    likes: x.get('likes'),
    firstName: x.get('firstName'),
    lastName: x.get('lastName'),
  }));
  res.status(200).json(user[0]);
}
