import React, { useState, useEffect } from 'react';
import './ProfilePosts.css';
import ProfilePost from '../profilePost/ProfilePost';
import { db, auth, storage } from '../../../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { characters } from '../../../data/characters';

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
  const [photos, setPhotos] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      if (!userId) return;

      const hardcoded = Object.values(characters).find(
        c => c.uid === userId
      );

      if (hardcoded) {
        setPhotos(hardcoded.photos || []);
        setIsLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "users", userId);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const data = snap.data();
          setPhotos(data.photos || []);
        }
      } catch (err) {
        console.error("Error loading photos:", err);
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
    setPreviewURL(URL.createObjectURL(file));
  };

  const handlePost = async () => {
    if (!selectedFile) return;

    const user = auth.currentUser;
    if (!user || !isOwner) return;

    try {
      const storageRef = ref(storage, `userPhotos/${user.uid}/${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      const url = await getDownloadURL(storageRef);

      const newPost = {
        id: crypto.randomUUID(),
        img: url,
        createdAt: Date.now(),
      };

      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        photos: arrayUnion(newPost)
      });

      setPhotos(prev => [...prev, newPost]);
      setSelectedFile(null);
      setPreviewURL(null);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div className="profile-posts-container">

    
      {showUpload && isOwner && (
        <div className="upload-modal">
          <div className="upload-modal-content">

            <label className="upload-btn">
              Choose Image
              <input type="file" onChange={handleChoose} />
            </label>

            {previewURL && (
              <div>
                <img src={previewURL} className="preview-img" />
                <button className="post-btn" onClick={handlePost}>Post</button>
              </div>
            )}

            <button className="close-btn" onClick={() => setShowUpload(false)}>
              X
            </button>

          </div>
        </div>
      )}

     
      {isLoading && [0, 1, 2, 3].map(i => (
        <div className="image-holder loading-box" key={i}></div>
      ))}

     
      {!isLoading && photos.map((post, idx) => {

      
        if (typeof post === "string") {
          return (
            <ProfilePost
              key={`legacy-${idx}`}
              postId={`legacy-${idx}`}
              img={post}
            />
          );
        }

        
        return (
          <ProfilePost
            key={post.id}
            postId={post.id}
            img={post.img}
          />
        );
      })}
    </div>
  );
}
