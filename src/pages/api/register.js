import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
} from 'firebase/firestore';
import db from './firebaseHandler';

export default async function handler(req, res) {
  const { username, password, firstName, lastName, oneLink } = req.body;
  const users = collection(db, 'users');
  const userNameSnapshot = await getDocs(
    query(users, where('username', '==', username))
  );
  const linkSnapshot = await getDocs(
    query(users, where('oneLink', '==', oneLink))
  );
  if (userNameSnapshot.size > 0) {
    res.status(401).send('Username already taken. ');
    return;
  }
  if (linkSnapshot.size > 0) {
    res.status(401).send('Link already taken. ');
    return;
  }
  await setDoc(doc(db, 'users', oneLink), {
    username,
    password,
    firstName,
    lastName,
    oneLink,
  });
  res.status(200).json({ username, password, firstName, lastName, oneLink });
}
