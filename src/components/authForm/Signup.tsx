import { useState } from "react";
import useSignUpWithEmailAndPassword from '../../hooks/useSignUpWithEmailAndPassword';

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
      <div>
        <input
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={inputs.password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        />

        <div>
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide Password" : "View Password"}
          </button>
        </div>

       
        {error && <p style={{ color: "red" }}>{error.message}</p>}

     
        {loading && <p>Loading...</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </div>

      <div>
        <p>
          Already have an account?
          <button type="button" onClick={() => setIsLogin(true)}>
            Log In
          </button>
        </p>
      </div>
    </form>
  );
};

export default Signup;
