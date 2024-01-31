import React from 'react';

export function Button({ title, onClick }) {
  
  return (
    <div className="py-5">
      <button
        type="button"
        onClick={onClick}
        className="w-full bg-black text-white py-2.5 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
      >
        {title}
      </button>
    </div>
  );
}
