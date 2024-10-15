'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function PermissionSearch({ handleChange, deletePermission }) {
    const [name, setName] = useState('')
    const [permissions, setPermissions] = useState([]) // Array to store added permissions
    const [search, setSearch] = useState([]) // Search results
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

    // Fetch permissions based on the search term
    const getPermissions = async () => {
        if (!name.trim()) return
        try {
            const response = await axios.get(`${API_BASE_URL}/permissions?page=${0}&name=${name}`)
            setSearch(response.data.content)
        } catch (error) {
            console.log("error with getting permissions: " + error)
        }
    }

    // Add a permission to the permissions array
    const handlePermissionAdd = (permission) => {
        if (!permissions.find((p) => p.id === permission.id)) {
            setPermissions([...permissions, permission])
        }
    }

    // Remove a permission from the permissions array
    const handlePermissionRemove = (permission) => {
        setPermissions(permissions.filter((p) => p.id !== permission.id))
    }

    useEffect(() => {
        handleChange(permissions)
    }, [permissions])

    useEffect(() => {
        handlePermissionRemove(deletePermission)
    }, [deletePermission])

    useEffect(() => {
        getPermissions()
    }, [name])

    return (
        <div className="">
            <label htmlFor="permission-search" className="block text-sm font-medium text-gray-700">
                Permission Search
            </label>
            <input
                id="permission-search"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Search by name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

            <div className="mt-4">
                <h3 className="text-lg font-semibold">Search Results</h3>
                <ul className="mt-2">
                    {search.length > 0 ? (
                        search.map((item) => (
                            <li
                                key={item.id}
                                className="border p-2 mb-2 cursor-pointer rounded-lg hover:bg-gray-100"
                                onClick={() => handlePermissionAdd(item)} // Add onClick to add permission
                            >
                                <strong className="text-gray-800">{item.name}</strong>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No permissions found.</p>
                    )}
                </ul>
            </div>

            <div className="mt-4">
                <h3 className="text-lg font-semibold">Added Permissions</h3>
                <ul className="mt-2">
                    {permissions.length > 0 ? (
                        permissions.map((item) => (
                            <li
                                key={item.id}
                                className="border p-2 mb-2 cursor-pointer rounded-lg hover:bg-gray-100"
                            >
                                <strong className="text-gray-800">{item.name}</strong>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                                <button
                                    className="text-red-600 text-sm underline mt-1"
                                    onClick={() => handlePermissionRemove(item)} // Remove onClick to remove permission
                                >
                                    Remove
                                </button>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">No permissions added.</p>
                    )}
                </ul>
            </div>
        </div>
    )
}
