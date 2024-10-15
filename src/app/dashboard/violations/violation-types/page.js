'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '@/app/components/ui/Loader'
import { FaExpandAlt } from "react-icons/fa"
import SearchInput from '@/app/components/forms/SearchInput'
import Link from 'next/link'


export default function page() {
    const [violationTypes, setViolationTypes] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [currentPage, setCurrentPage] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

    const getViolationTypes = async(page = currentPage, size = 10) => {
        try {
            setLoading(true)
            const response = await axios.get(`${API_BASE_URL}/violation-types/get-all`, { params: { page: page, size: size }} )
            setViolationTypes(response.data.content)
        } catch (error) {
            setError('some error occured while fetching data')
            console.log(error)
        } finally {
            setLoading(false)
        }
        
    }

    useEffect(()=>{
        getViolationTypes()
    },[])

  return (
    <div>
    <div className='mx-4'>
    <div className='flex flex-row justify-between'>
    <h4 className='text-xl font-semibold'>Violation Types</h4>
    <div className='flex flex-row space-x-1'>
        <Link
         className='shadow rounded p-1 onhover:bg-gray-200'
         href={'/dashboard/violations/violation-types/add'}
         >Add Type
         </Link>
        <button className='shadow rounded p-1'>
            <FaExpandAlt onClick={()=>setShowSearch(!showSearch)}/>
        </button>
    </div>
    </div>
    {showSearch && 
    <SearchInput name={violationTypes} placeholder='Search for a specific violation'/>
    }
    <div className='grid grid-cols-7 capitalize py-4 border-b text-sm'>
        <div className='col-span-1'>Id</div>
        <div className='col-span-1'>name</div>
        <div className='col-span-2'>description</div>
        <div className='col-span-1'>amount</div>
        <div className='col-span-1'>created at</div>
        <div className='col-span-1'>action</div>
    </div>
    </div>

    {loading && <Loader/>}

    {!loading && error && <p className='font-red-600'>Some error occured whilst fetching data</p>}

    { !loading &&
    <div className='mx-4'>
    { violationTypes && violationTypes.map((type) =>(
    <div key={type.id} className='grid grid-cols-7 capitalize py-3 border-b'>
        <div className='col-span-1'>{type.id}</div>
        <div className='col-span-1'>{type.name}</div>
        <div className='col-span-2'>{type.description}</div>
        <div className='col-span-1'>{type.fine_amount}</div>
        <div className='col-span-1'>{type.created_at}</div>
        <div className='col-span-1 space-x-1'>
            <Link
            href={`/dashboard/violations/violation-types/update/${type.id}`}
            >
            <span>Edit</span>
            </Link>
            
            <span className='text-red-600'>Delete</span>
        </div>
    </div>
    ))
    }
    </div>
    }
    </div>
  )
}
