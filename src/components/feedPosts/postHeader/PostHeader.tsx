import React, { useState, useEffect } from 'react';
import '../postHeader/PostHeader.css';
import { db } from '../../../firebase/firebase';
import { doc, getDoc } from "firebase/firestore";

type ProfileUser = {
  uid?: string;
  username?: string;
  profilePicURL?: string;
  profilePicUrl?: string;
};

interface HeaderProps {
  user?: ProfileUser;
  username: string;
}

export default function PostHeader({ username, user }: HeaderProps) {
  const [isFollowed, setIsFollowed] = useState(false);
  const [profilePic, setProfilePic] = useState("");

  
  console.log("PostHeader USER:", user);
console.log("profilePic:", profilePic);
  
  if (!user || !user.uid) {
    return (
      <div className='post-header-container'>
        <div className='users-name'>
          <img
            className='feedpost-avatar'
            src='/Images/profile-pic.jpg'
          />
          <span>{username}</span>
          <span>time frame coming soon</span>
        </div>

        <div className='follow-unfollow'>
          <button onClick={() => setIsFollowed(!isFollowed)}>
            {isFollowed ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>
    );
  }

  
  useEffect(() => {
    const loadUserPic = async () => {
      const userRef = doc(db, "users", user.uid!);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const data = snap.data();
        setProfilePic(data.profilePicURL || data.profilePicUrl || "");
      }
    };

    loadUserPic();
  }, [user.uid]);



  return (
    <div className='post-header-container'>
      <div className='users-name'>
        <img
          className='feedpost-avatar'
          src={profilePic || user.profilePicURL || user.profilePicUrl || '/Images/profile-pic.jpg'}
        />
        <span>{username}</span>
        <span>time frame coming soon</span>
      </div>

      <div className='follow-unfollow'>
        <button onClick={() => setIsFollowed(!isFollowed)}>
          {isFollowed ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
}
