import {useState, useEffect} from 'react'
import { useTheme } from '../../hooks/useTheme'
import './ThemeSwitcher.css';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [animate, setAnimate] = useState(false);


  useEffect(() => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 10);
  }, [theme]);

  return (
    <div className='theme-switch-box'>
        
        <div className='theme-buttons'>
          <button 
      className={`theme-switcher ${theme === 'night' ? "active" : ""}`}
      onClick={() => setTheme("night")}
      title='Night'
    >
      <img src='/Images/icon-moon.png' alt="Night"/>
    </button>

     <button 
    className={`theme-switcher ${theme === 'lost-lake' ? "active" : ""}`}
    onClick={() => setTheme("lost-lake")}
    title="Lost Lake"
    >
      <img src='/Images/icon_sunset.png' alt="Lost Lake"/>
    </button>

     <button 
    className={`theme-switcher ${theme === 'daylight' ? "active" : ""}`}
    onClick={() => setTheme("daylight")}
    title="Daylight"    
    >
      <img src='/Images/icon_landscape.png' alt="Daylight"/>
    </button>
        </div>
    

    <div className='theme-names'>
      <div>
        <p className={`theme-label ${animate ? "show" : ""}`}>
          {theme.replace("-", " ")}
        </p>
      </div>
    </div>
    </div>
    
  )
}
