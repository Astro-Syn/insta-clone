import { useState, useEffect } from 'react';
import '../suggestedUsers/SuggestedUser.css';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { characters } from '../../data/characters';

interface SuggestedUserProps {
  name: string;
  avatar: string;
  followers: number;
  userId: string;
}

export default function SuggestedUser({
  name,
  
  avatar,
  userId
}: SuggestedUserProps) {
  const navigate = useNavigate();
  const currentUid = auth.currentUser?.uid;

  const [isFollowed, setIsFollowed] = useState(false);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (!currentUid) return;

    const hardcoded = Object.values(characters).find(c => c.uid === userId);
    if (hardcoded) {
      setIsFollowed((hardcoded.followers ?? []).includes(currentUid));
    }
  }, [currentUid, userId]);

  const handleFollow = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation(); 
    if (!currentUid || loading) return;

    setLoading(true);

    try {
      
      const hardcoded = Object.values(characters).find(c => c.uid === userId);

      if (hardcoded) {
        hardcoded.followers = isFollowed
          ? (hardcoded.followers ?? []).filter(f => f !== currentUid)
          : [...(hardcoded.followers ?? []), currentUid];

        setIsFollowed(!isFollowed);
        setLoading(false);
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

      setIsFollowed(!isFollowed);
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

        <button onClick={handleFollow} disabled={loading}>
          {loading ? '…' : isFollowed ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </div>
  );
}
