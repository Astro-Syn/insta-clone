import { collection, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

export async function getOrCreateConversation(uid1: string, uid2: string) {
  const q = query(
    collection(db, "conversations"),
    where("participants", "array-contains", uid1)
  );

  const snap = await getDocs(q);

  const existing = snap.docs.find(doc =>
    (doc.data().participants || []).includes(uid2)
  );

  if (existing) {
    return existing.id;
  }

  const newDoc = await addDoc(collection(db, "conversations"), {
    participants: [uid1, uid2],
    lastMessage: "",
    lastUpdated: serverTimestamp()
  });

  return newDoc.id;
}
