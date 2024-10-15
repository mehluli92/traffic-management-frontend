'use client'
import Input from '@/app/components/forms/Input';
import SubmitButton from '@/app/components/forms/SubmitButton';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loader from '@/app/components/ui/Loader';

export default function EditRole({params}) {
  const router = useRouter();
  const id = params['id'];

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Fetch role data when the component mounts
  useEffect(() => {
    const fetchRoleData = async () => {
      if (id) {
        try {
          const response = await axios.get(`${API_BASE_URL}/permissions/${id}`);
          setFormData({
            name: response.data.name,
            description: response.data.description,
          });
        } catch (error) {
          console.log(error);
          setError(true);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchRoleData();
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
      await axios.put(`${API_BASE_URL}/permissions/${id}`, formData);
      router.push('/dashboard/permissions');
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
      <h3 className='capitalize'>Edit Permission</h3>

      <div className='mb-2'>
        <Input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          label="Role Name"
        />
      </div>
      <div className='mb-2'>
        <Input
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          label="Description"
        />
      </div>
      {error && <p className='text-red-700'>Some error occurred</p>}
      <SubmitButton saving={saving} label="Update Role" />
    </form>
  );
}
