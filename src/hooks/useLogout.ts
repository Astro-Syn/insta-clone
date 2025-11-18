import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
     const [signOut, isLoggingOut, error] = useSignOut(auth);
     const navigate = useNavigate();
  
    const handleLogout = async () => {
        try {
            await signOut();
            localStorage.removeItem('user-info');

            navigate("/auth");
        } catch (error) {
            console.error('Sorry, something went wrong')
        }
    }

     return {handleLogout, isLoggingOut, error} 
}

export default useLogout