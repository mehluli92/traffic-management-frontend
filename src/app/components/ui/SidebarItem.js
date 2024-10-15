'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MdOutlineDashboard } from "react-icons/md"

export default function SidebarItem({ name, link, icon: Icon, route }) {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setIsActive(false); // Reset isActive
  
        if (route.trim() === link){
            setIsActive(true);
        }
    }, [route, link]);

    return (
        <Link
            href={link}
            className={`flex items-center rounded-lg py-2 hover:bg-blue-400  ${isActive ? 'bg-blue-600 text-white' : ''}`}
        >
            {Icon && <Icon className='mr-2'/>}
            <p className='capitalize'>{name}</p>
        </Link>
    );
}
