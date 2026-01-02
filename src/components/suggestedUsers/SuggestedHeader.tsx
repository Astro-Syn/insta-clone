import React from 'react';
import '../suggestedUsers/SuggestedHeader.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';

export default function SuggestedHeader() {
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    const isMobile = window.matchMedia("(max-width: 900px)").matches;

    if (isMobile) {
      const confirmLogout = window.confirm(
        "Are you sure you want to log out?"
      );
      if (!confirmLogout) return;
    }

    await signOut(auth);
  };

  return (
    <div className='suggested-header-container'>
      <div className='logout-text'>
        <Link
          to={`/profile/${user?.uid}`}
          className='pic-and-username-top'
        >
          <div className='profile-pic'>
            <img
              src={user?.photoURL || '/Images/profile-pic.jpg'}
              alt="profile"
            />
          </div>

          <div className='logout-username'>
            {user?.displayName || 'username'}
          </div>
        </Link>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
