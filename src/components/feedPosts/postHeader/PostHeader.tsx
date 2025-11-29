import React from 'react';
import { useState } from 'react';
import '../postHeader/PostHeader.css';

interface HeaderProps {
  username: string;
  profilePicURL?: string;
}

export default function PostHeader({username, profilePicURL}: HeaderProps) {
  const [isFollowed, setIsFollowed] = useState(false);
  return (
    <div className='post-header-container'>
        <div className='users-name'>
            <img
            className='feedpost-avatar'
            src={profilePicURL || '/Images/profile-pic.jpg'}
            />
            <span>{username}</span>
            <span>time frame comming soon</span>
        </div>

        <div className='follow-unfollow'>
            <button
            onClick={() => setIsFollowed(!isFollowed)}
            >
              {isFollowed ? "Unfollow" : "Follow"}
            </button>
        </div>
    </div>
  )
}
