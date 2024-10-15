'use client'
import Input from '@/app/components/forms/Input'
import SubmitButton from '@/app/components/forms/SubmitButton'
import axios from 'axios'
import React, { useState } from 'react'

export default function Page() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        fine_amount: ''
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL


    const handleFormChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: name === 'fine_amount' ? (value === '' ? 0 : Number(value)) : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const response = await axios.post(`${API_BASE_URL}/violation-types`, formData)
            setLoading(false)
            setSuccess(true)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='md:w-1/2'>
            <form 
                onSubmit={handleSubmit}
                className="bg-white rounded-lg py-8 px-4"
            >
                <h4 className='text-xl font-semibold mb-6'>Add Violation Type</h4>
                {success && <p className='text-green-600'>Successfully added the fineAmount</p>}
                <Input 
                    name='name' 
                    label='Name'
                    value={formData.name}
                    onChange={handleFormChange}
                    className='mb-4'
                />
                <Input 
                    name='description' 
                    label='Description'
                    value={formData.description}
                    onChange={handleFormChange}
                    className='mb-4'
                />
                <Input 
                    name='fine_amount' 
                    label='Fine Amount'
                    type='number'
                    value={formData.fine_amount}
                    onChange={handleFormChange}
                    className='mb-4'
                />
                <SubmitButton saving={loading} />
            </form>
        </div>
    )
}
