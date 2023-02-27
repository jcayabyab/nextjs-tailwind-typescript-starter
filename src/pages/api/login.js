import { collection, getDocs, query, where } from 'firebase/firestore';
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
  const userData = querySnapshot.docs.pop().data();
  const likes = await getDocs(
    collection(db, `users/${userData.oneLink}/likes`)
  );
  const links = await getDocs(
    collection(db, `users/${userData.oneLink}/links`)
  );
  const user = {
    username: userData.username,
    oneLink: userData.oneLink,
    firstName: userData.firstName,
    lastName: userData.lastName,
    likes: likes.docs.map((l) => l.id),
    links: links.docs.map((l) => ({
      label: l.data().label,
      link: l.data().link,
    })),
  };
  res.status(200).json(user);
}
