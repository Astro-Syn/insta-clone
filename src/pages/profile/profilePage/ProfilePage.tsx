import { useState, useEffect } from 'react';
import './ProfilePage.css';
import ProfileHeader from '../profileHeader/ProfileHeader';
import ProfileTabs from '../profileTabs/ProfileTabs';
import ProfilePosts from '../profilePosts/ProfilePosts';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../../firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { characters } from '../../../data/characters';


type ProfileUser = {
  uid: string;
  username: string;
  fullName?: string;
  bio?: string;
  profilePicURL?: string;
  followers?: string[];
  following?: string[];
  photos?: string[];
  email?: string;
  createdAt?: number;
};

export default function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const [authUser] = useAuthState(auth);
  const [userData, setUserData] = useState<ProfileUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openUpload, setOpenUpload] = useState(false);

  
  const isOwner = authUser?.uid === userId;

  useEffect(() => {
    const loadProfile = async () => {
      if (!userId) {
        setUserData(null);
        setIsLoading(false);
        return;
      }

     const hardcoded = Object.values(characters).find(
  c => c.uid === userId
);

if (hardcoded) {
  setUserData(hardcoded);
  setIsLoading(false);
  return;
}
      try {
        const userRef = doc(db, 'users', userId);
        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
          const data = snapshot.data() as ProfileUser;
          setUserData(data);
        } else {
          setUserData(null);
        }

      } catch (err) {
        console.error('Error loading profile:', err);
        setUserData(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [userId]);

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  if (!userData) {
    return <p>User not found.</p>;
  }

  return (
    <div className='profile-page'>
      <div className='profile-page-container'>
        <div className='user-header'>
          <ProfileHeader user={userData} isOwner={isOwner} />
        </div>

        <div className='user-content'>
          <ProfileTabs
            isOwner={isOwner}
            onAddPhotos={() => setOpenUpload(true)}
          />

          <ProfilePosts
            userId={userData.uid}
            isOwner={isOwner}
            showUpload={openUpload}
            setShowUpload={setOpenUpload}
          />
        </div>
      </div>
    </div>
  );
}
