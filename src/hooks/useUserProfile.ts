import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

const useUserProfile = () => {
  const updateProfile = async (uid: string, data: any) => {
    await updateDoc(doc(db, "users", uid), data);
  };

  return { updateProfile };
};

export default useUserProfile;
