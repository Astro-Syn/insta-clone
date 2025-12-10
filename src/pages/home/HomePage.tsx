import React from 'react';
import '../home/HomePage.css';
import FeedPosts from '../../components/feedPosts/FeedPosts';
import SuggestedUsers from '../../components/suggestedUsers/SuggestedUsers';
import ThemeSwitcher from '../../components/themeSwitcher/ThemeSwitcher';


export default function HomePage() {
  return (
    <div className='home-container'>
     
      <div className='home-contents'>
        <div className='scroll-feed'>
          <FeedPosts/>
         
          
        </div>
        <div>
          
        </div>
        <div className='suggested-users'>
          <SuggestedUsers/>
        </div>
        <div className='theme-switcher-container'>
            <ThemeSwitcher/>
        </div>
         
      </div>
    </div>
  )
}
