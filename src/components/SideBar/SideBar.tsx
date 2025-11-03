import React from 'react';
import { Link } from 'react-router-dom';
import '../SideBar/SideBar.css';
import { IoMdNotifications } from "react-icons/io";
import { RiProfileLine } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { FaSearch } from "react-icons/fa";

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
            icon: <RiProfileLine />,
        
        },
    ]
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
        <div>
        {sideBarItems.map((item, index) => (
            <div 
            className='sidebar-items'
            key={index}
            >
                {item.text}
            </div>
        ))}
        </div>
    </div>
  )
}
