import { useUpdateProfile } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

const UpdateProfile = () => {
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [updateProfile, updating, error] = useUpdateProfile(auth);
  const [user] = useAuthState(auth);
  const db = getFirestore();
  


  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setPhotoURL(user.photoURL || '');
      
     
      const fetchBio = async () => {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setBio(userDoc.data()?.bio || ''); 
        }
      };
      fetchBio();
    }
  }, [user, db]);
 
  const handleImageUpload = async () => {
    if (image && user?.uid) {
      const storage = getStorage();
      const imageRef = ref(storage, `profile-images/${user.uid}/${image.name}`);
      try {
        await uploadBytes(imageRef, image);
        const downloadURL = await getDownloadURL(imageRef);
        setPhotoURL(downloadURL); 
      } catch (err) {
        console.error("Error uploading image:", err);
      }
    }
  };


  const handleBioUpdate = async () => {
    if (user?.uid) {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { bio }, { merge: true });
    }
  };


  const handleProfileUpdate = async () => {
    const updates: any = {};

    if (displayName !== user?.displayName) {
      updates.displayName = displayName;
    }
    if (photoURL !== user?.photoURL) {
      updates.photoURL = photoURL;
    }

    if (bio !== user?.bio) {
      await handleBioUpdate(); 
    }

    if (Object.keys(updates).length > 0) {
      await updateProfile(updates);  
      alert('Profile updated successfully');
    } else {
      alert('No changes made.');
    }
  };

  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (updating) {
    return <p>Updating...</p>;
  }

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Display Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] ?? null)} 
      />
      <input
        type="text"
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <button onClick={handleImageUpload}>Upload Image</button>
      {photoURL && <img src={photoURL} alt="Profile" width={100} />}
      <button onClick={handleProfileUpdate}>Update Profile</button>
    </div>
  );
};

export default UpdateProfile;
