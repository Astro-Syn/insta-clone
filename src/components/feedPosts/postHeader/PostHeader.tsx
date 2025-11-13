import React from 'react';
import '../postHeader/PostHeader.css';

export default function PostHeader() {
  return (
    <div className='post-header-container'>
        <div className='users-name'>
            users avatar image
            <span>Majima</span>
            <span>1w</span>
        </div>

        <div className='follow-unfollow'>
            <p>unfollow</p>
        </div>
    </div>
  )
}
