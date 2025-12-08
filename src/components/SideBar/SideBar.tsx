import React from 'react';
import { Link } from 'react-router-dom';
import '../SideBar/SideBar.css';
import { IoMdNotifications } from "react-icons/io";
import { RiProfileLine } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import useLogout from '../../hooks/useLogout';
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../../firebase/firebase';


export default function SideBar() {
      const [authUser] = useAuthState(auth);
    const sideBarItems = [
        {
            text: "Home",
            link: "/",
            icon: <IoMdHome/>,
            
        },
         {
            text: "Search",
            link: "/search",
            icon: <FaSearch />,
            
        },
         {
            text: "Notifications",
            link: "/notifications",
            icon: <IoMdNotifications />,
            
        },
         
         {
            text: "Profile",
            link: `/profile/${authUser?.uid}`,
            icon: <RiProfileLine />,
        
        },
    ];

   const {handleLogout, isLoggingOut} =  useLogout();
   
  return (
    <div className='sidebar-container'>
        
        
        <div>
            <Link to={"/"}>
            <button className='driftergram-logo'>
                <img src='/Images/driftergram.png' className='logo-pic'/>
            </button>
            </Link>

          
        </div>
        <div className='sidebar-links-container'>
        {sideBarItems.map((item, index) => (
            <Link 
            className='sidebar-items'
            key={index}
            to={item.link ?? "#"}
            
            >
                {item.icon}
                {item.text}
            </Link>
           
        ))}
         
        </div>
        {/*Logout */}
            <div className='logout-btn-container'>
                  <div className='toggle-mode-container'>
            <img src='/Images/dark-mode.png'/>
        </div>

                <button className='logout-btn'
                onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
    </div>
  )
}
