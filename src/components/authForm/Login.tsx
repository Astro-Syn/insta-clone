import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase"; 
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, inputs.email, inputs.password);

      onLoginSuccess();
      navigate("/"); 
    } catch (err: any) {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <>
      {errorMessage && (
        <div className="error-popup">
          {errorMessage}
        </div>
      )}

      <form 
      className='login-section'
      onSubmit={handleSubmit}>
        <input
          className='login-input-bar'
          placeholder="Email"
          type="email"
          value={inputs.email}
          onChange={(e) => setInputs({...inputs, email:e.target.value})}
        />

        <input
          className='login-input-bar'
          placeholder="Password"
          type="password"
          value={inputs.password}
          onChange={(e) => setInputs({...inputs, password:e.target.value})}
        />

        <button type="submit">Log in</button>
        
      </form>
    </>
  )
}

export default Login;
