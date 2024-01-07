import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function EditPage() {

  let {id} = useParams();
  const [isLoading, setIsLoading] = useState(false)
  const [vendors, setVendors] = useState({
    vendorName: '',
    bankAccountNo: '',
    bankName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    country: '',
    zipCode: ''
  })
  
  const navigate = useNavigate()

  
  useEffect(() => {
    const getVendorForEdit = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(`https://backend-vendor-management.onrender.com/api/vendors/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch vendor');
        }

        const vendorData = await response.json();

        setVendors({
          vendorName: vendorData.vendorName,
          bankAccountNo: vendorData.bankAccountNo,
          bankName: vendorData.bankName,
          addressLine1: vendorData.addressLine1,
          addressLine2: vendorData.addressLine2,
          city: vendorData.city,
          country: vendorData.country,
          zipCode: vendorData.zipCode
        });
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getVendorForEdit();
  }, [id]);

  
  
  const updateVendor = async(e) => {
      e.preventDefault()

      try {
        
        setIsLoading(true)

        await fetch(`https://backend-vendor-management.onrender.com/api/vendors/${id}`, {
        method: 'PUT',
        headers :{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(vendors)
        })

        toast.success(`Updated ${vendors.vendorName} successfully`)
        navigate('/')

      } catch (error) {
        toast.error(error.message)
      } finally {
        setIsLoading(false)
      }
  }
  
    

  const handleVendorName = (e) => setVendors({...vendors, vendorName: e.target.value})
  const handleBankAccountNo = (e) => setVendors({...vendors, bankAccountNo: e.target.value})
  const handleBankName = (e) => setVendors({...vendors, bankName: e.target.value})
  const handleAddressLine1 = (e) => setVendors({...vendors, addressLine1: e.target.value})
  const handleAddressLine2 = (e) => setVendors({...vendors, addressLine2: e.target.value})
  const handleCity = (e) => setVendors({...vendors, city: e.target.value})
  const handleCountry = (e) => setVendors({...vendors, country: e.target.value})
  const handleZipCode = (e) => setVendors({...vendors, zipCode: e.target.value})
  
  
  


  return (
    <div className='max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6 mb-6'>
      <h2 className="font-semibold text-2xl mb-4 block text-center">
        Update a Vendor
      </h2>

      <form onSubmit={updateVendor}>
        <div className="space-y-2">

          <div>
            <label>Vendor Name</label>
            <input 
              type="text" 
              value={vendors.vendorName}
              className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400'
              placeholder='Enter the Vendor"s name'
              onChange={handleVendorName}
            />
          </div>
          
          <div>
            <label>Bank Account Number</label>
            <input 
              type="number" 
              value={vendors.bankAccountNo}
              className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400'
              placeholder='Enter bank account number'
              onChange={handleBankAccountNo}
            />
          </div>
                    
          <div>
            <label>Bank Name</label>
            <input 
              type="text" 
              value={vendors.bankName}
              className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400'
              placeholder='Enter bank name'
              onChange={handleBankName}
            />
          </div>
                    
          <div>
            <label>Address Line 1</label>
            <input 
              type="text" 
              value={vendors.addressLine1}
              className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400'
              placeholder='Enter address Line 1'
              onChange={handleAddressLine1}
            />
          </div>

          <div>
            <label>Address Line 2</label>
            <input 
              type="text" 
              value={vendors.addressLine2}
              className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400'
              placeholder='Enter address Line 2'
              onChange={handleAddressLine2}
            />
          </div>

          <div>
            <label>City</label>
            <input 
              type="text" 
              value={vendors.city}
              className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400'
              placeholder='Enter city"s name'
              onChange={handleCity}
            />
          </div>

          <div>
            <label>Country</label>
            <input 
              type="text" 
              value={vendors.country}
              className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400'
              placeholder='Enter country"s name'
              onChange={handleCountry}
            />
          </div>
          
          <div>
            <label>Zip Code</label>
            <input 
              type="text" 
              value={vendors.zipCode}
              className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400'
              placeholder='Whats the zip-code'
              onChange={handleZipCode}
            />
          </div>

          <div>
            { !isLoading && (<button className="block w-full mt-6 bg-orange-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-orange-600 hover:cursor-pointer">update</button>)}
          </div>
        </div>
        
      </form>
    
    </div>
  )
}
