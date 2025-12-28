import { useState, useEffect } from 'react';
import '../suggestedUsers/SuggestedUser.css';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/firebase';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from 'firebase/firestore';
import { characters } from '../../data/characters';

interface SuggestedUserProps {
  name: string;
  avatar: string;
  userId: string;
  following: string[];
}

export default function SuggestedUser({
  name,
  avatar,
  userId,
  following
}: SuggestedUserProps) {
  const navigate = useNavigate();
  const currentUid = auth.currentUser?.uid ?? null;

  const [isFollowed, setIsFollowed] = useState(false);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (!currentUid) return;

    const hardcoded = Object.values(characters).find(c => c.uid === userId);
    if (hardcoded) {
      const storedNpcFollows =
        JSON.parse(localStorage.getItem("npcFollows") || "{}");

      setIsFollowed(storedNpcFollows[userId]?.includes(currentUid));
      return;
    }

    setIsFollowed(following.includes(userId));
  }, [following, currentUid, userId]);

  const handleFollow = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    if (!currentUid || loading) return;

    setLoading(true);

    try {
      
      const hardcoded = Object.values(characters).find(c => c.uid === userId);
      if (hardcoded) {
        const stored =
          JSON.parse(localStorage.getItem("npcFollows") || {});
        const current = stored[userId] || [];

        stored[userId] = isFollowed
          ? current.filter((f: string) => f !== currentUid)
          : [...current, currentUid];

        localStorage.setItem("npcFollows", JSON.stringify(stored));
        setIsFollowed(!isFollowed);
        return;
      }

     
      const currentUserRef = doc(db, 'users', currentUid);
      const targetUserRef = doc(db, 'users', userId);

      if (isFollowed) {
        await updateDoc(currentUserRef, {
          following: arrayRemove(userId)
        });
        await updateDoc(targetUserRef, {
          followers: arrayRemove(currentUid)
        });
      } else {
        await updateDoc(currentUserRef, {
          following: arrayUnion(userId)
        });
        await updateDoc(targetUserRef, {
          followers: arrayUnion(currentUid)
        });
      }

      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="suggested-user-container"
      onClick={() => navigate(`/profile/${userId}`)}
    >
      <img src={avatar} className="user-avatar" />

      <div className="users-info">
        <div className="username-and-followers">
          <p className="user-name">{name}</p>
        </div>
      </div>

      <button
        className="follow-btn"
        onClick={handleFollow}
        disabled={loading}
      >
        {loading ? '…' : isFollowed ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
}
