import {useEffect, useState} from 'react';
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { auth, db } from '../../firebase/firebase';
import './Messaging.css';


interface Conversation {
    id: string;
    participants: string[];
    lastMessage?: string;
    lastUpdated?: any;
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

        const unsuscribe = onSnapshot(q, (snapshot) => {
            const convos: Conversation[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Conversation, "id">),
            }));
            setConversations(convos);
        });

        return () => unsuscribe();
    }, [user]);

    if(!user){
        return <p>You must be logged in to view messages.</p>
    }
  return (
    <div className='messages-container'>
        
        <div className='messaging-content'>
            <h2 className='messages-title'>Messages</h2>
                {conversations.length === 0 && (
            <p className='no-messages'>No conversations yet.</p>
        )}
        <div className='messages-box'>
        {conversations.map((conversation) => (
            <Link
            key={conversation.id}
            to={`/messages/${conversation.id}`}
            className='conversation-item'
            >
                <p>{conversation.lastMessage || "Start the conversation"}</p>
            </Link>
        ))}
        </div>
        
        
        </div>
        
    </div>
  )
}
