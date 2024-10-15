'use client'
import Input from '@/app/components/forms/Input';
import SubmitButton from '@/app/components/forms/SubmitButton';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Loader from '@/app/components/ui/Loader';
import PermissionSearch from '@/app/components/permissions/PermissionSearch';

export default function EditRole({ params }) {
  const router = useRouter();
  const id = params['id'];

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [],
  });
  const [deletePermission, setDeletePermission] = useState(null)
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log(formData)
  // Handles adding permissions
  const handlePermissionAdd = (permissionArray) => {
    setFormData((prev) => {
      return {...prev, permissions: permissionArray}
    })
  }

  // Fetch role data when the component mounts
  useEffect(() => {
    const fetchRoleData = async () => {
      if (id) {
        try {
          const response = await axios.get(`${API_BASE_URL}/roles/${id}`);
          setFormData({
            name: response.data.name,
            description: response.data.description,
            permissions: response.data.permissions || [], // Initialize permissions
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
      await axios.put(`${API_BASE_URL}/roles/${id}`, formData);
      router.push('/dashboard/roles');
    } catch (error) {
      setError(true);
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return <p><Loader /></p>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3 className='capitalize'>Edit Role</h3>

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
        {/* Pass handlePermissionAdd to PermissionSearch */}
        <PermissionSearch handleChange={handlePermissionAdd} deletePermission={deletePermission}/>

        {error && <p className='text-red-700'>Some error occurred</p>}
        <SubmitButton saving={saving} label="Update Role" />
      </form>
      <div>
        <h3>Added Permissions</h3>
        <ul>
          {formData.permissions.length > 0 ? (
            formData.permissions.map((item) => (
              <li
                key={item.id}
                className="border p-2 mb-2 cursor-pointer"
              >
                <strong>{item.name}</strong>
                <p>{item.description}</p>
                <button
                  className="text-red-500 mt-2"
                 onClick={() => setDeletePermission(item)} // Remove permission
                >
                  Remove
                </button>
              </li>
            ))
          ) : (
            <p>No permissions added.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
