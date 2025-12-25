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
  profilePicUrl?: string;
  followers?: string[];
  following?: string[];
  photos?: any[];
  email?: string;
  createdAt?: number;
};

export default function ProfilePage() {
  const { userId: routeId } = useParams<{ userId: string }>();
  const [authUser] = useAuthState(auth);


  const resolvedUserId =
    (routeId && characters[routeId]?.uid) || routeId || null;

  const [userData, setUserData] = useState<ProfileUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [openUpload, setOpenUpload] = useState(false);

  const isOwner = !!authUser && resolvedUserId === authUser.uid;

  useEffect(() => {
    const loadProfile = async () => {
      if (!resolvedUserId) {
        setUserData(null);
        setIsLoading(false);
        return;
      }

    
      const hardcoded = Object.values(characters).find(
        c => c.uid === resolvedUserId
      );

      if (hardcoded) {
        setUserData(hardcoded as ProfileUser);
        setIsLoading(false);
        return;
      }

      try {
        const userRef = doc(db, 'users', resolvedUserId);
        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
          const data = snapshot.data() as ProfileUser;
          
          setUserData({ ...data, uid: resolvedUserId });
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
  }, [resolvedUserId]);

  const handleUserChange = (updated: ProfileUser) => {
    setUserData(updated);
  };

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
          <ProfileHeader
            user={userData}
            isOwner={isOwner}
            onUserChange={handleUserChange}
          />
        </div>

        <div className='user-content'>
          <ProfileTabs
            isOwner={isOwner}
            onAddPhotos={() => setOpenUpload(true)}
          />
          <div className='gallery-text'>Gallery</div>
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
