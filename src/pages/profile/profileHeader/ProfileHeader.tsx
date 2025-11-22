import React, { useEffect, useState } from 'react';
import './ProfileHeader.css';
import UpdateProfile from '../../../components/updateProfile/UpdateProfile';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function ProfileHeader() {
  const [user] = useAuthState(auth);
  const [bio, setBio] = useState('');
  const db = getFirestore();
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);

  useEffect(() => {
    const fetchBio = async () => {
      if (user?.uid) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setBio(userDoc.data()?.bio || "No bio available");
        }
      }
    };
    fetchBio();
  }, [user?.uid, db]);

  return (
    <div className='profile-header-container'>
      <div className='profile-image'>
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
            <button onClick={() => setShowUpdateProfile(true)}>
              Edit Profile
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
            <p className='profile-number'>137</p>
            <span>Following</span>
          </div>
        </div>

        <div className='profile-description'>
          <div className='profile-name'>
            Hey I'm Nomad
          </div>
          <div className='profile-description-text'>
            {bio || "This is your bio"}
          </div>
        </div>
      </div>
      {showUpdateProfile && (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="close-btn" onClick={() => setShowUpdateProfile(false)}>
        X
      </button>
      <UpdateProfile />
    </div>
  </div>
)}

    </div>
  );
}
