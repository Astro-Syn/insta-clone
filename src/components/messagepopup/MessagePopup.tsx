import { useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import "./MessagePopup.css";

interface MessagePopupProps {
  targetUid: string;
  targetUsername: string;
  onClose: () => void;
}

export default function MessagePopup({
  targetUid,
  targetUsername,
  onClose
}: MessagePopupProps) {
  const [text, setText] = useState("");
  const navigate = useNavigate();
  const user = auth.currentUser;

  const sendMessage = async () => {
    if (!text.trim() || !user) return;

    
    const convoQuery = query(
      collection(db, "conversations"),
      where("participants", "array-contains", user.uid)
    );

    const snap = await getDocs(convoQuery);

    let conversationId: string | null = null;

    snap.forEach(docSnap => {
      const data = docSnap.data();
      if (data.participants.includes(targetUid)) {
        conversationId = docSnap.id;
      }
    });

    
    if (!conversationId) {
      const convoRef = await addDoc(collection(db, "conversations"), {
        participants: [user.uid, targetUid],
        lastMessage: text,
        lastSender: user.uid,
        lastUpdated: serverTimestamp()
      });

      conversationId = convoRef.id;
    }

    
    await addDoc(
      collection(db, "conversations", conversationId, "messages"),
      {
        senderId: user.uid,
        text,
        createdAt: serverTimestamp(),
        readBy: [user.uid]
      }
    );

    onClose();
    navigate(`/messages/${conversationId}`);
  };

  return (
    <div className="message-popup-overlay" onClick={onClose}>
      <div
        className="message-popup-container"
        onClick={e => e.stopPropagation()}
      >
        <button className="message-close-btn" onClick={onClose}>
          ✖
        </button>

        <div className="message-popup-header">
          <p>Send message to <strong>@{targetUsername}</strong></p>
        </div>

        <textarea
          className="message-box"
          placeholder="Write a message..."
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <button className="send-btn" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
