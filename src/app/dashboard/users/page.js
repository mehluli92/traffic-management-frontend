'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios'
import DeleteModal from '@/app/components/ui/DeleteModal';

export default function Page() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Start loading as true
  const [error, setError] = useState(null); // Initialize as null
  const [modalOpen, setModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchUsers = async (page = 0, size = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`, { params: { page: page, size: size } })

      setUsers(response.data.content)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/users/${id}`);
      setUsers(users.filter(role => role.id !== id)); // Update the roles state
      setModalOpen(false); // Close the modal after deletion
    } catch (error) {
      console.log('Error occurred while deleting');
    }
  }

  const openModal = (roleId) => {
    setUserToDelete(roleId);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchUsers()
  }, []);

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1 className='py-2 text-lg'>List of Users</h1>
      <Link 
      href={'/dashboard/users/create'}
      className="text-blue-400 capitalize"
      >
        create new user
      </Link>
      <ul className='py-2'>
        {users.map((user) => (
          <li key={user.id} 
          className="grid grid-cols-6 border-b py-4"
          >
            <p className="col-span-1">{user.id}</p>
            <p className="col-span-1">{user.name}</p>
            <p className="col-span-1">{user.email}</p>
            <p className="col-span-1">{user.phone}</p>
            <div className='flex flex-row gap-2 col-span-2'>
              <Link 
              href={`/dashboard/users/${user.id}/edit`}
              className="text-red-600"
              >
              Edit
              </Link>
               <p onClick={() => openModal(user.id)}>Delete</p>
            </div>
          </li>
        ))}
      </ul>

      <DeleteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => userToDelete && handleDelete(userToDelete)}
        message="Are you sure you want to delete this user?"
      />
    </div>
  )
}
