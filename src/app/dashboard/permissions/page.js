'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios'
import DeleteModal from '@/app/components/ui/DeleteModal';

export default function Page() {
  const [permissions, setPermission] = useState([]);
  const [loading, setLoading] = useState(true); // Start loading as true
  const [error, setError] = useState(null); // Initialize as null
  const [modalOpen, setModalOpen] = useState(false);
  const [permissionToDelete, setPermissionToDelete] = useState(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchPermissions = async (page = 0, size = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/permissions`, { params: { page: page, size: size } })

      setPermission(response.data.content)
      console.log(response)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/permissions/${id}`);
      setPermission(permissions.filter(permission => permission.id !== id)); // Update the roles state
      setModalOpen(false); // Close the modal after deletion
    } catch (error) {
      console.log('Error occurred while deleting');
    }
  }

  const openModal = (permissionId) => {
    setPermissionToDelete(permissionId);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchPermissions()
  }, []);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1 className='py-2 text-lg'>List of Permissions</h1>
      <Link 
      href={'/dashboard/permissions/create'}
      className="text-blue-400"
      >
        Create new permission
      </Link>
      <ul className='py-2'>
        {permissions.map((permission) => (
          <li key={permission.id} 
          className="grid grid-cols-3 border-b py-4"
          >
            <p>{permission.id}</p>
            <p>{permission.name}</p>
            <div className='flex flex-row gap-2'>
              <Link 
              href={`/dashboard/permissions/${permission.id}/edit`}
              className="text-red-600"
              >
              Edit
              </Link>
               <p onClick={() => openModal(permission.id)}>Delete</p>
            </div>
          </li>
        ))}
      </ul>

      <DeleteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => permissionToDelete && handleDelete(permissionToDelete)}
        message="Are you sure you want to delete this permission?"
      />
    </div>
  )
}
