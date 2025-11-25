import React, { useState, useEffect } from 'react';
import './ProfileHeader.css';
import UpdateProfile from '../../../components/updateProfile/UpdateProfile';
import { auth } from '../../../firebase/firebase';
import { db } from '../../../firebase/firebase';
import {doc, updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore';

type ProfileUser = {
  uid: string;
  username: string;
  fullName?: string;
  bio?: string;
  profilePicURL?: string;
  followers?: string[];
  following?: string[];
  photos?: string[];
};

interface ProfileHeaderProps {
  user: ProfileUser;
  isOwner: boolean;
}

export default function ProfileHeader({ user, isOwner }: ProfileHeaderProps) {
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  const username = user.username || 'Nomad';
  const fullName = user.fullName || username;
  const bio = user.bio || "This user hasn't added a bio yet.";
  const followersCount = user.followers?.length ?? 0;
  const followingCount = user.following?.length ?? 0;
  const postsCount = user.photos?.length ?? 0;
  const currentUid = auth.currentUser?.uid || null;

  // Detect if current user follows this profile
  useEffect(() => {
    if (!user || !currentUid) return;
    setIsFollowing(user.followers?.includes(currentUid));
  }, [user, currentUid]);

  // Follow function (renamed to avoid conflict)
  const handleFollow = async () => {
    if (!currentUid || loading) return;

    setLoading(true);

    try {
      const currentUserRef = doc(db, "users", currentUid);
      const targetUserRef = doc(db, "users", user.uid);

      await updateDoc(currentUserRef, {
        following: arrayUnion(user.uid)
      });

      await updateDoc(targetUserRef, {
        followers: arrayUnion(currentUid)
      });

    } finally {
      setLoading(false);
    }
  };


  const handleUnfollow = async () => {
    if (!currentUid || loading) return;

    setLoading(true);

    try {
      const currentUserRef = doc(db, "users", currentUid);
      const targetUserRef = doc(db, "users", user.uid);

      await updateDoc(currentUserRef, {
        following: arrayRemove(user.uid)
      });

      await updateDoc(targetUserRef, {
        followers: arrayRemove(currentUid)
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='profile-header-container'>
      <div className='profile-image'>
        <img
          src={
            user.profilePicURL && user.profilePicURL.trim() !== ""
              ? user.profilePicURL
              : isOwner
                ? auth.currentUser?.photoURL || 'default-image-url.jpg'
                : 'default-image-url.jpg'
          }
          alt="Profile"
          width={100}
          height={100}
        />
      </div>

      <div className='user-info-container'>
        <div className='user-and-edit-profile'>
          <div className='profile-username'>{username}</div>

         
          {!isOwner && currentUid && (
            <button
              disabled={loading}
              onClick={() =>
                isFollowing ? handleUnfollow() : handleFollow()
              }
            >
              {loading ? "..." : isFollowing ? "Unfollow" : "Follow"}
            </button>
          )}

         
          {isOwner && (
            <div className='edit-profile-btn'>
              <button onClick={() => setShowUpdateProfile(true)}>
                Edit Profile
              </button>
            </div>
          )}
        </div>

        <div className='profile-numbers-info'>
          <div className='profile-follow-info'>
            <p className='profile-number'>{postsCount}</p>
            <span>Posts</span>
          </div>

          <div className='profile-follow-info'>
            <p className='profile-number'>{followersCount}</p>
            <span>Followers</span>
          </div>

          <div className='profile-follow-info'>
            <p className='profile-number'>{followingCount}</p>
            <span>Following</span>
          </div>
        </div>

        <div className='profile-description'>
          <div className='profile-name'>{fullName}</div>
          <div className='profile-description-text'>{bio}</div>
        </div>
      </div>

      {showUpdateProfile && isOwner && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowUpdateProfile(false)}>X</button>
            <UpdateProfile />
          </div>
        </div>
      )}
    </div>
  );
}
