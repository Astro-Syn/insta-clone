import { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  increment,
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import './LikeButton.css';

interface LikeButtonProps {
  postId: string;
}

export default function LikeButton({ postId }: LikeButtonProps) {
  const user = auth.currentUser;
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  
  useEffect(() => {
    if (!user) return;

    const likeRef = doc(db, "posts", postId, "likes", user.uid);

    getDoc(likeRef).then(snap => {
      setLiked(snap.exists());
    });
  }, [postId, user]);

  
  useEffect(() => {
    const likesRef = collection(db, "posts", postId, "likes");

    return onSnapshot(likesRef, snap => {
      setLikesCount(snap.size);
    });
  }, [postId]);

const toggleLike = async () => {
  if (!user) return;

  const likeRef = doc(db, "posts", postId, "likes", user.uid);

  if (liked) {
    // UNLIKE
    await deleteDoc(likeRef);
    setLiked(false);
  } else {
    // LIKE
    await setDoc(likeRef, {
      createdAt: serverTimestamp()
    });

    setLiked(true);

  
    try {
      const postRef = doc(db, "posts", postId);
      const postSnap = await getDoc(postRef);

      if (postSnap.exists()) {
        const postData = postSnap.data();

        if (postData?.uid && postData?.username) {
          await addDoc(
            collection(db, "users", user.uid, "activity"),
            {
              type: "like",
              postId,
              targetUid: postData.uid,
              targetUsername: postData.username,
              createdAt: serverTimestamp()
            }
          );
        }
      }
    } catch (err) {
      console.warn("Activity logging skipped:", err);
    }
  };
};


  return (
    <button
      className={`like-btn ${liked ? "liked" : ""}`}
      onClick={toggleLike}
    >
      ❤︎ {likesCount}
    </button>
  );
}
