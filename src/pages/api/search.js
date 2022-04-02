import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import db from './firebaseHandler';

export default async function handler(req, res) {
  const username = req.body.query;
  const userInfo = await getDoc(doc(db, 'users', username));
  const likes = await getDocs(collection(db, `users/${username}/likes`));
  const links = await getDocs(collection(db, `users/${username}/links`));
  const user = {
    username: userInfo.data().username,
    oneLink: userInfo.data().oneLink,
    firstName: userInfo.data().firstName,
    lastName: userInfo.data().lastName,
    likes: likes.docs.map((x) => x.id),
    links: links.docs.map((x) => ({
      label: x.data().label,
      link: x.data().link,
    })),
  };
  res.status(200).json(user);
}
