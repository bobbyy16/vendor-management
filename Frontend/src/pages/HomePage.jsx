import React, { useEffect, useState } from 'react';
import Vendors from '../components/Vendors';
import Pagination from '../components/Pagination';
import {onAuthStateChanged} from 'firebase/auth'
import {auth} from '../config'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  

    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    
    return () => unsubscribe();
  }, []);

  const itemsPerPage = 6

  const fetchApi = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://backend-vendor-management.onrender.com/api/vendors');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setVendors(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    

  useEffect(() => {
    fetchApi();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVendors = vendors.slice(indexOfFirstItem, indexOfLastItem)
  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <>
    {user ? 
      <h1 className="flex justify-center text-4xl text-center font-bold text-orange-800 mt-2">Welcome to vendi</h1> 
      :
      ""
    }
    
    <div className='flex items-center h-screen justify-center'>
      {user ? (
        <>
          {error && <p style={{ color: 'red' }}>{error}</p>}
      {isLoading ? (
          "Loading..."
        ) : (
          <>
            {vendors.length > 0 ? (
              <>
              <div className='hidden sm:block'>
              <table className="min-w-200 bg-white border border-gray-300 shadow-md rounded-md overflow-hidden mt-0">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                        <th className="py-2 px-2 border-b text-center">Vendor Name</th>
                        <th className="py-2 px-2 border-b text-center">Bank Account No</th>
                        <th className="py-2 px-2 border-b text-center">Bank Name</th>
                        <th className="py-2 px-2 border-b text-center">Address Line 1</th>
                        <th className="py-2 px-2 border-b text-center">Address Line 2</th>
                        <th className="py-2 px-2 border-b text-center">City</th>
                        <th className="py-2 px-2 border-b text-center">Country</th>
                        <th className="py-2 px-2 border-b text-center">Zip Code</th>
                        <th className="py-2 px-2 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentVendors.map((vendor) => (
                        <Vendors 
                            key={vendor._id} 
                            getVendors={fetchApi}
                            vendors={vendor}
                        />
                    ))}
                    </tbody>
                    <Pagination 
                      itemsPerPage={itemsPerPage}
                      totalItems={vendors.length}
                      paginate={paginate}
                    />
                    </table>

              </div>
              <div className="sm:hidden">
                      <h1 className='text-6xl text-center font-bold text-orange-800'>Please view on large screen</h1>
                </div>

              </>
            ) : (
              <div className='text-gray-800'>No products found</div>
            )}
          </>
        )}
        </>
      ) : (
        <>
        <div className="flex items-center justify-center h-screen bg-orange-100">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-orange-800">Welcome to vendi</h1>
            <p className="text-2xl text-orange-600">You are not logged in</p>
            <p className="text-orange-500 mt-4">Please login using the button in Navbar</p>
          </div>
        </div>
        </>
      )}
    </div>
    </>
  );
}
