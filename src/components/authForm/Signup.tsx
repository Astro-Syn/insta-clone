import { useState } from "react"
import useSignUpWithEmailAndPassword from '../../hooks/useSignUpWithEmailAndPassword';

interface SignupProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}


const Signup: React.FC<SignupProps> = ({ setIsLogin }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

         const [inputs, setInputs] = useState({
            fullName: "",
            username: "",
            email: "",
            password: "",
         })

         const [showPassword, setShowPassword] = useState(false);
        const {loading, error, signup} =  useSignUpWithEmailAndPassword();

  return (
    <>
            <input
                placeholder='Email'
                type='email'
                size={"sm"}
                value={inputs.email}
                onChange={(e) => setInputs({...inputs, email:e.target.value})}
                />
                <input
                placeholder='Username'
                type='text'
                value={inputs.username}
                size={"sm"}
                onChange={(e) => setInputs({...inputs, username:e.target.value})}
                />
                <input
                placeholder='Full Name'
                type='text'
                value={inputs.fullName}
                size={"sm"}
                onChange={(e) => setInputs({...inputs, fullName:e.target.value})}
                />
           <div>
             <input
                placeholder='password'
                type={showPassword ? "text" : "password"}
                value={inputs.password}
                size={"sm"}
                onChange={(e) => setInputs({...inputs, password:e.target.value})}
                />

                <div>
                    <button onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? "Hide Password" : "View Password"}
                    </button>
                </div>

                <button onClick={() => setIsLogin(!isLogin)}>
                    Sign Up
                </button>
           </div>
    </>
  )
}

export default Signup;