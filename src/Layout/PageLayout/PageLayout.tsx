import React from 'react';
import SideBar from '../../components/SideBar/SideBar';
import { useLocation } from 'react-router-dom';

export default function PageLayout({children}: {children: React.ReactNode}) {
    const {pathname} = useLocation()
  return (
    <div>
        <div>
            {pathname !== '/auth' ? (
            <div>
            <SideBar/>
            </div>
            ) : null} 
                
            
        </div>
        <div>
            {children}
        </div>
    </div>
  )
}
