import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  getDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import "./Conversation.css";
import { useNavigate } from "react-router-dom";



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

  const navigate = useNavigate();

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
  const data = userSnap.data();

  setOtherUser({
    uid: otherUid,
    username: data.username,
    profilePicUrl: data.profilePicURL || data.profilePicUrl
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
      <button 
      onClick={() => navigate(`/messaging`)}
      className='bk-to-msg-btn'>
        Back to Messages</button>
      <div className="conversation-area">


 <div className="conversation-header">
  <img
    src={otherUser?.profilePicUrl || "/Images/profile-pic.jpg"}
    className="conversation-header-avatar clickable"
    onClick={() =>
      otherUser?.uid && navigate(`/profile/${otherUser.uid}`)
    }
  />

  <p
    className="conversation-header-username clickable"
    onClick={() =>
      otherUser?.uid && navigate(`/profile/${otherUser.uid}`)
    }
  >
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
