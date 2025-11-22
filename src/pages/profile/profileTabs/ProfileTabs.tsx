import React from 'react';
import './ProfileTabs.css';

export default function ProfileTabs({ onAddPhotos }: {onAddPhotos: () => void}) {
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
      <div>
        <button onClick={onAddPhotos}>+ Add Photos</button>
      </div>
    </div>
  )
}
