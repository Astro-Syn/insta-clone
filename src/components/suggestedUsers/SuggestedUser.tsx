import React from 'react';
import '../suggestedUsers/SuggestedUser.css';

interface SuggestedUserProps {
  name: string;
  avatar: string;
  followers: number;
}


export default function SuggestedUser({name, followers, avatar}: SuggestedUserProps) {
  return (
    <div className='suggested-user-container'>
      <img src={avatar} className='user-avatar'/>
      <div className='users-info'>

        <div className='username-and-followers'>
        <p className='user name'>{name}</p>
        <p className='user followers'>{followers} followers</p>
        </div>
        
      </div>
    </div>
  )
}
