import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import './FollowerListModal.css';
import { useNavigate } from 'react-router-dom';
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
  fullName?: string;
  profilePicURL?: string;
  isHardcoded?: boolean;
};

export default function FollowerListModal({ userIds, title, onClose }: Props) {
  const [users, setUsers] = useState<ModalUser[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const loaded: ModalUser[] = [];

      for (const uid of userIds) {
        const hardcoded = Object.values(characters).find(c => c.uid === uid);

        if (hardcoded) {
          loaded.push({
            uid: hardcoded.uid,
            username: hardcoded.username,
            fullName: hardcoded.fullName,
            profilePicURL: hardcoded.profilePicUrl,
            isHardcoded: true
          });
          continue;
        }

        const snap = await getDoc(doc(db, 'users', uid));
        if (snap.exists()) {
          const d = snap.data();
          loaded.push({
            uid,
            username: d.username,
            fullName: d.fullName,
            profilePicURL: d.profilePicURL || d.profilePicUrl,
            isHardcoded: false
          });
        }
      }

      setUsers(loaded);
    };

    fetchUsers();
  }, [userIds]);

  return (
    <div className="followers-overlay" onClick={onClose}>
      <div className="followers-window" onClick={e => e.stopPropagation()}>
        <h2>{title}</h2>

        <div className="followers-scroll">
          {users.length === 0 && <p>No users found.</p>}

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

        <button className="close-modal-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
