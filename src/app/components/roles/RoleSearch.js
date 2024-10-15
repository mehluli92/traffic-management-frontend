import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Input from '@/app/components/forms/Input';

export default function RoleSearch({sendSelectedRole}) {
  const [query, setQuery] = useState(''); // User's search input
  const [roles, setRoles] = useState([]); // Roles fetched from the backend
  const [dropdownVisible, setDropdownVisible] = useState(false); // Controls dropdown visibility
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Function to fetch roles from the backend based on search input
  const fetchRoles = async (searchQuery) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/roles`, {
        params: {
          name: searchQuery, // Send search query as request parameter
        },
      });
      setRoles(response.data.content); // Assuming backend returns Page<Role>
      setDropdownVisible(true); // Show dropdown
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  // Handler for input change
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    
    if (searchTerm.length > 0) {
      fetchRoles(searchTerm); // Fetch roles only if there's some input
    } else {
      setRoles([]); // Clear roles when input is cleared
      setDropdownVisible(false); // Hide dropdown when there's no input
    }
  };

  // Handle dropdown item click
  const handleRoleClick = (role) => {
    setQuery(role.name); // Set input value to the clicked role
    sendSelectedRole(role);
    setDropdownVisible(false); // Hide dropdown after selection
  };

  return (
    <div className="role-search">
      <Input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a role..."
        className="search-input"
      />
      
      {/* Dropdown to show search results */}
      {dropdownVisible && roles.length > 0 && (
        <ul className="dropdown">
          {roles.map((role) => (
            <li key={role.id} onClick={() => handleRoleClick(role)} className="py-1 border-b">
              {role.name}
            </li>
          ))}
        </ul>
      )}

      {/* Optional: No results message */}
      {dropdownVisible && roles.length === 0 && (
        <div className="no-results">No roles found</div>
      )}
    </div>
  );
}
