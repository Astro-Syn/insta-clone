import React from 'react';
import './TopBar.css';
import '../../components/suggestedUsers/SuggestedHeader';
import SuggestedHeader from '../../components/suggestedUsers/SuggestedHeader';


interface TopBarProps {
    feedMode: 'regular' | 'daysgone'
    setFeedMode: (mode: 'regular' | 'daysgone') => void;
}

export const TopBar = ({ feedMode, setFeedMode }: TopBarProps) => {
  return (
    <div className='topbar-container'>
      <div className='users-container'>
        <div
          className={`user-select ${feedMode === 'regular' ? 'active' : ''}`}
          onClick={() => setFeedMode('regular')}
        >
          <p className='reg-feed'>Regular Feed</p>
        </div>

        <div
          className={`user-select ${feedMode === 'daysgone' ? 'active' : ''}`}
          onClick={() => setFeedMode('daysgone')}
        >
          <p className='dg-feed'>Days Gone Feed</p>
        </div>
      </div>
        <div className='sug-head-container'>
            <SuggestedHeader />
        </div>
      
    </div>
  );
};
