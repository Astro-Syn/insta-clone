import React, { useEffect, useState } from 'react';
import './Notifications.css';
import { auth, db } from '../../firebase/firebase';
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { addDoc, serverTimestamp } from "firebase/firestore";


type Notification = {
  id: string;
  type: "follow" | "comment";
  fromUid: string;
  fromUsername: string;
  fromAvatar: string;
  postId?: string;
  createdAt: any;
  read: boolean;
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "notifications"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, snap => {
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Notification[];

      setNotifications(data);
    });

    return () => unsub();
  }, []);

  const handleClick = (notif: Notification) => {
    if (notif.type === "follow") {
      navigate(`/profile/${notif.fromUid}`);
    }

    if (notif.type === "comment" && notif.postId) {
      navigate(`/post/${notif.postId}`);
    }
  };

  return (
    <div className="notif-container">
       <div className="notif-title-container">
          <p>Notifications</p>
        </div>
      <div className="notif-content">
       

        <div className="notif-area">
          {notifications.length === 0 && (
            <p className="empty-notif">No notifications yet</p>
          )}

          {notifications.map(n => (
            <div
              key={n.id}
              className={`notif-item ${n.read ? "read" : "unread"}`}
              onClick={() => handleClick(n)}
            >
              <img src={n.fromAvatar} className="notif-avatar" />

              <div className="notif-text">
                {n.type === "follow" && (
                  <p>
                    <strong>{n.fromUsername}</strong> followed you
                  </p>
                )}

                {n.type === "comment" && (
                  <p>
                    <strong>{n.fromUsername}</strong> commented on your post
                  </p>
                )}

                <span className="notif-time">
                  {new Date(n.createdAt?.toDate?.() || Date.now()).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
