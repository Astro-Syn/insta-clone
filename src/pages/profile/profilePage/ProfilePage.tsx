import { useState } from 'react';
import './ProfilePage.css';
import ProfileHeader from '../profileHeader/ProfileHeader';
import ProfileTabs from '../profileTabs/ProfileTabs';
import ProfilePosts from '../profilePosts/ProfilePosts';

export default function ProfilePage() {
  const [openUpload, setOpenUpload] = useState(false);
  return (
    <div className='profile-page'>

      <div className='profile-page-container'>
          <div className='user-header'>
            <ProfileHeader/>
        </div>


        <div className='user-content'>
            <ProfileTabs onAddPhotos={() => {
 
  setOpenUpload(true);
}} />

            <ProfilePosts showUpload={openUpload} setShowUpload={setOpenUpload}/>
            
        </div>

      </div>
        

    </div>
  )
}
