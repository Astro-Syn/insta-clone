import React, { useState} from 'react';
import '../postFooter/PostFooter.css';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import type PostHeader from '../postHeader/PostHeader';

interface PostFooterProps {
  username: string;
  post: string;
}


const PostFooter: React.FC<PostFooterProps> = ({ username, post }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(1000);

  const handleLike = () => {
    if(liked){
      setLiked(false);
      setLikes(likes - 1);
    }
    else {
      setLiked(true);
      setLikes(likes + 1);
    }
  }


  return (
    <div className='post-footer-container'>
      <button
      className='post-footer-like-status'
      onClick={handleLike}
      >
        {!liked ? (<FaHeart className='liked-heart' color='rgb(179, 214, 230)'/>) : (<FaRegHeart className='unlike-heart'/>)}
      </button>

      <div className='post-comments-section'>
        <p className='likes'>{likes} likes</p>
        <p>
          {username}
        </p>
        <p>
          {post}
        </p>
        <span>
          View all 1,500 comments
        </span>
        <div className='input-area'>
          <input
          placeholder='add a comment...'
          />
          <button>Post</button>
        </div>
      </div>
    </div>
  )
}

export default PostFooter;