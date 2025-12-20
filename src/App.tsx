
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/home/HomePage";
import AuthPage from "./pages/auth/AuthPage";
import ErrorBoundary from "./components/ErrorBoundary";
import PageLayout from "./Layout/PageLayout/PageLayout";
import ProfilePage from "./pages/profile/profilePage/ProfilePage";
import UpdateProfile from "./components/updateProfile/UpdateProfile";
import Search from "./pages/search/Search";
import Activity from "./pages/activity/Activity";
import './themeStyles/themes.css';
import Messaging from "./pages/messaging/Messaging";
import Conversation from './pages/messaging/Conversation';


function App() {
  

  return (
    <>
    <BrowserRouter>
    <ErrorBoundary fallback={<p>Something went wrong.</p>}>
    <PageLayout>
    <Routes>

      <Route path='/auth' element={<AuthPage />}/>
      <Route path='/' element={<HomePage />}/>
      <Route path='/messaging' element={<Messaging/>}/>
      <Route path='/profile' element={<ProfilePage />} />
      <Route path='/profile/edit' element={<UpdateProfile/>}/>
      <Route path='/profile/:userId' element={<ProfilePage/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/activity' element={<Activity/>}/>
      <Route path='/messages/:conversationId' element={<Conversation/>}/>
    </Routes>
    </PageLayout>
     </ErrorBoundary>
     </BrowserRouter>
    </>
  )
}

export default App
