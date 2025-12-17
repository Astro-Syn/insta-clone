import { useState, useEffect } from 'react';
import './ProfilePost.css';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  getDoc
} from 'firebase/firestore';
import { db } from '../../../firebase/firebase';
import { auth } from '../../../firebase/firebase';
import Avatar from '../../../components/avatar/Avatar';
import LikeButton from '../../../components/likebtn/LikeButton';

type ProfilePostProps = {
  img?: string;
  postId: string;
  caption?: string;
  user: {
    uid: string;
    username: string;
    profilePicUrl?: string;
  };
};

export default function ProfilePost({
  img,
  postId,
  caption,
  user
}: ProfilePostProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [currentUserData, setCurrentUserData] = useState<any>(null);

  if (!postId) return null;


  useEffect(() => {
    const fetchUser = async () => {
      const authUser = auth.currentUser;
      if (!authUser) return;

      const snap = await getDoc(doc(db, "users", authUser.uid));
      if (snap.exists()) {
        setCurrentUserData(snap.data());
      }
    };

    fetchUser();
  }, []);

 
  useEffect(() => {
    const q = query(
      collection(db, "posts", postId, "comments"),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, snap => {
      const data = snap.docs.map(d => ({
        id: d.id,
        ...d.data()
      }));
      setComments(data);
    });

    return () => unsub();
  }, [postId]);


  const postComment = async () => {
    if (!comment.trim()) return;

    const authUser = auth.currentUser;

    await addDoc(
      collection(db, "posts", postId, "comments"),
      {
        text: comment,
        user: currentUserData?.username || authUser?.email || "Unknown",
        uid: authUser?.uid,
        avatar:
          currentUserData?.profilePicUrl ||
          currentUserData?.profilePicURL ||
          "/Images/profile-pic.jpg",
        createdAt: serverTimestamp()
      }
    );

    setComment("");
  };

  return (
    <>
      <div className="post" onClick={() => setIsOpen(true)}>
        {img ? (
          <img className="post-image" src={img} alt="post" />
        ) : (
          "Image not available"
        )}
        <div className="image-cover">
          <span>Comments: {comments.length}</span>
        </div>
      </div>

      {isOpen && (
        <div className="modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-left">
              <img src={img} alt="big-post" className="modal-image" />
            </div>

            <div className="modal-right">
              <div className="username-box">
                <p>{user.username}</p>
                
              </div>

              <div className="image-caption">
                {caption}
              </div>

              <div className="post-options-buttons">
                <LikeButton postId={postId} />
              </div>

              <h2 className="comments-header">Comments</h2>

              <div className="comments-list">
                {comments.map(c => (
                  <div key={c.id} className="comment-item">
                    <Avatar
                      src={c.avatar}
                      size={35}
                      alt={c.user}
                    />
                    <strong>{c.user}:</strong> {c.text}
                  </div>
                ))}
              </div>

              <div className="comments-box-section">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                />
                <button onClick={postComment}>Post</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
