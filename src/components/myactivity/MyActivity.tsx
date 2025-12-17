import { useEffect, useState } from "react";
import "./MyActivity.css";
import { auth, db } from "../../firebase/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

type ActivityItem = {
  id: string;
  type: "like" | "comment" | "upload" | "follow";
  targetUid?: string;
  targetUsername?: string;
  postId?: string;
  postImage?: string;
  createdAt: any;
};

function MyActivity() {
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "activity"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, snap => {
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ActivityItem[];

      setActivity(data);
    });

    return () => unsub();
  }, []);

  const handleClick = (item: ActivityItem) => {
    if (item.type === "follow" && item.targetUid) {
      navigate(`/profile/${item.targetUid}`);
    }

    if ((item.type === "like" || item.type === "comment") && item.postId) {
      navigate(`/post/${item.postId}`);
    }
  };

  return (
    <div className="my-activity-container">
      <div className="my-activity-text">
        <p>Your Activity</p>
      </div>

      <div className="activity-list">
        {activity.length === 0 && (
          <p className="empty-activity">No activity yet</p>
        )}

        {activity.map(item => (
          <div
            key={item.id}
            className="activity-item"
            onClick={() => handleClick(item)}
          >
            <div className="activity-text-line">
              {item.type === "like" && (
                <p>You liked a post</p>
              )}

              {item.type === "comment" && (
                <p>You commented on a post</p>
              )}

              {item.type === "upload" && (
                <p>You uploaded a new photo</p>
              )}

              {item.type === "follow" && (
                <p>You followed <strong>{item.targetUsername}</strong></p>
              )}
            </div>

            <span className="activity-time">
              {new Date(item.createdAt?.toDate?.() || Date.now()).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyActivity;
