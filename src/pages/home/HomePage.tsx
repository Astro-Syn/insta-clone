import '../home/HomePage.css';
import FeedPosts from '../../components/feedPosts/FeedPosts';
import SuggestedUsers from '../../components/suggestedUsers/SuggestedUsers';
import '../../components/topbar/TopBar';
import { TopBar } from '../../components/topbar/TopBar';



export default function HomePage() {
  return (
    <div className='home-container'>
     <TopBar/>
      <div className='home-contents'>
        <div className='scroll-feed'>
          <FeedPosts/>
         
          
        </div>
        <div>
          
        </div>
        <div className='suggested-users'>
          <SuggestedUsers/>
        </div>
         
      </div>
    </div>
  )
}
