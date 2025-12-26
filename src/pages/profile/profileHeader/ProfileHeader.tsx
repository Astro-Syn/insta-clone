import React, { useState, useEffect } from 'react';
import './ProfileHeader.css';
import UpdateProfile from '../../../components/updateProfile/UpdateProfile';
import { auth, db } from '../../../firebase/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import FollowerListModal from '../followerListModal/FollowerListModal';
import { characters } from '../../../data/characters';
import { MdOutlineMessage } from "react-icons/md";
import MessagePopup from '../../../components/messagepopup/MessagePopup';

type ProfileUser = {
  uid: string;
  username: string;
  fullName?: string;
  bio?: string;
  profilePicURL?: string;
  profilePicUrl?: string;
  followers?: string[];
  following?: string[];
  photos?: any[];
  background?: {
    earlyLife: string;
  }[];
  earlyLife: string;
};

interface ProfileHeaderProps {
  user: ProfileUser;
  isOwner: boolean;
  onUserChange?: (updated: ProfileUser) => void;
}


export default function ProfileHeader({
  user,
  isOwner,
  onUserChange
}: ProfileHeaderProps) {
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFollowerList, setShowFollowerList] = useState(false);
  const [showFollowingList, setShowFollowingList] = useState(false);

  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [showEarlyLife, setShowEarlyLife] = useState(false);

  const currentUid = auth.currentUser?.uid ?? null;

  const followers = user.followers ?? [];
  const following = user.following ?? [];

  const isHardcodedCharacter = Object.values(characters).some(
  c => c.uid === user.uid
);


  const canMessage = 
  !isHardcodedCharacter && currentUid !== null && currentUid !== user.uid;

  useEffect(() => {
    if (!currentUid) return;
    setIsFollowing(followers.includes(currentUid));
  }, [followers, currentUid]);

  const handleFollow = async () => {
  if (!currentUid || loading) return;
  setLoading(true);

  try {
    const hardcoded = Object.values(characters).find(c => c.uid === user.uid);

    if (hardcoded) {
      
      hardcoded.followers = [...(hardcoded.followers ?? []), currentUid];

     
      await updateDoc(doc(db, 'users', currentUid), {
        following: arrayUnion(user.uid)
      });

    
      onUserChange?.({
        ...user,
        followers: hardcoded.followers
      });

      setIsFollowing(true);
      return;
    }

   
    await updateDoc(doc(db, 'users', currentUid), {
      following: arrayUnion(user.uid)
    });

    await updateDoc(doc(db, 'users', user.uid), {
      followers: arrayUnion(currentUid)
    });

    onUserChange?.({
      ...user,
      followers: [...(user.followers ?? []), currentUid]
    });

    setIsFollowing(true);
  } finally {
    setLoading(false);
  }
};

const handleUnfollow = async () => {
  if (!currentUid || loading) return;
  setLoading(true);

  try {
    const hardcoded = Object.values(characters).find(c => c.uid === user.uid);

    if (hardcoded) {
      hardcoded.followers = (hardcoded.followers ?? []).filter(f => f !== currentUid);

   
      await updateDoc(doc(db, 'users', currentUid), {
        following: arrayRemove(user.uid)
      });

      onUserChange?.({
        ...user,
        followers: hardcoded.followers
      });

      setIsFollowing(false);
      return;
    }

    await updateDoc(doc(db, 'users', currentUid), {
      following: arrayRemove(user.uid)
    });

    await updateDoc(doc(db, 'users', user.uid), {
      followers: arrayRemove(currentUid)
    });

    onUserChange?.({
      ...user,
      followers: (user.followers ?? []).filter(f => f !== currentUid)
    });

    setIsFollowing(false);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="profile-header-container">
      <div className="profile-image">
        <img
          src={
            user.profilePicURL ||
            user.profilePicUrl ||
            '/Images/profile-pic.jpg'
          }
          alt="Profile"
        />
      </div>

      <div className="user-info-container">
        <div className="user-and-edit-profile">
          <div className="profile-username">{user.username}</div>

          {!isOwner && currentUid && (
            <button
              onClick={isFollowing ? handleUnfollow : handleFollow}
              disabled={loading}
            >
              {loading ? '...' : isFollowing ? 'Unfollow' : 'Follow'}
            </button>
          )}

          {isOwner && (
            <button className='edit-profile-btn' onClick={() => setShowUpdateProfile(true)}>
              Edit Profile
            </button>
          )}
        </div>

          {canMessage && (
            <div className='message-box-area'>
          <MdOutlineMessage 
          onClick={() => setShowMessagePopup(true)}
          className='profile-message-icon'
          />

          {showMessagePopup && (
            <MessagePopup 
            targetUid={user.uid}
            targetUsername={user.username}
            onClose={() => setShowMessagePopup(false)} />
          )}
          
        </div>
          )}
        

        <div className="profile-numbers-info">
          <div className="profile-follow-info">
            <p>{user.photos?.length ?? 0}</p>
            <span>Posts</span>
          </div>

          <div
            className="profile-follow-info"
            onClick={() => setShowFollowerList(true)}
          >
            <p>{followers.length}</p>
            <span>Followers</span>
          </div>

          <div
            className="profile-follow-info"
            onClick={() => setShowFollowingList(true)}
          >
            <p>{following.length}</p>
            <span>Following</span>
          </div>
        </div>

        <div className="profile-description">
          <strong>{user.fullName}</strong>
          <p>{user.bio}</p>
        </div>

          {isHardcodedCharacter && (
             <div className='additional-info-section'>
            <h2 className='additional-info-title'>
              Additional Info
            </h2>
               <h2 
            className='early-life-title'
            onClick={() => setShowEarlyLife(true)}
            >Early Life</h2>
          </div>
          )}
         
          
           
        
        <div className='early-life-area'>
          {showEarlyLife && (
  <div 
    className="modal-overlay"
    onClick={() => setShowEarlyLife(false)}
  >
    <div 
      className="modal-content early-life-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <button 
        className="x-btn-edit"
        onClick={() => setShowEarlyLife(false)}
      >
        ✖
      </button>

      <p className='early-life-box-title'>Early Life</p>

      <div className="early-life-modal-text">
        {user.background?.[0]?.earlyLife}
      </div>
    </div>
  </div>
)}

          
          
        </div>
      </div>

     
      {showUpdateProfile && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
            className='x-btn-edit'
            onClick={() => setShowUpdateProfile(false)}>✖</button>
            <UpdateProfile />
          </div>
        </div>
      )}

      {showFollowerList && (
        <FollowerListModal
          userIds={followers}
          title="Followers"
          onClose={() => setShowFollowerList(false)}
          userId={user.uid}
        />
      )}

      {showFollowingList && (
        <FollowerListModal
          userIds={following}
          title="Following"
          onClose={() => setShowFollowingList(false)}
          userId={user.uid}
        />
      )}
    </div>
  );
}
