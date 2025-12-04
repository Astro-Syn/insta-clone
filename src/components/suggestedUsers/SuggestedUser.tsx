import { useState } from 'react';
import '../suggestedUsers/SuggestedUser.css';
import { useNavigate } from 'react-router-dom';


interface SuggestedUserProps {
  name: string;
  avatar: string;
  followers: number;
  userId: string;
}

export default function SuggestedUser({name, followers, avatar, userId}: SuggestedUserProps) {
  const navigate = useNavigate();
  const [isFollowed, setIsFollowed] = useState(false);

  
  return (
    <div className='suggested-user-container'
    onClick={() => navigate(`/profile/${userId}`)}
    >
      <img src={avatar} className='user-avatar'/>
      <div className='users-info'>

        <div className='username-and-followers'>
        <p className='user-name'>{name}</p>
        <p className='user-followers'>{followers} followers</p>

       
        
        </div>
           <button
        onClick={() => setIsFollowed(!isFollowed)}
        >

          {isFollowed ? "Unfollow" : "Follow"}
        </button>
      
        
      </div>
    </div>
  )
}
