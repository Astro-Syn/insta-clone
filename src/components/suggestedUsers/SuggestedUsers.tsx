import React, { useEffect, useState } from 'react';
import '../suggestedUsers/SuggestedUsers.css';

import SuggestedUser from './SuggestedUser';
import { db, auth } from '../../firebase/firebase';
import {
  collection,
  getDocs,
  doc,
  onSnapshot
} from 'firebase/firestore';
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

export default function SuggestedUsers({
  feedMode
}: {
  feedMode: 'regular' | 'daysgone';
}) {
  const [suggestedUsers, setSuggestedUsers] = useState<any[]>([]);
  const [following, setFollowing] = useState<string[]>([]);

 
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const unsub = onSnapshot(doc(db, "users", user.uid), snap => {
      if (snap.exists()) {
        setFollowing(snap.data().following || []);
      }
    });

    return () => unsub();
  }, []);

  
  useEffect(() => {
    const loadUsers = async () => {
      const user = auth.currentUser;
      if (!user) return;

    
      const snapshot = await getDocs(collection(db, "users"));
      const firebaseUsers = snapshot.docs
        .map(docSnap => {
          const d = docSnap.data();
          return {
            id: docSnap.id,
            uid: d.uid || docSnap.id,
            username: d.username,
            followers: d.followers || [],
            profilePicUrl: d.profilePicURL || d.profilePicUrl,
            score: 1,
            isNPC: false
          };
        })
        .filter(u => u.uid !== user.uid);

     
      const npcUsers = Object.values(characters).map(c => ({
        id: c.uid,
        uid: c.uid,
        username: c.username,
        followers: c.followers || [],
        profilePicUrl: c.profilePicUrl,
        score: 1,
        isNPC: true
      }));

   
      let baseUsers =
        feedMode === 'regular' ? firebaseUsers : npcUsers;

     
      baseUsers = baseUsers.map(u => {
        let score = 1;
        if (!following.includes(u.uid)) score += 1.5;
        score += (u.followers?.length || 0) * 0.05;
        return { ...u, score };
      });

      const weighted = weightedSort(baseUsers);
      const finalList = shuffleArray(weighted);

      setSuggestedUsers(finalList);
    };

    loadUsers();
  }, [feedMode, following]);

  return (
    <div className="suggested-users-container">
      <div className="suggested-for-you">
        <p>Suggested for you</p>
      </div>

      <div className="suggested-user-box">
        {suggestedUsers.map(user => (
          <div className="user-suggestion" key={user.uid}>
            <SuggestedUser
              name={user.username}
              avatar={user.profilePicUrl || "/Images/profile-pic.jpg"}
              userId={user.uid}
              following={following}
            />
          </div>
        ))}
      </div>

      <div className="creator-name-box">
        <p>Built by: Kelsey Balajti</p>
      </div>
    </div>
  );
}
