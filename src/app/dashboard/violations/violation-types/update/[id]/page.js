'use client'
import Input from '@/app/components/forms/Input'
import SubmitButton from '@/app/components/forms/SubmitButton'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditViolationType() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        fine_amount: ''
    })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
    const router = useRouter()
    const { id } = useParams() 

    
    useEffect(() => {
        const fetchViolationType = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/violation-types/${id}`)

                setFormData({
                    name: response.data.name,
                    description: response.data.description,
                    fine_amount: response.data.fine_amount
                })
            } catch (error) {
                console.error('Error fetching violation type data:', error)
            }
        }
        if (id) {
            fetchViolationType()
        }
    }, [id, API_BASE_URL])

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
            const response = await axios.put(`${API_BASE_URL}/violation-types/${id}`, formData)
            setLoading(false)
            setSuccess(true)
            router.push('/dashboard/violations/violation-types')
        } catch (error) {
            setLoading(false)
            console.log('Error updating violation type:', error)
        }
    }

    return (
        <div className='md:w-1/2'>
            <form 
                onSubmit={handleSubmit}
                className="bg-white rounded-lg py-8 px-4"
            >
                <h4 className='text-xl font-semibold mb-6'>Edit Violation Type</h4>
                {success && <p className='text-green-600'>Successfully updated the violation type</p>}
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
