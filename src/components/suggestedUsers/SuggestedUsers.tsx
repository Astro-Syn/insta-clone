import React, { useEffect, useState } from 'react';
import '../suggestedUsers/SuggestedUsers.css';
import SuggestedHeader from './SuggestedHeader';
import SuggestedUser from './SuggestedUser';
import { db, auth } from '../../firebase/firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { characters } from '../../data/characters';


function shuffleArray(array: any[]) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


function weightedSort(array: any[]) {
  return array
    .map(user => ({
      ...user,
      weight: Math.random() * 0.5 + user.score 
    }))
    .sort((a, b) => b.weight - a.weight);
}

export default function SuggestedUsers() {
  const [suggestedUsers, setSuggestedUsers] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const loadUsers = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const userSnap = await getDoc(doc(db, "users", user.uid));
      const currentUserData = userSnap.exists() ? userSnap.data() : {};
      setCurrentUser(currentUserData);

      const followingList = currentUserData.following || [];

     
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);

      const firebaseUsers = snapshot.docs
        .map(docSnap => {
          const d = docSnap.data();
          return {
            id: docSnap.id,
            uid: d.uid || docSnap.id,
            username: d.username,
            followers: d.followers || [],
            profilePicUrl: d.profilePicURL || d.profilePicUrl,
            score: 1 
          };
        })
        .filter(u => u.uid !== user.uid); 

      
      const characterUsers = Object.values(characters).map(c => ({
        id: c.uid,
        uid: c.uid,
        username: c.username,
        followers: c.followers || [],
        profilePicUrl: c.profilePicUrl,
        score: 1 
      }));

     
      let combined = [...firebaseUsers, ...characterUsers];


      combined = combined.map(user => {
        let score = 1;

        
        if (!followingList.includes(user.uid)) {
          score += 1.5;
        }

      
        score += (user.followers?.length || 0) * 0.05;

        return { ...user, score };
      });

      
      const weighted = weightedSort(combined);

     
      const finalList = shuffleArray(weighted);

      setSuggestedUsers(finalList);
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
          <div className='user-suggestion' key={user.uid}>
            <SuggestedUser
              name={user.username}
              followers={user.followers?.length ?? 0}
              avatar={user.profilePicUrl || "/Images/profile-pic.jpg"}
              userId={user.uid}
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
