import React from 'react';
import '../feedPost/FeedPost.css';
import PostFooter from '../postFooter/PostFooter';
import PostHeader from '../postHeader/PostHeader';

interface FeedPostProps {
  img: string;
  username: string;
  post: string;
  profilePicURL?: string;
  userId: string;
}

const FeedPost: React.FC<FeedPostProps> = ({
  img,
  username,
  post,
  profilePicURL,
  userId,
}) => {
  return (
    <div className='feed-post-container'>
      <PostHeader
        username={username}
        avatar={profilePicURL}
        userId={userId}
      />

      <img
        className='feed-post-image'
        src={img}
        alt={post}
      />

      <PostFooter username={username} post={post} />
    </div>
  );
};

export default FeedPost;
