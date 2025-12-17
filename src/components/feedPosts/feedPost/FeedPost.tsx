import React, { useState } from "react";
import "../feedPost/FeedPost.css";
import PostHeader from "../postHeader/PostHeader";
import LikeButton from "../../likebtn/LikeButton";
import ProfilePost from "../../../pages/profile/profilePost/ProfilePost";

interface FeedPostProps {
  postId: string;
  img: string;
  caption: string;
  username: string;
  profilePicURL?: string;
  userId: string;
  isNPC?: boolean;
}

const FeedPost: React.FC<FeedPostProps> = ({
  postId,
  img,
  caption,
  username,
  profilePicURL,
  userId,
  isNPC = false
}) => {
  const [openPost, setOpenPost] = useState(false);

  return (
    <>
    
      <div className="feed-post-container">
        <PostHeader
          username={username}
          avatar={profilePicURL}
          userId={userId}
        />

        <img
          className="feed-post-image"
          src={img}
          alt={caption}
          onClick={() => setOpenPost(true)}
        />

        <div className="feed-post-footer">
          
          {!isNPC && (
            <LikeButton postId={postId} />
          )}

          <p className="feed-caption">
            <strong>{username}</strong> {caption}
          </p>
        </div>
      </div>

   
      {openPost && (
        <ProfilePost
          img={img}
          postId={postId}
          caption={caption}
          user={{
            uid: userId,
            username,
            profilePicUrl: profilePicURL
          }}
        />
      )}
    </>
  );
};

export default FeedPost;
