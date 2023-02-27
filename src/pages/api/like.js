import { doc, setDoc } from 'firebase/firestore';
import db from './firebaseHandler';

export default async function handler(req, res) {
  const { username, oneLink } = req.body;
  await setDoc(doc(db, `users/${oneLink}/likes`, username), {});
  res.status(200).json('');
}
