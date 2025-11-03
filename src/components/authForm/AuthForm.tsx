import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../authForm/AuthForm.css';
import { FaGoogle } from 'react-icons/fa';

export default function AuthForm() {
     const [isLogin, setIsLogin] = useState(true);
     const [inputs, setInputs] = useState({
        email: "",
        password: "",
        confirmPassword: "",
     })
     const navigate = useNavigate();

     const handleAuth = () => {
        if(!inputs.email || !inputs.password){
            alert("Please fill in all fields");
            return;
        }
        else {
            navigate("/");
        }
        
     }
     
  return (
    <div className='auth-forum-container'>
        <div className='home-image'>
            LOGIN HELLO
        </div>
            <div className='login-forum'>
                <div className='input-info-section'>
                    <div className='input-bars'>
                        <input
                placeholder='Email'
                type='email'
                value={inputs.email}
                onChange={(e) => setInputs({...inputs, email:e.target.value})}
                />
                <input
                placeholder='password'
                type='password'
                value={inputs.password}
                onChange={(e) => setInputs({...inputs, password:e.target.value})}
                />
            {!isLogin ? (
                <input
                placeholder='Confirm Password'
                value={inputs.confirmPassword}
                onChange={(e) => setInputs({...inputs,confirmPassword:e.target.value})}
                />
            ) : null}
                    </div>
                    

            <button className='login-signup-button' onClick={handleAuth}>
                {isLogin ? "Login" : "Sign Up"}
            </button>
                </div>
                

            <div className='or-box'>
                <div></div>
                <p>OR</p>
                <div></div>
            </div>

            <div className='google-login-box'>
                <p><FaGoogle/> Log in with Google</p>
            </div>

            <div className='account-question'>
                <p>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                </p>
                <button onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Sign Up" : "Log in"}
                </button>
            </div>
            
        </div>
        
    </div>
  )
}
