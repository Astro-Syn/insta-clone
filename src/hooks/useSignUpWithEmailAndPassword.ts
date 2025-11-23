
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { doc, setDoc } from "firebase/firestore";
import { firestore } from '../firebase/firebase';


interface SignUpInputs {
  email: string;
  password: string;
  username: string;
  fullName: string;
  
}

interface UseSignUpWithEmailAndPassword {
  loading: boolean;
  error: Error | null;
  signup: (inputs: SignUpInputs) => Promise<void>;
}


const useSignUpWithEmailAndPassword = (): UseSignUpWithEmailAndPassword => {
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);
  

  const signup = async (inputs: SignUpInputs) => {
    if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullName) {
      console.log("Please fill all the fields");
      return;
    }

    try {
      const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password);

      if (error) {
        console.log(error.message);
        return;
      }

      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: inputs.email,
          username: inputs.username,
          fullName: inputs.fullName,
          bio: "",
          profilePicURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkBV1FC1itx8a88IL1ARs80PAyux7Z4xA2EmGHb1WkmHA5-DKKljNF59SF2qjD7ff-UofbqQ&s=10",
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),
        };

        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        localStorage.setItem("user-info", JSON.stringify(userDoc));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
