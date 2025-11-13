import React from 'react'
import '../suggestedUsers/SuggestedHeader.css';
import {Link} from 'react-router-dom';


export default function SuggestedHeader() {
  return (
    <div className='suggested-header-container'>
      
        <div className='profile-pic'>
          <img src='/Images/profile-pic.jpg'/>
        </div>
        <p>username</p>
      
      
      <Link
      to={"/auth"}
      >
        Log out
      </Link>
    </div>
  )
}
