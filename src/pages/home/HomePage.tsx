import { useState } from 'react';
import '../home/HomePage.css';
import FeedPosts from '../../components/feedPosts/FeedPosts';
import SuggestedUsers from '../../components/suggestedUsers/SuggestedUsers';
import { TopBar } from '../../components/topbar/TopBar';
import ThemeSwitcher from '../../components/themeSwitcher/ThemeSwitcher';

export default function HomePage() {
  const [feedMode, setFeedMode] = useState<'regular' | 'daysgone'>('regular');

  return (
    <div className='home-container'>
      <TopBar feedMode={feedMode} setFeedMode={setFeedMode} />

      <div className='home-contents'>
        <div className='scroll-feed'>
          <FeedPosts feedMode={feedMode} />
        </div>

        <div className='suggested-users'>
          <SuggestedUsers feedMode={feedMode} />
        </div>
      </div>

      <div className='mobile-theme-switcher'>
        <ThemeSwitcher variant="mobile"/>
      </div>

      
    </div>
  );
}
