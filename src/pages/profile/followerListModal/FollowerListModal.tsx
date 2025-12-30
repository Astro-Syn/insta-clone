import React, { useEffect, useState } from 'react';
import './FollowerListModal.css';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { characters } from '../../../data/characters';

interface Props {
  userIds: string[];
  title: string;
  onClose: () => void;
  userId: string;
}

type ModalUser = {
  uid: string;
  username: string;
  profilePicURL?: string;
};

export default function FollowerListModal({
  userIds,
  title,
  onClose
}: Props) {
  const [users, setUsers] = useState<ModalUser[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const result: ModalUser[] = [];

      for (const uid of userIds) {
        const hardcoded = Object.values(characters).find(c => c.uid === uid);

        if (hardcoded) {
          result.push({
            uid: hardcoded.uid,
            username: hardcoded.username,
            profilePicURL: hardcoded.profilePicUrl
          });
          continue;
        }

        const snap = await getDoc(doc(db, 'users', uid));
        if (snap.exists()) {
          const data = snap.data();
          result.push({
            uid,
            username: data.username,
            profilePicURL: data.profilePicURL || data.profilePicUrl
          });
        }
      }

      setUsers(result);
    };

    fetch();
  }, [userIds]);

  return (
    <div className="followers-overlay" onClick={onClose}>
      <div
        className="followers-window"
        onClick={e => e.stopPropagation()}
      >
        <h2 className='status-font'>{title}</h2>

        <div className="followers-scroll">
          {users.map(u => (
            <div
              key={u.uid}
              className="follower-item"
              onClick={() => {
                navigate(`/profile/${u.uid}`);
                onClose();
              }}
            >
              <img src={u.profilePicURL || '/Images/profile-pic.jpg'} />
              <p>@{u.username}</p>
            </div>
          ))}
        </div>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
