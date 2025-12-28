import React from 'react'
import '../suggestedUsers/SuggestedHeader.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import { Link } from 'react-router-dom';

export default function SuggestedHeader() {
  const [user] = useAuthState(auth);
  const [authUser] = useAuthState(auth);

  return (
    <div className='suggested-header-container'>
      <div className='logout-text'>

      <Link to={`/profile/${authUser?.uid}`}
      className='pic-and-username-top'
      >
      
      
        <div className='profile-pic'>
          <img src={user?.photoURL || '/Images/profile-pic.jpg'}/>
        </div>
        <div 
        className='logout-username'
       
        >
        {user?.displayName || 'username'}
        </div>
        </Link>
      
      
      <Link
      to={"/auth"}
      >
        Log out
      </Link>
      </div>
    </div>
  )
}
