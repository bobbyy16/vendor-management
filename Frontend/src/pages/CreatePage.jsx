import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

export default function CreatePage() {
  
  const [vendorName, setVendorName] = useState('')
  const [bankAccountNo, setBankAccountNo] = useState('')
  const [bankName, setBankName] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  
  const handleVendorName = (e) => setVendorName(e.target.value)
  const handleBankAccountNo = (e) => setBankAccountNo(e.target.value)
  const handleBankName = (e) => setBankName(e.target.value)
  const handleAddressLine1 = (e) => setAddressLine1(e.target.value)
  const handleAddressLine2 = (e) => setAddressLine2(e.target.value)
  const handleCity = (e) => setCity(e.target.value)
  const handleCountry = (e) => setCountry(e.target.value)
  const handleZipCode = (e) => setZipCode(e.target.value)
  
  const saveProduct = async(e) => {
    e.preventDefault()
    
    if(vendorName === "" || bankAccountNo === "" || bankName === "" || addressLine1 === "" || city === "" || country === "" || zipCode === ""){
      toast.error("Please provide all the below information")
      return;
    }

    try {
      setIsLoading(true)
        const response = await fetch('http://localhost:8080/api/vendors', {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify({
            vendorName,
            bankAccountNo,
            bankName,
            addressLine1,
            addressLine2,
            city,
            country,
            zipCode,
          })
        })
      
      if (!response.ok) {
        throw new Error('Failed to save vendor');
      }
    
      console.log('Vendor saved successfully');
      toast.success(`Saved ${vendorName} sucessfully`);
      navigate('/')
    } catch (error) {
      toast.error(error.message);
    } finally{
      setIsLoading(false)
    }
  }

  
  return (
    <div className='max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6 mb-6'>
      <h2 className="font-semibold text-2xl mb-4 block text-center">
        Create a Vendor
      </h2>

      <form onSubmit={saveProduct}>
        <div className="space-y-2">

          <div>
            <label>Vendor Name</label>
            <input 
              type="text" 
              value={vendorName}
              className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400'
              placeholder='Enter the Vendor"s name'
              onChange={handleVendorName}
            />
          </div>
          
          <div>
            <label>Bank Account Number</label>
            <input 
              type="number" 
              value={bankAccountNo}
              className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400'
              placeholder='Enter bank account number'
              onChange={handleBankAccountNo}
            />
          </div>
                    
          <div>
            <label>Bank Name</label>
            <input 
              type="text" 
              value={bankName}
              className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400'
              placeholder='Enter bank name'
              onChange={handleBankName}
            />
          </div>
                    
          <div>
            <label>Address Line 1</label>
            <input 
              type="text" 
              value={addressLine1}
              className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400'
              placeholder='Enter address Line 1'
              onChange={handleAddressLine1}
            />
          </div>

          <div>
            <label>Address Line 2</label>
            <input 
              type="text" 
              value={addressLine2}
              className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400'
              placeholder='Enter address Line 2'
              onChange={handleAddressLine2}
            />
          </div>

          <div>
            <label>City</label>
            <input 
              type="text" 
              value={city}
              className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400'
              placeholder='Enter city"s name'
              onChange={handleCity}
            />
          </div>

          <div>
            <label>Country</label>
            <input 
              type="text" 
              value={country}
              className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400'
              placeholder='Enter country"s name'
              onChange={handleCountry}
            />
          </div>
          
          <div>
            <label>Zip Code</label>
            <input 
              type="text" 
              value={zipCode}
              className='w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400'
              placeholder='Whats the zip-code'
              onChange={handleZipCode}
            />
          </div>

          <div>
            { !isLoading && (<button className="block w-full mt-6 bg-orange-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-orange-600 hover:cursor-pointer">Save</button>)}
          </div>
        </div>
        
      </form>
    
    </div>
  )
}