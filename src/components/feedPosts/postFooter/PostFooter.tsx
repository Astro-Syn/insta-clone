import React, { useState } from 'react';
import '../postFooter/PostFooter.css';
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface PostFooterProps {
  username: string;
  post: string;
}

const PostFooter: React.FC<PostFooterProps> = ({ username, post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(1000);

  const [animate, setAnimate] = useState(false);

  const handleLike = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 400);

    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
    } else {
      setLiked(true);
      setLikes(likes + 1);
    }
  };

  return (
    <div className='post-footer-container'>
      <div className='like-section'>
        <p className='likes'>{likes} likes</p>
      
      <button
        className='post-footer-like-status'
        onClick={handleLike}
      >
        <span className="like-label">
          {liked ? "Unlike" : "Like"}
        </span>

        {!liked ? (
          <FaHeart 
            className={`liked-heart ${animate ? "heart-pop" : ""}`} 
          />
        ) : (
          <FaRegHeart 
            className={`unlike-heart ${animate ? "heart-pop" : ""}`} 
          />
        )}
      </button>

      </div>
      

      <div className='post-comments-section'>
        
        <p>{username}</p>
        <p>{post}</p>

        <span>View all 1,500 comments</span>

        <div className='input-area'>
          <input placeholder='add a comment...' />
          <button>Post</button>
        </div>
      </div>

    </div>
  );
}

export default PostFooter;
