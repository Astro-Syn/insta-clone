import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/home/HomePage";
import AuthPage from "./pages/auth/AuthPage";
import ErrorBoundary from "./components/ErrorBoundary";
import PageLayout from "./Layout/PageLayout/PageLayout";
import ProfilePage from "./pages/profile/profilePage/ProfilePage";
import UpdateProfile from "./components/updateProfile/UpdateProfile";
import Search from "./pages/search/Search";
import Notifications from "./pages/notifications/Notifications";
import './themeStyles/themes.css';

function App() {
  

  return (
    <>
    <BrowserRouter>
    <ErrorBoundary fallback={<p>Something went wrong.</p>}>
    <PageLayout>
    <Routes>

      <Route path='/auth' element={<AuthPage />}/>
      <Route path='/' element={<HomePage />}/>
  
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/profile/edit' element={<UpdateProfile/>}/>
      <Route path='/profile/:userId' element={<ProfilePage/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/notifications' element={<Notifications/>}/>

    </Routes>
    </PageLayout>
     </ErrorBoundary>
     </BrowserRouter>
    </>
  )
}

export default App
