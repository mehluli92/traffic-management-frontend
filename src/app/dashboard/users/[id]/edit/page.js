'use client'
import Input from '@/app/components/forms/Input';
import SubmitButton from '@/app/components/forms/SubmitButton';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loader from '@/app/components/ui/Loader';
import RoleSearch from '@/app/components/roles/RoleSearch';

export default function EditRole({params}) {
  const router = useRouter();
  const id = params['id'];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enabled: true,
    ec_number: '',
    password: '',
    role: null,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  const handleRoleChange = (data) => {
        setFormData({
            ...formData,
            role: data
        })
   }

  // Fetch role data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        try {
          const response = await axios.get(`${API_BASE_URL}/roles/${id}`);
          setFormData({
            name: response.data.name,
            email: response.data.email,
            phone: response.data.phone,
            enabled: response.data.enabled,
            ec_number: response.data.ec_number,
            password: response.data.password,
            role: response.data.role,
          });
        } catch (error) {
          console.log(error);
          setError(true);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchUserData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await axios.put(`${API_BASE_URL}/users/${id}`, formData);
      router.push('/dashboard/users');
    } catch (error) {
      setError(true);
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return <p><Loader/></p>; // Display loading state while fetching
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className='capitalize'>edit user</h3>
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
        {formData.role && formData.role.name}
        <RoleSearch
        roleName={formData.role}
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
      {error && <p className='text-red-700'>Some error occurred</p>}
      <SubmitButton saving={saving} label="Update Role" />
    </form>
  );
}
