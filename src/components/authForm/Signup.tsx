import { useState } from "react";
import useSignUpWithEmailAndPassword from '../../hooks/useSignUpWithEmailAndPassword';
import "./Signup.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface SignupProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  onSignupSuccess: () => void;
}

const Signup: React.FC<SignupProps> = ({ setIsLogin, onSignupSuccess }) => {
  const { loading, error, signup } = useSignUpWithEmailAndPassword();

  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await signup(inputs);     
    onSignupSuccess();        
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className='signup-container'>
      <div className='signup-txt'>
        <p>Signup</p>
      </div>
      <form onSubmit={handleSubmit}> 
      <input
        placeholder="Email"
        type="email"
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />
      <input
        placeholder="Username"
        type="text"
        value={inputs.username}
        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
      />
      <input
        placeholder="Full Name"
        type="text"
        value={inputs.fullName}
        onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
      />
      <div className='password-section'>
         <input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />

         <button className='signup-password-btn' type="button" onClick={() => setShowPassword(!showPassword)}
          > {showPassword ? <FaEyeSlash /> : <FaEye />}

          <span>
            {showPassword ? " Hide Password"  : " View Password"}
          </span>
            
          </button>
      </div>
     

      <div className='btm-btn-container'>

         
               
        {error && <p style={{ color: "red" }}>{error.message}</p>}

     
        {loading && <p>Loading...</p>}

        <button className='signup-bottom-btn' type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </div>
    
     
    </form>

    </div>
    
  );
};

export default Signup;
