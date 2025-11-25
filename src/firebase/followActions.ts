import { db } from './firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { auth } from './firebase';

export async function followUser(targetUid: string) {
  const currentUid = auth.currentUser?.uid;
  if (!currentUid) return;

  const currentUserRef = doc(db, "users", currentUid);
  const targetUserRef = doc(db, "users", targetUid);

  await updateDoc(currentUserRef, {
    following: arrayUnion(targetUid)
  });

  await updateDoc(targetUserRef, {
    followers: arrayUnion(currentUid)
  });
}

export async function unfollowUser(targetUid: string) {
  const currentUid = auth.currentUser?.uid;
  if (!currentUid) return;

  const currentUserRef = doc(db, "users", currentUid);
  const targetUserRef = doc(db, "users", targetUid);

  await updateDoc(currentUserRef, {
    following: arrayRemove(targetUid)
  });

  await updateDoc(targetUserRef, {
    followers: arrayRemove(currentUid)
  });
}
