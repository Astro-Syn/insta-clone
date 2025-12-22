import React from 'react';
import './TopBar.css';
import '../../components/suggestedUsers/SuggestedHeader';
import SuggestedHeader from '../../components/suggestedUsers/SuggestedHeader';

export const TopBar = () => {
  return (
    <div className='topbar-container'>
        <div className='users-container'>
        <div className='user-select'>
            <p>Regular Feed</p>
        </div>

        <div className='user-select'>
            <p>Days Gone Feed</p>
        </div>

        
        </div>

        <SuggestedHeader/>
    </div>
  )
}
