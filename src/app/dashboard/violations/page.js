'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '@/app/components/ui/Loader'
import { FaExpandAlt } from "react-icons/fa"
import SearchInput from '@/app/components/forms/SearchInput'
import Link from 'next/link'


export default function page() {
    const [violations, setViolations] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

    const getViolations = async(page = currentPage, size = 10) => {
        try {
            setLoading(true)
            const response = await axios.get(`${API_BASE_URL}/violations/get-all`, { params: { page: page, size: size }} )
            setViolations(response.data.content)
            setLoading(false)
        } catch (error) {
            setError('some error occured while fetching data')
            console.log(error)
        } finally {
            setLoading(false)
        }
        
    }

    useEffect(()=>{
        getViolations()
    },[])

  return (
    <div>
    <div className='mx-4'>
    <div className='flex flex-row justify-between'>
    <h4 className='text-xl font-semibold'>Violations</h4>
    <div className='flex flex-row space-x-1'>
        <Link
         className='shadow rounded p-1 hover:bg-gray-200'
         href={'/dashboard/violations/add'}
         >Add
         </Link>
        <Link
         className='shadow rounded p-1 hover:bg-gray-200'
         href={'/dashboard/violations/violation-types'}
         >Violation Types
         </Link>
        <button className='shadow rounded p-1 hover:bg-gray-200 text-gray-400'>
            <FaExpandAlt onClick={()=>setShowSearch(!showSearch)}/>
        </button>
    </div>
    </div>
    {showSearch && 
    <SearchInput name={violations} placeholder='Search for a specific violation'/>
    }
    <div className='grid grid-cols-9 capitalize py-4 border-b text-sm'>
        <div className='col-span-1'>Id</div>
        <div className='col-span-2'>location</div>
        <div className='col-span-1'>number plate</div>
        <div className='col-span-1'>amount</div>
        <div className='col-span-1'>status</div>
        <div className='col-span-2'>violation type</div>
        <div className='col-span-1'>action</div>
    </div>
    </div>

    {loading && <Loader/>}

    {!loading && error && <p className='font-red-600'>Some error occured whilst fetching data</p>}

    { !loading &&
    <div className='mx-4'>
    { violations && violations.map((violation) =>(
    <div key={violation.id} className='grid grid-cols-9 capitalize py-3 border-b'>
        <div className='col-span-1 font-bold'>{violation.id}</div>
        <div className='col-span-2'>{violation.location}</div>
        <div className='col-span-1'>{violation.number_plate}</div>
        <div className='col-span-1'>{violation.fine_amount}</div>
        <div className='col-span-1'>{violation.status}</div>
        <div className='col-span-2'>{violation.violationType?.name}</div>
        <div className='col-span-1 space-x-1'>
            <Link
            href={`/dashboard/violations/update/${violation.id}`}
            >
            <span>Edit</span>
            </Link>
            <span className='text-red-600'>View</span>
        </div>
    </div>
    ))
    }
    </div>
    }
    </div>
  )
}
