import React from 'react'
import { useTheme } from '../../hooks/useTheme'
import './ThemeSwitcher.css';

export default function ThemeSwitcher() {
  const { theme, nextTheme } = useTheme();

  return (
    <div className='theme-switch-box'>
        <button 
    className='theme-switcher'
    onClick={nextTheme}
    title={`Current theme: ${theme}`}
    >
      {theme}
    </button>
     <button 
    className='theme-switcher'
    onClick={nextTheme}
    title={`Current theme: ${theme}`}
    >
      {theme}
    </button>
     <button 
    className='theme-switcher'
    onClick={nextTheme}
    title={`Current theme: ${theme}`}
    >
      {theme}
    </button>
    </div>
    
  )
}
