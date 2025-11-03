import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import AuthForm from '../../components/authForm/AuthForm';
import '../auth/AuthPage.css';

export default function AuthPage() {
   
  return (
    <div className='auth-page-container'>
        <div className='auth-page-content'>  
            <img src='/Images/insta-clone-fp.png'/>
            <div className='auth-form-section'>
                <AuthForm />
            </div>
        
        </div>
        
    </div>
  )
}
