import { useUpdateProfile } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import './UpdateProfile.css';

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
  if (!image || !user?.uid) {
    console.log("No image or no user!");
    return;
  }

  console.log("UPLOAD FUNCTION STARTED");

  try {
    const storage = getStorage();
    const imageRef = ref(storage, `profile-images/${user.uid}/${image.name}`);

    await uploadBytes(imageRef, image);

    const downloadURL = await getDownloadURL(imageRef);
    console.log("Uploaded Image URL:", downloadURL);

  
    const userRef = doc(db, "users", user.uid);
    await setDoc(
      userRef,
      { profilePicURL: downloadURL },
      { merge: true }
    );

    console.log("Saved to Firestore:", downloadURL);

   
    await updateProfile({ photoURL: downloadURL });

    setPhotoURL(downloadURL);

    alert("Profile picture updated");
  } catch (err) {
    console.error("ERROR:", err);
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
    <div className="edit-profile-popup">
      <div className='update-profile-title-container'>
        <p>Update Profile</p>
      </div>

      <div className='photo-and-text-container'>

      <div className='edit-image-container'>
        {photoURL && <img src={photoURL} alt="Profile" width={200} />}
        <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] ?? null)} 
      />

      <button onClick={handleImageUpload}>Upload Image</button>

      </div>

      <div className='edit-text-container'>
        <div className='display-name-container'>
          <p>Display Name</p>
        <input
        type="text"
        placeholder="Display Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
        </div>
        

    <div className='bio-container'>
      <p>Update Bio</p>
         <input
        type="text"
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
    </div>
     

      </div>

      </div>

      
     
     
      
      
      <button onClick={handleProfileUpdate}>Update Profile</button>
    </div>
  );
};

export default UpdateProfile;
