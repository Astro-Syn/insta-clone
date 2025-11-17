import { useState } from "react"


interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  }

         const [inputs, setInputs] = useState({
            email: "",
            password: "",
            
         })
  return (
    <>
    <input
                onSubmit={handleSubmit}
                placeholder='Email'
                type='email'
                value={inputs.email}
                size={"sm"}
                onChange={(e) => setInputs({...inputs, email:e.target.value})}
                />
                <input
                onSubmit={handleSubmit}
                placeholder='password'
                type='password'
                size={"sm"}
                value={inputs.password}
                onChange={(e) => setInputs({...inputs, password:e.target.value})}
                />

                <button>Log in</button>
    </>
  )
}

export default Login;