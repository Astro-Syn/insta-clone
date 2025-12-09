import React from 'react'
import { useTheme } from '../../hooks/useTheme'
import './ThemeSwitcher.css';

export default function ThemeSwitcher() {
  const { theme, nextTheme } = useTheme();

  return (
    <button 
    className='theme-switcher'
    onClick={nextTheme}
    title={`Current theme: ${theme}`}
    >
      {theme}
    </button>
  )
}
