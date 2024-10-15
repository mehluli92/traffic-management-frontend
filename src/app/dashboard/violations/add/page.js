'use client'
import Input from '@/app/components/forms/Input'
import SubmitButton from '@/app/components/forms/SubmitButton'
import ViolationTypeSearch from '@/app/components/violation-types/ViolationTypeSearch'
import axios from 'axios'
import React, { useState } from 'react'

export default function Page() {
    const [formData, setFormData] = useState({
        location: '',
        latitude: '',
        longitude: '',
        number_plate: '',
        fine_amount: 0,
        status: '',
        violationType: null,
        payment: null
    })
    const [image, setImage] = useState(null) // State for storing the image file
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

    // Handle violation type change from search component
    function handleViolationTypeChange (data){
        setFormData(prevData => ({
            ...prevData,
            violationType: data,
            fine_amount: data.fine_amount
        }))
    }

    // Handle form field change
    const handleFormChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: name === 'fine_amount' ? (value === '' ? 0 : Number(value)) : value
        }))
    }

    // Handle image file selection
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        setImage(file)
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
    
            // Prepare form data to send (including the image)
            const formDataToSend = new FormData()
            formDataToSend.append('location', formData.location)
            formDataToSend.append('latitude', formData.latitude)
            formDataToSend.append('longitude', formData.longitude)
            formDataToSend.append('number_plate', formData.number_plate)
            formDataToSend.append('fine_amount', formData.fine_amount)
            formDataToSend.append('status', formData.status)
    
            // Append violationType fields
            if (formData.violationType) {
                formDataToSend.append('violationType.id', formData.violationType.id);
                formDataToSend.append('violationType.name', formData.violationType.name); // Optional
                formDataToSend.append('violationType.description', formData.violationType.description); // Optional
            }
    
            // Optionally append payment fields if needed
            // if (formData.payment) {
            //     formDataToSend.append('payment', JSON.stringify(formData.payment)); // Assuming payment is an object
            // }
    
            // Append the image file
            formDataToSend.append('file', image)
    
            // Log the FormData entries for debugging
            for (let pair of formDataToSend.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }
    
            // Send POST request with form data including image
            const response = await axios.post(`${API_BASE_URL}/violations`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Important for file upload
                }
            })
    
            setLoading(false)
            setSuccess(true)
            console.log(response)
        } catch (error) {
            setLoading(false)
            console.log('Error submitting form:', error)
        }
    }
    

    return (
        <div className='md:w-1/2'>
            <form 
                onSubmit={handleSubmit}
                className="bg-white rounded-lg py-8 px-4"
                encType="multipart/form-data" // Important for file upload
            >
                <h4 className='text-xl font-semibold mb-6'>Create a Violation</h4>
                {success && <p className='text-green-600'>Successfully added the Violation</p>}

                {/* Location Input */}
                <Input 
                    name='location' 
                    label='Location'
                    value={formData.location}
                    onChange={handleFormChange}
                    className='mb-4'
                />

                {/* Number Plate Input */}
                <Input 
                    name='number_plate' 
                    label='Number Plate'
                    value={formData.number_plate}
                    onChange={handleFormChange}
                    className='mb-4'
                />

                {/* Violation Type Search */}
                <ViolationTypeSearch
                    handleViolationTypeChange={handleViolationTypeChange}
                />

                {/* Fine Amount Input */}
                <Input 
                    name='fine_amount' 
                    label='Fine Amount'
                    type='number'
                    value={formData.fine_amount}
                    onChange={handleFormChange}
                    className='mb-4'
                />

                {/* Status Dropdown */}
                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-medium">
                        Status
                    </label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleFormChange}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="unpaid">Unpaid</option>
                        <option value="paid">Paid</option>
                        <option value="incomplete">Incomplete</option>
                    </select>
                </div>

                {/* Latitude and Longitude Inputs */}
                <Input 
                    name='latitude' 
                    label='Latitude'
                    value={formData.latitude}
                    onChange={handleFormChange}
                    className='mb-4'
                />

                <Input 
                    name='longitude' 
                    label='Longitude'
                    value={formData.longitude}
                    onChange={handleFormChange}
                    className='mb-4'
                />

                {/* Image Upload Input */}
                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    />
                </div>

                {/* Submit Button */}
                <SubmitButton saving={loading} />
            </form>
        </div>
    )
}
