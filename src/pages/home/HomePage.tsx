import '../home/HomePage.css';
import FeedPosts from '../../components/feedPosts/FeedPosts';
import SuggestedUsers from '../../components/suggestedUsers/SuggestedUsers';



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
         
      </div>
    </div>
  )
}
