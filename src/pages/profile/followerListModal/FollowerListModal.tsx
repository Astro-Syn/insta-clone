import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import './FollowerListModal.css';

interface Props {
  userIds: string[];
  title: string;
  onClose: () => void;
}

export default function FollowerListModal({ userIds, title, onClose }: Props) {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const loadedUsers = [];
      for (let uid of userIds) {
        const snap = await getDoc(doc(db, "users", uid));
        if (snap.exists()) loadedUsers.push(snap.data());
      }
      setUsers(loadedUsers);
    };

    fetchUsers();
  }, [userIds]);

  return (
    <div className="followers-overlay" onClick={onClose}>
      <div className="followers-window" onClick={e => e.stopPropagation()}>
        <h2>{title}</h2>
        <div className="followers-scroll">
          {users.map((u, i) => (
            <div className="follower-item" key={i}>
              <img src={u.profilePicURL || 'default-image.jpg'} />
              <p>@{u.username}</p>
            </div>
          ))}
        </div>

        <button className="close-modal-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
