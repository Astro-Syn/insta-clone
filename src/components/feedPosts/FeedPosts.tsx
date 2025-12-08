import React, { useEffect, useState } from 'react';
import '../feedPosts/FeedPosts.css';
import FeedPost from './feedPost/FeedPost';
import { db } from '../../firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { characters } from '../../data/characters';


type FeedItem = {
  uid: string;
  username: string;
  profilePicURL?: string;
  img: string;
  post: string;
  timestamp: number;
};

export default function FeedPosts() {
  const [feed, setFeed] = useState<FeedItem[]>([]);

  useEffect(() => {
    const loadFeed = async () => {
      let combinedPosts: FeedItem[] = [];

  
      const characterPosts: FeedItem[] = Object.values(characters).flatMap(
        (char: any) =>
          (char.posts || []).map((post: any) => ({
            uid: char.uid, 
            username: char.username,
            profilePicURL: char.profilePicUrl || char.profilePicURL,
            img: post.img,
            post: post.caption,
            timestamp: Date.now() + Math.random(),
          }))
      );

      combinedPosts = [...characterPosts];

   
      try {
        const usersSnap = await getDocs(collection(db, 'users'));
        usersSnap.forEach(docSnap => {
          const data = docSnap.data();
          const username = data.username || 'Nomad';

          if (data.photos && Array.isArray(data.photos)) {
            data.photos.forEach((photoURL: string) => {
              combinedPosts.push({
                uid: docSnap.id,
                username,
                profilePicURL:
                  data.profilePicURL ||
                  data.profilePicUrl ||
                  '/Images/profile-pic.jpg',
                img: photoURL,
                post: data.bio || '',
                timestamp: data.createdAt || Math.random(),
              });
            });
          }
        });
      } catch (err) {
        console.error('Error fetching Firebase users:', err);
      }

    
      combinedPosts.sort(() => Math.random() - 0.5);

      setFeed(combinedPosts);
    };

    loadFeed();
  }, []);

  return (
    <div className='posts-container'>
     
      {feed.map((post, i) => (
        <FeedPost
          key={i}
          username={post.username}
          img={post.img}
          post={post.post}
          profilePicURL={post.profilePicURL}
          userId={post.uid}
        />
      ))}

      
    </div>
  );
}
