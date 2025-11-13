import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/home/HomePage";
import AuthPage from "./pages/auth/AuthPage";
import ErrorBoundary from "./components/ErrorBoundary";
import PageLayout from "./Layout/PageLayout/PageLayout";


function App() {
  

  return (
    <>
    <BrowserRouter>
    <ErrorBoundary fallback={<p>Something went wrong.</p>}>
    <PageLayout>
    <Routes>

      <Route path='/auth' element={<AuthPage />}/>
      <Route  path='/' element={<HomePage />}/>
      
    </Routes>
    </PageLayout>
     </ErrorBoundary>
     </BrowserRouter>
    </>
  )
}

export default App
