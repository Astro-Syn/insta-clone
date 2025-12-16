import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import GoogleAuth from "./GoogleAuth";
import "./AuthForm.css";

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-forum-container">
      <div className="welcome-text">
        <p>Welcome Drifter</p>
      </div>

      <button
            className="swap-button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>

      <div className="auth-slider-wrapper">
        <div
          className={`auth-slider ${isLogin ? "show-login" : "show-signup"}`}
        >
          <div className="auth-panel">
            <Login onLoginSuccess={() => {}} />
          </div>

          <div className="auth-panel">
            <Signup
              setIsLogin={setIsLogin}
              onSignupSuccess={() => {}}
            />
          </div>
        </div>
      </div>

      <div className="bottom-section-signin">
        <div className="or-box">
          <p>OR</p>
        </div>

      <div className='alt-signin-btns'>
        <GoogleAuth /> 

        <button className='guest-btn'>
          Guest
        </button>
      </div>
        
       
      </div>
    </div>
  );
};

export default AuthForm;
