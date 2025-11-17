import React from 'react';
import './ProfileTabs.css';

export default function ProfileTabs() {
  return (
    <div className='profile-tabs-container'>
      <div className='profile-tabs-item'>
        <span>POSTS</span>
      </div>
      <div className='profile-tabs-item'>
        <span>SAVED</span>
      </div>
      <div className='profile-tabs-item'>
        <span>LIKES</span>
      </div>
    </div>
  )
}
