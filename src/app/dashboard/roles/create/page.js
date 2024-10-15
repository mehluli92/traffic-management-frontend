'use client'
import Input from '@/app/components/forms/Input';
import SubmitButton from '@/app/components/forms/SubmitButton';
import React, { useState } from 'react'
import axios from 'axios'
import PermissionSearch from '@/app/components/permissions/PermissionSearch';

export default function page() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [],
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(false)

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
      const response = await axios.post(`${API_BASE_URL}/roles`, formData)
      console.log(response)
      setTimeout(setSaving(false), 2000)
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className='capitalize'>create role</h3>

      <div className='mb-2'>
        <Input 
        name={'name'}
        onChange={handleInputChange}
        label={'role name'}
        />
      </div>
      <div className='mb-2'>
        <Input 
        name={'description'}
        onChange={handleInputChange}
        label={'description'}
        />
      </div>
      <PermissionSearch/>
      {error && <p className='text-red-700'>Some error occured</p>}
      <SubmitButton 
      saving={saving}
      />
    </form>
  )
}
