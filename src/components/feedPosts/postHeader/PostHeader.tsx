import React from 'react';
import { useState } from 'react';
import '../postHeader/PostHeader.css';

export default function PostHeader() {
  const [isFollowed, setIsFollowed] = useState(false);
  return (
    <div className='post-header-container'>
        <div className='users-name'>
            users avatar image
            <span>Majima</span>
            <span>1w</span>
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
