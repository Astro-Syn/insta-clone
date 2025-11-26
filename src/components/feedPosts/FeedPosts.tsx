import React from 'react';
import "../feedPosts/FeedPosts.css";
import FeedPost from './feedPost/FeedPost';

export default function FeedPosts() {
  return (
    <div className='posts-container'>
      <FeedPost
      username='mad-dog_22'
      img='/Images/majima.png'
      post='FEELIN CRAZY TONIGHT!!!'
      />
      <FeedPost
      username='loYal_Skizz00'
      img='/Images/skizzo.jpg'
      post = "Can't trust anyone these days ya know"
      />
      <FeedPost
      username='Deacon'
      img='/Images/deacon.png'
      post = 'Another day'
      />
    </div>
  )
}
