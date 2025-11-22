import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import { useNavigate } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';


const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/');
  }

  return (
    <div className='auth-forum-container'>
      <div className='home-image'>
        LOGIN HELLO
      </div>

      <div className='login-forum'>
        <div className='input-info-section'>
          <div className='input-bars'></div>

          {/* Render Login or Signup */}
          {isLogin ? (
            <Login onLoginSuccess={handleLoginSuccess}/>
          ) : (
            <Signup setIsLogin={setIsLogin} 
            onSignupSuccess={handleLoginSuccess}
            />
          )}
        </div>

        <div className='or-box'>
          <div></div>
          <p>OR</p>
          <div></div>
        </div>

       <GoogleAuth />

        <div className='account-question'>
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>

          <button 
            className='swap-button'
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
