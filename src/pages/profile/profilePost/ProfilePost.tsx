import React, {useState} from 'react';
import './ProfilePost.css';

type ProfilePostProps = {
  img?: string;
}

export default function ProfilePost({img}: ProfilePostProps) {
  const [isOpen, setIsOpen] = useState(false);

 
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
            />
            <button>Post</button>
          </div>
          </div>
        </div>
      </div>
    )}

  </>
  )
}
