import React, { useEffect, useState } from 'react'

export default function Pagination({currentPage, totalPages, first, last, onPageChange}) {
    const [] = useState()
    // onPageChange = (page) =>{
    //     onPageChange(page)
    // }


    useEffect(()=>{
        console.log(first)
    },[currentPage])
    
  return (
    <div className=''>
        {!first && <button>Prev</button>}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index)}
            className={`mx-1 px-3 py-1 text-sm font-medium rounded-md ${
              currentPage === index ? 'bg-blue-200' : 'bg-gray-100 hover:bg-gray-300'
            }`}
          >
            {index}
          </button>
        ))}
        
        {!last && <button>Next</button>}
    </div>
  )
}
