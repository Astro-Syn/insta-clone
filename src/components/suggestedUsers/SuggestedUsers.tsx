import React from 'react';
import '../suggestedUsers/SuggestedUsers.css';
import SuggestedHeader from './SuggestedHeader';
import SuggestedUser from './SuggestedUser';

export default function SuggestedUsers() {
  return (
    <div className='suggested-users-container'>
        <SuggestedHeader/>
        

        <div className='suggested-for-you'>
          <p>Sugggested for you</p>
          <p>See All</p>
        </div>


       <div className='suggested-user-box'>

        <div className='user-suggestion'>
             <SuggestedUser  name="Skizzo" followers={1500} avatar='Images/skizzo.jpg' /> <button>Follow</button>
        </div>
           
           <div className='user-suggestion'>
              <SuggestedUser name='Boozeman' followers={2678} avatar='Images/boozer.png'/><button>Follow</button>
           </div>
            
            <div className='user-suggestion'>
                <SuggestedUser name='Cope' followers={1241} avatar='Images/copeland.png'/><button>Follow</button>
            </div>
            
       </div>


<div className='creator-name-box'>
    <p>Built by: Kelsey Balajti</p>
</div>
    </div>
  )
}
