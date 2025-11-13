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
      post = 'These h03$ aint loyal, know what im saYin?!'
      />
      <FeedPost
      username='Deacon'
      img='/Images/deacon.png'
      post = 'Another day'
      />
    </div>
  )
}
