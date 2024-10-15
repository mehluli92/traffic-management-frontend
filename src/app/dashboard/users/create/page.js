'use client'
import Input from '@/app/components/forms/Input';
import SubmitButton from '@/app/components/forms/SubmitButton';
import React, { useState } from 'react'
import axios from 'axios'
import RoleSearch from '@/app/components/roles/RoleSearch';

export default function page() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enabled: true,
    ec_number: '',
    password: '',
    role: '',
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [rolesArr, setRolesArr] = useState([]);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleRoleChange = (data) => {
    setRolesArr(prevRoles => [...prevRoles, data]);
    setFormData({
        ...formData,
        role: [data]
      })
  }

  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData)

    try {
      setSaving(true)
      const response = await axios.post(`${API_BASE_URL}/users`, formData)
      setTimeout(setSaving(false), 2000)
      setSuccess(true)
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className='capitalize'>create user</h3>

      <div className='mb-2'>
        <Input 
        name={'name'}
        onChange={handleInputChange}
        label={'name'}
        />
      </div>
      <div className='mb-2'>
        <Input 
        name={'email'}
        onChange={handleInputChange}
        label={'email'}
        />
      </div>
      <div className='mb-2'>
        <Input 
        name={'phone'}
        onChange={handleInputChange}
        label={'phone'}
        />
      </div>
      <div className='mb-2'>
        <RoleSearch 
        sendSelectedRole={handleRoleChange}
        />
      </div>
      <div className='mb-2'>
        <Input 
        name={'ec_number'}
        onChange={handleInputChange}
        label={'ec number'}
        />
      </div>
      <div className='mb-2'>
        <Input 
        name={'password'}
        onChange={handleInputChange}
        label={'password'}
        />
      </div>
      {error && <p className='text-red-700'>Some error occured</p>}
      {success && <p className='text-green-700'>User created successfully</p>}

      <SubmitButton 
      saving={saving}
      />
    </form>
  )
}
