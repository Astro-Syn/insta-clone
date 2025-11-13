import React from 'react';
import './ProfileHeader.css';

export default function ProfileHeader() {
  return (
    <div className='profile-header-container'>
        <div className='profile-image'>
          <img src='/Images/profile-pic.jpg'/>
        </div>

      <div className='user-info-container'>
          <div className='user-and-edit-profile'>
            <div className='profile-username'>
          Nomad01
        </div>
        <div className='edit-profile-btn'>
          <button>Edit Profile</button>
        </div>
        </div>
        
          <div className='profile-numbers-info'>
          <div className='profile-follow-info'>
            <p>5</p> <span>Posts</span>
          </div>
          <div className='profile-follow-info'>
               <p>167</p>
          <span>Followers</span>
          </div>
          <div className='profile-follow-info'>

          </div> <p>137</p>
          <span>Following</span>
         
        </div>
      </div>
        
      
    </div>
  )
}
