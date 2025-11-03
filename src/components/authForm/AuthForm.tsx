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
        navigate("/");
     }
     
  return (
    <div className='auth-forum-container'>
        <div className='home-image'>
            LOGIN HELLO
        </div>
            <div className='login-forum'>
                <input
                placeholder='Email'
                type='email'
                />
                <input
                placeholder='password'
                type='password'
                />
            {!isLogin ? (
                <input
                placeholder='Confirm Password'
                />
            ) : null}

            <button>
                {isLogin ? "Login" : "Sign Up"}
            </button>
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
            </div>
            
        </div>
        
    </div>
  )
}
