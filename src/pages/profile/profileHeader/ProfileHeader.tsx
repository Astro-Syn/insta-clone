import React, { useState, useEffect } from 'react';
import './ProfileHeader.css';
import UpdateProfile from '../../../components/updateProfile/UpdateProfile';
import { auth, db } from '../../../firebase/firebase';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import FollowerListModal from '../followerListModal/FollowerListModal';
import { characters } from '../../../data/characters';

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
};

interface ProfileHeaderProps {
  user: ProfileUser;
  isOwner: boolean;
  onUserChange?: (updated: ProfileUser) => void;
}

export default function ProfileHeader({ user, isOwner, onUserChange }: ProfileHeaderProps) {
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFollowerList, setShowFollowerList] = useState(false);
  const [showFollowingList, setShowFollowingList] = useState(false);

  const currentUid = auth.currentUser?.uid || null;

  const username = user.username || 'Nomad';
  const fullName = user.fullName || username;
  const bio = user.bio || "This user hasn't added a bio yet.";
  const followersCount = (user.followers ?? []).length;
  const followingCount = (user.following ?? []).length;
  const postsCount = (user.photos ?? []).length;

  useEffect(() => {
    if (!user || !currentUid) return;
    setIsFollowing((user.followers ?? []).includes(currentUid));
  }, [user, currentUid]);

  const handleFollow = async () => {
    if (!currentUid || loading) return;
    setLoading(true);

    try {
      
      const hardcoded = Object.values(characters).find(c => c.uid === user.uid);

      if (hardcoded) {
        const updatedFollowers = [...(hardcoded.followers ?? []), currentUid];

       
        hardcoded.followers = updatedFollowers;

        
        const updatedUser: ProfileUser = {
          ...user,
          followers: updatedFollowers
        };

        onUserChange?.(updatedUser);
        setIsFollowing(true);
        setLoading(false);
        return;
      }

      
      const currentUserRef = doc(db, 'users', currentUid);
      const targetUserRef = doc(db, 'users', user.uid);

      await updateDoc(currentUserRef, {
        following: arrayUnion(user.uid)
      });

      await updateDoc(targetUserRef, {
        followers: arrayUnion(currentUid)
      });

      const updatedUser: ProfileUser = {
        ...user,
        followers: [...(user.followers ?? []), currentUid]
      };

      onUserChange?.(updatedUser);
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
        const updatedFollowers = (hardcoded.followers ?? []).filter(f => f !== currentUid);

        hardcoded.followers = updatedFollowers;

        const updatedUser: ProfileUser = {
          ...user,
          followers: updatedFollowers
        };

        onUserChange?.(updatedUser);
        setIsFollowing(false);
        setLoading(false);
        return;
      }

   
      const currentUserRef = doc(db, 'users', currentUid);
      const targetUserRef = doc(db, 'users', user.uid);

      await updateDoc(currentUserRef, {
        following: arrayRemove(user.uid)
      });

      await updateDoc(targetUserRef, {
        followers: arrayRemove(currentUid)
      });

      const updatedUser: ProfileUser = {
        ...user,
        followers: (user.followers ?? []).filter(f => f !== currentUid)
      };

      onUserChange?.(updatedUser);
      setIsFollowing(false);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='profile-header-container'>
      <div className='profile-image'>
        <img
          src={
            (user.profilePicURL || user.profilePicUrl) &&
            (user.profilePicURL || user.profilePicUrl)!.trim() !== ''
              ? (user.profilePicURL || user.profilePicUrl)
              : isOwner
                ? auth.currentUser?.photoURL || '/Images/profile-pic.jpg'
                : '/Images/profile-pic.jpg'
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
              onClick={() => (isFollowing ? handleUnfollow() : handleFollow())}
            >
              {loading ? '...' : isFollowing ? 'Unfollow' : 'Follow'}
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

          <div
            className='profile-follow-info'
            onClick={() => setShowFollowerList(true)}
            style={{ cursor: 'pointer' }}
          >
            <p className='profile-number'>{followersCount}</p>
            <span>Followers</span>
          </div>

          <div
            className='profile-follow-info'
            onClick={() => setShowFollowingList(true)}
            style={{ cursor: 'pointer' }}
          >
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

      {showFollowerList && (
        <FollowerListModal
          userIds={user.followers ?? []}
          title="Followers"
          onClose={() => setShowFollowerList(false)}
          userId={user.uid}
        />
      )}

      {showFollowingList && (
        <FollowerListModal
          userIds={user.following ?? []}
          title="Following"
          onClose={() => setShowFollowingList(false)}
          userId={user.uid}
        />
      )}
    </div>
  );
}
