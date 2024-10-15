'use client'
import React, { useState } from 'react'

export default function Latest() {
    const [region, setRegion] = useState('harare')

    const handleRegionChange = (event) => {
        setRegion(event.target.value);
      };
  return (
    <div
    className='rounded border border-gray-200 rounded-md bg-white w-[450px] p-2' 
    >
    <div className='flex justify-between items-center mb-3'>
        <h3 className='uppercase'>latest violations</h3>
        <select
          value={region}
          onChange={handleRegionChange}
          className="border border-gray-300 font-medium rounded-md px-2 py-1"
        >
          <option value="Harare">Harare</option>
          <option value="Bulawayo">Bulawayo</option>
          <option value="Manicaland">Manicaland</option>
        </select>
    </div>
      <div>
        <div className='grid grid-cols-4 capitalize rounded-t bg-gray-100 py-2 px-2'>
          <h6>name</h6>
          <h6>ip</h6>
          <h6>status</h6>
          <h6>action</h6>
        </div>
        <div className='grid grid-cols-4 capitalize py-2 px-2'>
          <h6>speeding</h6>
          <h6>111.11.11.34</h6>
          <span className='bg-green-100 py-1 px-1 rounded-md m-1 text-green-600 font-semibold'>paid</span>
          <h6>view details</h6>
        </div>
        <div className="grid grid-cols-4 items-center capitalize py-2 px-2">
          <h6 className="col-span-1 text-left">red robot</h6>
          <h6 className="col-span-1 text-left">111.11.11.34</h6>
          <span className="col-span-1 bg-red-100 py-1 px-2 rounded-md text-red-600 font-semibold justify-center">pending</span>
          <h6 className="col-span-1 text-left  hover:underline cursor-pointer">view details</h6>
        </div>
      </div>
    </div>
  )
}
