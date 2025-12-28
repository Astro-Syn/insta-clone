import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  getDoc,
  doc
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import "./Messaging.css";

interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: string;
  lastUpdated?: any;
  otherUser?: {
    uid: string;
    username: string;
    profilePicUrl?: string;
  };
}

export default function Messaging() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "conversations"),
      where("participants", "array-contains", user.uid)
    );

    const unsubscribe = onSnapshot(q, async snapshot => {
      const convos: Conversation[] = [];

      for (const docSnap of snapshot.docs) {
        const data = docSnap.data();

        const otherUid = data.participants.find(
          (uid: string) => uid !== user.uid
        );

        let otherUserData: Conversation["otherUser"] | undefined;

        if (otherUid) {
          const userSnap = await getDoc(doc(db, "users", otherUid));
          if (userSnap.exists()) {
            const u = userSnap.data();

            otherUserData = {
              uid: otherUid,
              username: u.username,
              profilePicUrl: u.profilePicURL || u.profilePicUrl
            };
          }
        }

        convos.push({
          id: docSnap.id,
          participants: data.participants,
          lastMessage: data.lastMessage,
          lastUpdated: data.lastUpdated,
          otherUser: otherUserData
        });
      }

      setConversations(convos);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) {
    return <p>You must be logged in to view messages.</p>;
  }

  return (
    <div className="messages-container">
      <h2 className="messages-title">Messages</h2>

      <div className="messages-box">
        {conversations.length === 0 && (
          <p className="no-messages">No conversations yet.</p>
        )}

        {conversations.map(convo => (
          <Link
            key={convo.id}
            to={`/messages/${convo.id}`}
            className="conversation-item"
          >
            <img
              src={
                convo.otherUser?.profilePicUrl ||
                "/Images/profile-pic.jpg"
              }
              className="conversation-avatar"
              alt="User avatar"
            />

            <div className="conversation-text">
              <strong className="msg-username-text">
                {convo.otherUser?.username || "User"}
              </strong>
              <p>{convo.lastMessage || "Start the conversation"}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
