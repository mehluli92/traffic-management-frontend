'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import SidebarItem from '../ui/SidebarItem'
import { MdOutlineDashboard } from "react-icons/md"
import { FiUsers } from "react-icons/fi"
import { LiaUserTagSolid } from "react-icons/lia"
import { MdSecurity } from 'react-icons/md'
import { ImProfile } from "react-icons/im"
import { GiTrafficLightsGreen } from "react-icons/gi"
import { IoCarSportOutline } from "react-icons/io5"
import { BsTicket } from "react-icons/bs"
import { MdOutlineCarCrash } from "react-icons/md"
import { MdLogout } from "react-icons/md"


export default function Sidebar() {
  const [route, setRoute] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) { // Check if the router is ready
       setRoute(router.pathname)
    }
}, [router.isReady, router.pathname]); // Include router.isReady in dependencies

  return (
    <div 
    className='flex flex-col h-screen bg-white border-r border-gray-150 justify-start'
    >
      {/* brand title */}
      <div className='py-4 px-2'>
        <Link
        href={'/dashboard'}
        className="text-lg font-bold"
        >
        PointMan
        </Link>
      </div>

    {/* Menu Items */}
    <div className='px-2 flex flex-col overflow-y-auto'>
      <h3 className='py-1'>MENU</h3>
      <SidebarItem name="dashboard" link={'/dashboard'} route={route} icon={MdOutlineDashboard}/>
      <SidebarItem name="profile" link={'/dashboard/profile'} route={route} icon={ImProfile}/>

      <hr className='divide-y divide-gray-200 my-4'/>
      
      <h3 className='py-1'>TRAFFIC ENFORCEMENT</h3>

      <SidebarItem name="vehicles" link={'/dashboard/vehicles'} route={route} icon={IoCarSportOutline}/>
      <SidebarItem name="violations" link={'/dashboard/violations'} route={route} icon={MdOutlineCarCrash}/>
      <SidebarItem name="fines" link={'/dashboard/fines'} route={route} icon={BsTicket}/>



      <hr className='divide-y divide-gray-200 my-4'/>


      <h3 className='py-1'>ANALYTICS</h3>
      <SidebarItem name="equipment monitoring" link={'/dashboard/equipment-monitoring'} route={route} icon={GiTrafficLightsGreen}/>

      <hr className='divide-y divide-gray-200 my-4'/>


      <h3 className='py-1'>USER MANAGEMENT</h3>

      <SidebarItem name="users" link={'/dashboard/users'} route={route} icon={FiUsers}/>

      <SidebarItem name="roles" link={'/dashboard/roles'} route={route} icon={LiaUserTagSolid}/>

      <SidebarItem name="permissions" link={'/dashboard/permissions'} route={route} icon={MdSecurity}/>

      <hr className='divide-y divide-gray-200 my-4'/>
      <SidebarItem name="logout" link={'/logout'} route={route} icon={MdLogout}/>


    </div>
      
    </div>
  )
}
