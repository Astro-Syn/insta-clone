import React, { useState } from 'react';
import './ProfileHeader.css';
import UpdateProfile from '../../../components/updateProfile/UpdateProfile';

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

  const username = user.username || 'Nomad';
  const fullName = user.fullName || username;
  const bio = user.bio || "This user hasn't added a bio yet.";
  const followersCount = user.followers?.length ?? 0;
  const followingCount = user.following?.length ?? 0;
  const postsCount = user.photos?.length ?? 0;

  return (
    <div className='profile-header-container'>
      <div className='profile-image'>
        <img
          src={user.profilePicURL || 'default-image-url.jpg'}
          alt="Profile"
          width={100}
          height={100}
        />
      </div>

      <div className='user-info-container'>
        <div className='user-and-edit-profile'>
          <div className='profile-username'>{username}</div>

          {isOwner && (
            <div className='edit-profile-btn'>
              <button onClick={() => setShowUpdateProfile(true)}>Edit Profile</button>
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
