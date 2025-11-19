import React from 'react';
import './ProfileHeader.css';
import UpdateProfile from '../../../components/updateProfile/UpdateProfile';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/firebase';

export default function ProfileHeader() {
  const [user] = useAuthState(auth);


  return (
    <div className='profile-header-container'>
        <div className='profile-image'>
          {user?.photoURL || "default image"}
          <img
          src={user?.photoURL || 'default-image-url.jpg'}
          alt="Profile"
          width={100}
          height={100}
          />
        </div>

      <div className='user-info-container'>
          <div className='user-and-edit-profile'>
            <div className='profile-username'>
          {user?.displayName || "Nomad"}
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
            {user?.bio || "Hey this is a bio"}
          </div>
        </div>
      </div>
        
      
    </div>
  )
}
