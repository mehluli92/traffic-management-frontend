'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function ViolationTypeSearch({handleViolationTypeChange}) {
    const [name, setName] = useState('')
    const [violationTypes, setViolationTypes] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

    const getViolationTypes = async () => {
        try {
            setLoading(true)
            setError(null) // Reset error state before a new request
            const response = await axios.get(`${API_BASE_URL}/violation-types/get-all`, { 
                params: { 
                    page: 0, 
                    size: 5,
                    name: name
                }
            })
            setViolationTypes(response.data.content)
        } catch (error) {
            console.log(error)
            setError('Failed to fetch violation types')
        } finally {
            setLoading(false)
        }
    }

    const typeChange = (type) => {
    setName(type.name)
    handleViolationTypeChange(type)
    }

    useEffect(() => {
        if(name){
            getViolationTypes()
        } 
    }, [name])

    return (
        <div className="">
            <label htmlFor="violation-type" className="block text-sm font-medium text-gray-700">Violation Type Search</label>
            <input
                id="violation-type"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Search by name"
                className="mt-1 block w-full px-3 py-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
            
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-600">{error}</p>}

            <div className="mt-0 border-b border-gray-300">
                {violationTypes && violationTypes.length > 0 ? (
                    violationTypes.map((type) => (
                        <p 
                        className="text-gray-800 py-1 border-b border-gray-300 pl-4" 
                        key={type.id}
                        onClick={()=>typeChange(type)}
                        >{type.name}</p>
                    ))
                ) : (
                    !loading && <p></p>
                )}
            </div>
        </div>
    )
}
