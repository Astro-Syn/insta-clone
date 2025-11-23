import React, { useState, useEffect } from 'react';
import './ProfilePosts.css';
import ProfilePost from '../profilePost/ProfilePost';
import { db, auth, storage } from '../../../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';

interface ProfilePostsProps {
  userId: string;
  isOwner: boolean;
  showUpload: boolean;
  setShowUpload: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfilePosts({
  userId,
  isOwner,
  showUpload,
  setShowUpload
}: ProfilePostsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!userId) return;

      try {
        const userDocRef = doc(db, 'users', userId);
        const snap = await getDoc(userDocRef);

        if (snap.exists()) {
          const data = snap.data();
          setPhotos(data.photos || []);
        }
      } catch (err) {
        console.error('Error loading photos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [userId]);

  const handleChoose = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    setSelectedFile(file);

    const localURL = URL.createObjectURL(file);
    setPreviewURL(localURL);
  };

  const handlePost = async () => {
    if (!selectedFile) return;

    const user = auth.currentUser;
    if (!user || !isOwner) return;

    try {
      const storageRef = ref(storage, `userPhotos/${user.uid}/${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      const url = await getDownloadURL(storageRef);

      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        photos: arrayUnion(url),
      });

      setPhotos(prev => [...prev, url]);
      setSelectedFile(null);
      setPreviewURL(null);
    } catch (err) {
      console.error('Error uploading photo:', err);
    }
  };

  return (
    <div className='profile-posts-container'>
      
      {showUpload && isOwner && (
        <div className='upload-modal'>
          <div className='upload-modal-content'>
            <label className='upload-btn'>
              Choose Image
              <input type='file' onChange={handleChoose} />
            </label>

            {previewURL && (
              <div>
                <img src={previewURL} className='preview-img' />
                <button className='post-btn' onClick={handlePost}>
                  Post
                </button>
              </div>
            )}

            <button className='close-btn' onClick={() => setShowUpload(false)}>
              X
            </button>
          </div>
        </div>
      )}

   
      {isLoading && [0, 1, 2, 3].map((_, idx) => (
        <div className='image-holder loading-box' key={idx}></div>
      ))}

     
      {!isLoading && photos.map((p, i) => (
        <ProfilePost key={i} img={p} />
      ))}

  
      {!isOwner && showUpload && (
        <p style={{ color: 'gray', padding: '10px' }}>
          You can&apos;t upload to another user&apos;s profile.
        </p>
      )}
    </div>
  );
}
