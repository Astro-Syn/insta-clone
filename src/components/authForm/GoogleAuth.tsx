import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from "../../firebase/firebase";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';


const GoogleAuth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);

      navigate("/");
    } catch (err: any) {
      setError("Google authentication failed");
    }
  }

  return (
    <div>
      {error && <p className='error-popup'>{error}</p>}

      <button onClick={handleGoogleLogin}>
        <FaGoogle/> Sign in with Google
      </button>
      
    </div>
  )
}




export default GoogleAuth;