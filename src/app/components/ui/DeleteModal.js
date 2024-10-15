// components/Modal.js
'use client';

import React from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-lg mb-4">{message}</h2>
        <div className="flex justify-end">
          <button className="mr-2 p-2 bg-gray-200 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="p-2 bg-red-600 text-white rounded" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
