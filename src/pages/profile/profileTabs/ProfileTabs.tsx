import React, { useState } from 'react';
import './ProfileTabs.css';

interface ProfileTabsProps {
  isOwner: boolean;
  onAddPhotos: () => void;
}

export default function ProfileTabs({ isOwner, onAddPhotos }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<'posts'>('posts');

  return (
    <div className='profile-tabs-container'>
      <div className='profile-tabs-left'>
        <button
          className={`profile-tab-btn ${activeTab === 'posts' ? 'active' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </button>
      </div>

      {isOwner && (
        <div className='profile-tabs-right'>
          <button
            className='add-photo-btn'
            onClick={onAddPhotos}
          >
            Add Photo
          </button>
        </div>
      )}
    </div>
  );
}
