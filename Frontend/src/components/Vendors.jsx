import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config';

export default function Vendors({ vendors, getVendors }) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id, vendorName) => {
    const result = await Swal.fire({
      title: `Do you really want to delete ${vendorName}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        setIsLoading(true);
        await fetch(`http://localhost:8080/api/vendors/${id}`, {
          method: 'DELETE',
        });

        toast.success(`${vendorName} deleted`);
        getVendors();
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <>
          <tr key={vendors._id} className="hover:bg-gray-200">
            <td className="py-2 px-2 border-b text-center">{vendors.vendorName}</td>
            <td className="py-2 px-2 border-b text-center">{vendors.bankAccountNo}</td>
            <td className="py-2 px-2 border-b text-center">{vendors.bankName}</td>
            <td className="py-2 px-2 border-b text-center">{vendors.addressLine1}</td>
            <td className="py-2 px-2 border-b text-center">{vendors.addressLine2}</td>
            <td className="py-2 px-2 border-b text-center">{vendors.city}</td>
            <td className="py-2 px-2 border-b text-center">{vendors.country}</td>
            <td className="py-2 px-2 border-b text-center">{vendors.zipCode}</td>
            <td className="py-2 px-2 border-b text-center">
              <div className="mt-2 flex gap-4">
                <Link
                  to={`/edit/${vendors._id}`}
                  className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-600 hover:cursor-pointer"
                >
                  Edit
                </Link>
                {user ? (
                  <button
                    onClick={() => handleDelete(vendors._id, vendors.vendorName)}
                    className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-600 hover:cursor-pointer"
                  >
                    Delete
                  </button>
                ) : (
                  <button 
                  className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-600 hover:cursor-pointer"
                  >
                    Delete
                  </button>
                )}
              </div>
            </td>
          </tr>
        </>
      )}
    </>
  );
}
