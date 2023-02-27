import { deleteDoc, doc } from 'firebase/firestore';
import db from './firebaseHandler';

export default async function handler(req, res) {
  const { username, oneLink } = req.body;
  await deleteDoc(doc(db, `users/${oneLink}/likes`, username));
  res.status(200).json('');
}
