import React, { useState } from 'react';
import '../postHeader/PostHeader.css';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  username: string;
  avatar?: string;
  userId: string;
}

export default function PostHeader({ username, avatar, userId }: HeaderProps) {
  const [isFollowed, setIsFollowed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='post-header-container'>
      <div className='users-name'>
        <img
          className='feedpost-avatar'
          src={avatar || '/Images/profile-pic.jpg'}
          alt={`${username}'s avatar`}
        />

        <span
        className='feed-username'
          onClick={() => navigate(`/profile/${userId}`)}
          style={{ cursor: 'pointer' }}
        >
          {username}
        </span>

        
      </div>

      <div className='follow-unfollow'>
        <button className='follow-btn' onClick={() => setIsFollowed(prev => !prev)}>
          {isFollowed ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </div>
  );
}
