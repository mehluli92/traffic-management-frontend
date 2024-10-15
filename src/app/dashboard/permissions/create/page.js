'use client'
import Input from '@/app/components/forms/Input';
import SubmitButton from '@/app/components/forms/SubmitButton';
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link';

export default function page() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(false)
  const[success, setSuccess] = useState(false)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setSaving(true)
      const response = await axios.post(`${API_BASE_URL}/permissions`, formData)
      setSuccess(true)  
      setTimeout(setSaving(false), 2000)
      setFormData({
        name: '',
        description: '',
      })
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className='capitalize'>create permission</h3>
      <p>
        <Link href="/dashboard/permissions">
        Back
        </Link>
      </p>
      <div className='mb-2'>
        <Input 
        name={'name'}
        onChange={handleInputChange}
        label={'permission name'}
        />
      </div>
      <div className='mb-2'>
        <Input 
        name={'description'}
        onChange={handleInputChange}
        label={'description'}
        />
      </div>
      {error && <p className='text-red-700 py-2'>Some error occured.</p>}
      {success && <p className='text-green-700 py-2'>Adding success.</p>}
      <SubmitButton 
      saving={saving}
      />
    </form>
  )
}
