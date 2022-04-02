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
  // const likes = await getDocs(
  //   collection(db, `users/${querySnapshot.docs.at(0).data().oneLink}/likes`)
  // );
  // const links = await getDocs(
  //   collection(db, `users/${querySnapshot.docs.at(0).data().oneLink}/links`)
  // );
  const user = querySnapshot.docs.map((x) => ({
    username: x.get('username'),
    oneLink: x.get('oneLink'),
    firstName: x.get('firstName'),
    lastName: x.get('lastName'),
    // likes: likes.docs.map((l) => l.id),
    // links: links.docs.map((l) => ({
    //   label: l.data().label,
    //   link: l.data().link,
    // })),
  }));
  res.status(200).json(user[0]);
}
