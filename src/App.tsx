import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/home/HomePage";
import AuthPage from "./pages/auth/AuthPage";
import ErrorBoundary from "./components/ErrorBoundary";
import PageLayout from "./Layout/PageLayout/PageLayout";
import ProfilePage from "./pages/profile/profilePage/ProfilePage";


function App() {
  

  return (
    <>
    <BrowserRouter>
    <ErrorBoundary fallback={<p>Something went wrong.</p>}>
    <PageLayout>
    <Routes>

      <Route path='/auth' element={<AuthPage />}/>
      <Route  path='/' element={<HomePage />}/>
      <Route path='/:username' element={<ProfilePage/>}/>
      <Route path='/profile' element={<ProfilePage />} />
      
    </Routes>
    </PageLayout>
     </ErrorBoundary>
     </BrowserRouter>
    </>
  )
}

export default App
