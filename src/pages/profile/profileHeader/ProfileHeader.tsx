import React from 'react';
import './ProfileHeader.css';
import UpdateProfile from '../../../components/updateProfile/UpdateProfile';

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
          <button>
            <UpdateProfile/>
          </button>
        </div>
        </div>
        
          <div className='profile-numbers-info'>
          <div className='profile-follow-info'>
            <p className='profile-number'>5</p> <span>Posts</span>
          </div>
          <div className='profile-follow-info'>
               <p className='profile-number'>167</p>
          <span>Followers</span>
          </div>
          <div className='profile-follow-info'>

          </div> <p className='profile-number'>137 </p>
           <span>Following</span>
         
        </div>

        <div className='profile-description'>
          <div className='profile-name'>
            Hey im Nomad
          </div>
          <div className='profile-description-text'>
            Hey there this is a brief template
          </div>
        </div>
      </div>
        
      
    </div>
  )
}
