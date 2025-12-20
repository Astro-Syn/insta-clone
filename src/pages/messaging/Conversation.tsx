import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import "./Conversation.css";

type UserPreview = {
  uid: string;
  username: string;
  profilePicUrl?: string;
}


type Message = {
  id: string;
  senderId: string;
  text: string;
  createdAt: any;
};

export default function Conversation() {
  const { conversationId } = useParams();
  const user = auth.currentUser;
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [otherUser, setOtherUser] = useState<UserPreview | null>(null);


  useEffect(() => {
  if (!conversationId || !user) return;

  const fetchOtherUser = async () => {
    const convoSnap = await getDoc(doc(db, "conversations", conversationId));
    if (!convoSnap.exists()) return;

    const data = convoSnap.data();
    const otherUid = data.participants.find((uid: string) => uid !== user.uid);
    if (!otherUid) return;

    const userSnap = await getDoc(doc(db, "users", otherUid));
    if (userSnap.exists()) {
      setOtherUser({
        uid: otherUid,
        ...(userSnap.data() as any)
      });
    }
  };

  fetchOtherUser();
}, [conversationId, user]);



  useEffect(() => {
    if (!conversationId) return;

    const q = query(
      collection(db, "conversations", conversationId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, snap => {
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];

      setMessages(data);
    });

    return () => unsub();
  }, [conversationId]);

  const sendMessage = async () => {
    if (!text.trim() || !user || !conversationId) return;

    await addDoc(
      collection(db, "conversations", conversationId, "messages"),
      {
        senderId: user.uid,
        text,
        createdAt: serverTimestamp(),
        readBy: [user.uid]
      }
    );


    await updateDoc(
      doc(db, "conversations", conversationId),
      {
        lastMessage: text,
        lastSender: user.uid,
        lastUpdated: serverTimestamp()
      }
    );

    setText("");
  };

  return (
    <div className="conversation-container">
      <div className="conversation-area">


  <div className="conversation-header">
    <img
      src={otherUser?.profilePicUrl || "/Images/profile-pic.jpg"}
      className="conversation-header-avatar"
    />
    <p className="conversation-header-username">
      {otherUser?.username || "User"}
    </p>
  </div>

 
  <div className="messages-list">
    {messages.map(msg => (
      <div
        key={msg.id}
        className={`message-row ${
          msg.senderId === user?.uid ? "sent" : "received"
        }`}
      >
        {msg.senderId !== user?.uid && (
          <img
            src={otherUser?.profilePicUrl || "/Images/profile-pic.jpg"}
            className="message-avatar"
          />
        )}

        <div className="message-bubble">
          {msg.text}
        </div>
      </div>
    ))}
  </div>

 
  <div className="message-input">
    <input
      value={text}
      onChange={e => setText(e.target.value)}
      placeholder="Type a message..."
    />
    <button onClick={sendMessage}>Send</button>
  </div>
</div>

    </div>
  );
}
