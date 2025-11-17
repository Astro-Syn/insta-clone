import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';

export default function useSignUpWithEmailAndPassword() {
const [
  createUserWithEmailAndPassword,
  user,
  loading,
  error,
] = useCreateUserWithEmailAndPassword(auth);


    const signup = async = (inputs) => {
        if(!inputs.email || !inputs.password || !inputs.username || !inputs.fullName){
            console.log("Please fill all the fields")
            return
        }
        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)
            if(!newUser && error){
                console.log(error)
                return
            }

        } catch (error) {
            console.log(error)
        }
    }

  return (
    {loading, error, signup}
  )
}
