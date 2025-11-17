import React, { useState, useEffect } from 'react';
import './ProfilePosts.css'
import ProfilePost from '../profilePost/ProfilePost';

export default function ProfilePosts() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
  }, [])


  return (
    <div className='profile-posts-container'>
      {isLoading && [0, 1, 2, 3, 4, 5].map((_,idx) => (
        <div className='image-holder loading-box' key={idx}>
        </div>
      ))}

      {!isLoading && (
        <>
        <ProfilePost img='/Images/days-gone-scenery1.png'/>
        <ProfilePost img='/Images/days-gone-scenery2.png'/>
        <ProfilePost/>
        <ProfilePost/>
        </>

      )}
    </div>
  )
}
