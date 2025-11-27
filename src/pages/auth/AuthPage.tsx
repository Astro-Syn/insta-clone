import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import AuthForm from '../../components/authForm/AuthForm';
import '../auth/AuthPage.css';
import ImageCarousel from '../../components/ImageCarousel';


export default function AuthPage() {
   
  return (
    <div className='auth-page-container'>
      <div className='home-logo-container'>
        <img 
        className='home-logo'
        src='/Images/driftergram.png'/>
      </div>
        <div className='auth-page-content'>  
       <ImageCarousel/>
            <div className='auth-form-section'>
               
                <AuthForm />
            </div>
        
        </div>
        
    </div>
  )
}
