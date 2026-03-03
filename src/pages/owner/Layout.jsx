import React, { useEffect } from 'react'
import NavbarOwner from '../../components/Owner/NavbarOwner'
import Sidebar from '../../components/Owner/Sidebar'
import { Outlet } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {

  const{isOwner, navigate, user} = useAppContext()

 useEffect(()=>{
  if(user && !isOwner && user.role !== 'admin'){
    navigate('/')
  }
}, [isOwner, user])
  return (
    <div className='flex flex-col'>
      <NavbarOwner/>
      <div className='flex'>
        <Sidebar/>
          <Outlet/>
      </div>
      
    </div>
  )
}

export default Layout
