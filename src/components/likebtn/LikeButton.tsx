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

    const postRef = doc(db, "posts", postId);
    const likeRef = doc(db, "posts", postId, "likes", user.uid);

    if (liked) {
      
      await deleteDoc(likeRef);
      await updateDoc(postRef, { likesCount: increment(-1) });
      setLiked(false);
    } else {
      
      await setDoc(likeRef, { createdAt: serverTimestamp() });
      await updateDoc(postRef, { likesCount: increment(1) });
      setLiked(true);

      await addDoc(
        collection(db, "users", user.uid, "activity"),
        {
          type: "like",
          postId,
          createdAt: serverTimestamp()
        }
      );
    }
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
