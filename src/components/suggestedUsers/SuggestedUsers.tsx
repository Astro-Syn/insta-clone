import React from 'react';
import '../suggestedUsers/SuggestedUsers.css';
import SuggestedHeader from './SuggestedHeader';
import SuggestedUser from './SuggestedUser';
import { useEffect, useState } from 'react';
import { db, auth } from '../.././firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { characters } from '../../data/characters';


export default function SuggestedUsers() {

  const [suggestedUsers, setSuggestedUsers] = useState<any[]>([]);


useEffect(() => {
  const loadUsers = async () => {
    const user = auth.currentUser;
    if (!user) return;

    // 1. Load Firestore users
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);

    const firebaseUsers = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(u => u.id !== user.uid);

    // 2. Convert character object into array
    const characterUsers = Object.entries(characters).map(([id, data]) => ({
      id,
      ...data
    }));

    // 3. Merge lists
    const combined = [...firebaseUsers, ...characterUsers];

    setSuggestedUsers(combined);
  };

  loadUsers();
}, []);




 return (
    <div className='suggested-users-container'>
      <SuggestedHeader />

      <div className='suggested-for-you'>
        <p>Suggested for you</p>
        <p>See All</p>
      </div>

      <div className='suggested-user-box'>
        {suggestedUsers.map(user => (
          <div className='user-suggestion' key={user.id}>
            <SuggestedUser 
              name={user.username}
              followers={user.followers?.length ?? 0}
              avatar={user.profilePicURL || "/Images/profile-pic.jpg"}
              userId={user.id}
            />
          </div>
        ))}
      </div>

      <div className='creator-name-box'>
        <p>Built by: Kelsey Balajti</p>
      </div>
    </div>
  );
}
