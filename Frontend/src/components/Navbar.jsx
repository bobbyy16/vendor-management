import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="flex items-center justify-between">
          <Link to='/'>
            <h1 className="text-2xl font-bold text-orange-500 cursor-pointer">Vendi</h1>
          </Link> 
          <div className="flex items-center space-x-4"> 
            <Link to="/"> 
              <button className="bg-orange-700 text-white px-4 py-2 rounded-md">
                Home
              </button>
            </Link>
            <Link to="/create"> 
              <button className="bg-orange-700 text-white px-4 py-2 rounded-md">
                Create
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
