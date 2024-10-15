'use client'
import React from 'react'
import ChartCard from '../components/dashboard/ChartCard'
import Latest from '../components/dashboard/Latest'
import Revenue from '../components/dashboard/Revenue'

export default function page() {
  return (
    <div className=''>
    <div className='flex flex-row gap-3'>
      <div className='grid grid-cols-3 gap-1'>
        <ChartCard title={'vehicles'}/>
        <ChartCard title={'violations'}/>
        <ChartCard title={'violations'}/>
      </div>
      <div className=''>
        <Latest/>
      </div>
      
    </div>
    <Revenue/>
    </div>
  )
}
