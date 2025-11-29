import React from 'react';
import "../feedPost/FeedPost.css"
import PostFooter from '../postFooter/PostFooter';
import PostHeader from '../postHeader/PostHeader';

interface userProps {
    img: string;
    username: string;
    post: string;
   
}


const FeedPost: React.FC<userProps> = ({img, username, post, profilePicURL}) => {
  return (
    <div className='feed-post-container'>
        <PostHeader 
        
        username={username}
        
        />
        <img 
        className='feed-post-image'
        src={img}/>
        <PostFooter 
        username={username}
        post={post}
        />
    </div>
  )
}

export default FeedPost;
