
import './ProfileTabs.css';

interface ProfileTabsProps {
  isOwner: boolean;
  onAddPhotos: () => void;
}

export default function ProfileTabs({ isOwner, onAddPhotos }: ProfileTabsProps) {

  return (
    <div className='profile-tabs-container'>
      
     
      {isOwner && (
        <div className='profile-tabs-right'>
          <button
            className='add-photo-btn'
            onClick={onAddPhotos}
          >
            Add Photo
          </button>
            <div className='posts-title-container'>
        <p>Posts</p>
       </div>
        </div>
      )}
    </div>
  );
}
