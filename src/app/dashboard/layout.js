'use client'
import React from 'react'
import Sidebar from '../components/layouts/Sidebar'
import TopNav from '../components/layouts/TopNav'

export default function layout({children}) {
  return (
    <div className='grid grid-cols-12 text-sm'>
      <div className='col-span-2'>
      <Sidebar/>
      </div>
    <div className='col-span-10 gap-2'>
      <div>
        <TopNav/>
      </div>
      <div className='m-2'>{children}</div>
    </div>
    </div>
  )
}
