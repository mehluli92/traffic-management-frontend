'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios'
import DeleteModal from '@/app/components/ui/DeleteModal';
import Pagination from '@/app/components/ui/Pagination';

export default function Page() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true); // Start loading as true
  const [error, setError] = useState(null); // Initialize as null
  const [modalOpen, setModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [first, setFirst] = useState(true)
  const [last, setLast] = useState(false)

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fetchRoles = async (page = currentPage, size = 10) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/roles`, { params: { page: page, size: size } })
      console.log(response.data)
      setRoles(response.data.content)
      setCurrentPage(response.data.number)
      setTotalPages(response.data.totalPages)
      setFirst(response.data.first)
      setLast(response.data.last)
      
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/roles/${id}`);
      setRoles(roles.filter(role => role.id !== id)); // Update the roles state
      setModalOpen(false); // Close the modal after deletion
    } catch (error) {
      console.log('Error occurred while deleting');
    }
  }

  const openModal = (roleId) => {
    setRoleToDelete(roleId);
    setModalOpen(true);
  };

  useEffect(() => {
    fetchRoles()
  }, []);

  useEffect(() => {
    fetchRoles()
  }, [currentPage]);

  const onPageChange = (page) => {
    setCurrentPage(page)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1 className='py-2 text-lg'>List of Roles</h1>
      <Link 
      href={'/dashboard/roles/create'}
      className="text-blue-400"
      >
        Create new role
      </Link>
      <ul className='py-2'>
        {roles.map((role) => (
          <li key={role.id} 
          className="grid grid-cols-3 border-b py-4"
          >
            <p>{role.id}</p>
            <p>{role.name}</p>
            <div className='flex flex-row gap-2'>
              <Link 
              href={`/dashboard/roles/${role.id}/edit`}
              className="text-red-600"
              >
              Edit
              </Link>
               <p onClick={() => openModal(role.id)}>Delete</p>
            </div>
          </li>
        ))}
      </ul>

      <DeleteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => roleToDelete && handleDelete(roleToDelete)}
        message="Are you sure you want to delete this role?"
      />
      { !loading &&
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        first ={first}
        last={last}
        onPageChange={onPageChange}
        />
      }
      
    </div>
  )
}
