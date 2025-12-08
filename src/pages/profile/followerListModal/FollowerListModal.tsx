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
  profilePicUrl?: string;
  isHardcoded?: boolean;
};

export default function FollowerListModal({ userIds, title, onClose }: Props) {
  const [users, setUsers] = useState<ModalUser[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const loadedUsers: ModalUser[] = [];

      for (const uid of userIds) {
 
        const hardcoded = Object.values(characters).find(c => c.uid === uid);

        if (hardcoded) {
          loadedUsers.push({
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
          const data = snap.data() as any;
          loadedUsers.push({
            uid,
            username: data.username,
            fullName: data.fullName,
            profilePicURL: data.profilePicURL || data.profilePicUrl,
            isHardcoded: false
          });
        }
      }

      setUsers(loadedUsers);
    };

    if (userIds && userIds.length > 0) {
      fetchUsers();
    } else {
      setUsers([]);
    }
  }, [userIds]);

  return (
    <div className="followers-overlay" onClick={onClose}>
      <div className="followers-window" onClick={e => e.stopPropagation()}>
        <h2>{title}</h2>

        <div className="followers-scroll">
          {users.length === 0 && <p>No users found.</p>}

          {users.map((u) => (
            <div
              className="follower-item"
              key={u.uid}
              onClick={() => {
                navigate(`/profile/${u.uid}`);
                onClose();
              }}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={u.profilePicURL || u.profilePicUrl || '/Images/profile-pic.jpg'}
              />
              <p>@{u.username}</p>
              {u.isHardcoded && (
                <span style={{ fontSize: '12px', opacity: 0.6 }}>
                  
                </span>
              )}
            </div>
          ))}
        </div>

        <button className="close-modal-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
