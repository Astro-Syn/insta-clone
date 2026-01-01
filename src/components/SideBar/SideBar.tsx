import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../SideBar/SideBar.css";

import { IoMdNotifications, IoMdHome, IoMdClose } from "react-icons/io";
import { RiProfileLine } from "react-icons/ri";
import { FaRegEnvelope, FaSearch } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import useLogout from "../../hooks/useLogout";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import ThemeSwitcher from "../themeSwitcher/ThemeSwitcher";

const SideBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [authUser] = useAuthState(auth);
  const { handleLogout } = useLogout();

  const sideBarItems = [
    {
      text: "Home",
      link: "/",
      icon: <IoMdHome />,
    },
    {
      text: "Search",
      link: "/search",
      icon: <FaSearch />,
    },
    {
      text: "Activity",
      link: "/activity",
      icon: <IoMdNotifications />,
    },
    {
      text: "Messaging",
      link: "/messaging",
      icon: <FaRegEnvelope />,
    },
    {
      text: "Profile",
      link: `/profile/${authUser?.uid}`,
      icon: <RiProfileLine />,
    },
  ];

  return (
    <>
      
      <button
        className="hamburger-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle sidebar"
      >
        {isOpen ? <IoMdClose /> : <RxHamburgerMenu />}
      </button>

      
      {isOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}

      
      <aside className={`sidebar-container ${isOpen ? "open" : ""}`}>
        
        <Link to="/" onClick={() => setIsOpen(false)}>
          <button className="driftergram-logo">
            <img
              src="/Images/driftergram.png"
              alt="Driftergram"
              className="logo-pic"
            />
          </button>
        </Link>

        
        <nav className="sidebar-links-container">
          {sideBarItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="sidebar-items"
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span className="item-text">{item.text}</span>
            </Link>
          ))}
        </nav>

    
        <div className="toggle-theme-container">
          <ThemeSwitcher />
        </div>

        
        <div className="logout-btn-container">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
    
      </aside>
    </>
  );
};

export default SideBar;
