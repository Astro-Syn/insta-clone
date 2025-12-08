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

type NormalizedPost = {
  id: string;
  img: string;
  caption?: string;
  createdAt: number;
};

export default function ProfilePosts({
  userId,
  isOwner,
  showUpload,
  setShowUpload
}: ProfilePostsProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [photos, setPhotos] = useState<NormalizedPost[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [caption, setCaption] = useState("");

 
  useEffect(() => {
    const fetchPhotos = async () => {
      if (!userId) return;
      setIsLoading(true);

      
      const hardcoded = Object.values(characters).find(c => c.uid === userId);

      if (hardcoded) {
        const normalized = (hardcoded.photos || []).map(
          (post: any, index: number) => ({
            id: `char-${hardcoded.uid}-${index}`,
            img: post.img,
            caption: post.caption || "",
            createdAt: Date.now()
          })
        );

        setPhotos(normalized);
        setIsLoading(false);
        return;
      }

      
      try {
        const docRef = doc(db, "users", userId);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          const data = snap.data();

          const normalized = (data.photos || []).map(
            (post: any, index: number) => ({
              id: post.id || `fb-${userId}-${index}`,
              img: post.img || post,
              caption: post.caption || "",
              createdAt: post.createdAt || Date.now()
            })
          );

          setPhotos(normalized);
        } else {
          setPhotos([]);
        }
      } catch (err) {
        console.error("Error loading photos:", err);
        setPhotos([]);
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

      const newPost: NormalizedPost = {
        id: crypto.randomUUID(),
        img: url,
        caption: caption.trim(),
        createdAt: Date.now()
      };

      const userDocRef = doc(db, "users", user.uid);

      await updateDoc(userDocRef, {
        photos: arrayUnion(newPost)
      });

      setPhotos(prev => [...prev, newPost]);
      setSelectedFile(null);
      setPreviewURL(null);
      setCaption("");
      setShowUpload(false);

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
              <input type="file" accept="image/*" onChange={handleChoose} />
            </label>

            {previewURL && (
              <div className="preview-section">
                <img src={previewURL} className="preview-img" />

                <textarea
                  className="caption-input"
                  placeholder="Write a caption..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  maxLength={220}
                />

                <button className="post-btn" onClick={handlePost}>
                  Post
                </button>
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

      {!isLoading && photos.map(post => (
        <ProfilePost
          key={post.id}
          postId={post.id}
          img={post.img}
          caption={post.caption}
        />
      ))}
    </div>
  );
}
