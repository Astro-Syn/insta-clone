import React from 'react';
import { Link } from 'react-router-dom';
import '../SideBar/SideBar.css';
import { IoMdNotifications } from "react-icons/io";
import { RiProfileLine } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import useLogout from '../../hooks/useLogout';

export default function SideBar() {
    const sideBarItems = [
        {
            text: "Home",
            link: "/",
            icon: <IoMdHome/>,
            
        },
         {
            text: "Search",
            icon: <FaSearch />,
            
        },
         {
            text: "Notifications",
            icon: <IoMdNotifications />,
            
        },
         {
            text: "Create",
            
        },
         {
            text: "Profile",
            link: '/profile',
            icon: <RiProfileLine />,
        
        },
    ];

   const {handleLogout, isLoggingOut} =  useLogout();
  return (
    <div className='sidebar-container'>
        SideBar
        <div>
            <Link to={"/"}>
            <button className='insta-logo'>
                Insta Logo
            </button>
            </Link>

            <Link to={"/"}>
            <button className='insta-logo'>
                Insta Mobile Logo
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
         {/*Logout */}
            <div>
                <button
                onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    </div>
  )
}
