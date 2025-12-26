import { useEffect, useState } from "react";
import "../feedPosts/FeedPosts.css";
import FeedPost from "./feedPost/FeedPost";
import { db } from "../../firebase/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import { characters } from "../../data/characters";

type FeedItem = {
  id: string;
  uid: string;
  username: string;
  profilePicURL?: string;
  img: string;
  caption: string;
  createdAt: number;
  isNPC?: boolean;
};

export default function FeedPosts({feedMode }: {feedMode: 'regular' | 'daysgone'}) {
  const [feed, setFeed] = useState<FeedItem[]>([]);

useEffect(() => {
  const q = query(
    collection(db, "posts"),
    orderBy("createdAt", "desc")
  );

  const unsub = onSnapshot(q, snap => {
    const firebasePosts: FeedItem[] = snap.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        uid: data.uid,
        username: data.username,
        profilePicURL: data.profilePicURL,
        img: data.img,
        caption: data.caption,
        createdAt: data.createdAt?.toMillis?.() || Date.now(),
        isNPC: false
      };
    });

    const npcPosts: FeedItem[] = Object.values(characters).flatMap(
      (char: any) =>
        (char.posts || []).map((post: any, index: number) => ({
          id: `npc-${char.uid}-${index}`,
          uid: char.uid,
          username: char.username,
          profilePicURL: char.profilePicUrl,
          img: post.img,
          caption: post.caption || "",
          createdAt: Date.now() - Math.random() * 100000000,
          isNPC: true
        }))
    );

    let merged: FeedItem[] = [];

    if (feedMode === 'regular') {
      merged = firebasePosts;
    }

    if (feedMode === 'daysgone') {
      merged = npcPosts;
    }

    setFeed(merged);
  });

  return () => unsub();
}, [feedMode]);


  return (
    <div className="posts-container">
      {feed.map(post => (
        <FeedPost
          key={post.id}
          postId={post.id}
          img={post.img}
          caption={post.caption}
          username={post.username}
          profilePicURL={post.profilePicURL}
          userId={post.uid}
          isNPC={post.isNPC}
        />
      ))}
    </div>
  );
}
