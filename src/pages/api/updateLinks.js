import { collection, doc, getDocs, writeBatch } from 'firebase/firestore';
import db from './firebaseHandler';

export default async function handler(req, res) {
  const batch = writeBatch(db);
  const { user, linkInputMap } = req.body;
  const oldLinks = await getDocs(collection(db, `users/${user.oneLink}/links`));
  oldLinks.docs.map((d) =>
    batch.delete(doc(db, `users/${user.oneLink}/links`, d.id))
  );
  Object.keys(linkInputMap).forEach((key) => {
    batch.set(
      doc(db, `users/${user.oneLink}/links`, linkInputMap[key].id.toString()),
      {
        label: linkInputMap[key].label,
        link: linkInputMap[key].link,
      }
    );
  });
  await batch.commit();
  res.status(200).json('');
}
