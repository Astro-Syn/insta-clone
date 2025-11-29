import React, {useState} from 'react';
import './ProfilePost.css';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../firebase/firebase';

type ProfilePostProps = {
  img?: string;
  postId: string;
}

export default function ProfilePost({img}: ProfilePostProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");

  const postComment = async () => {
    if (!comment.trim()) return;

    await addDoc(
      collection(db, "posts", postId, "comments"),
      {
        text: comment,
        user: "Skizzo",
        createdAt: serverTimestamp()
      }
    );

    setComment("");
  }
 
  return (
    <>
    <div className='post' onClick={() => setIsOpen(true)}>
      {img ? <img className='post-image' src={img} alt="post" /> : "image not avaliable"}
      <div className='image-cover'>
        <span>Likes: </span>
        <span>Comments: </span>
      </div>
    </div>
    {isOpen && (
      <div className='modal-overlay' onClick={() => setIsOpen(false)}>
        <div className='modal-content' onClick={(e) => e.stopPropagation()}>

          <div className='modal-left'>
            <img src={img} alt="big-post" className='modal-image'/>
          </div>
          <div className='modal-right'>
            <h2>Comments</h2>
            <div>
              Comments box: 
              example: 
                user: hey nice pic!
            </div>

            {/*Comments section */}
            <div className='comments-box-section'>
            <input
            type='text'
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            />
            <button
            onClick={postComment}
            >Post</button>
          </div>
          </div>
        </div>
      </div>
    )}

  </>
  )
}