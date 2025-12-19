import React from 'react';
import './MessagePopup.css';

interface MessagePopupProps {
  onClose: () => void;
}

function MessagePopup({ onClose }: MessagePopupProps) {
  return (
    <div 
    className='message-popup-overlay'
    onClick={onClose}
    >
         <div 
    className='message-popup-container'
    onClick={(e) => e.stopPropagation()}
    >
        <button
        className='message-close-btn'
        onClick={onClose}
        >
            X
        </button>
        <div className='message-popup-header'>
            <p>Send message to @User</p>
        </div>
        <div className='message-box'>
            just default font for now
        </div>
    </div>
    </div>
   
  )
}

export default MessagePopup