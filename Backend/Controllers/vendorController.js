const Vendor = require('../Models/vendorModel')
const asyncHandler = require('express-async-handler')

// get all vendor
const getVendors = asyncHandler(async(req, res) => {
    try {
        const vendors = await Vendor.find({});
        res.status(200).json(vendors);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// get a single vendor
const getVendor = asyncHandler(async(req, res) =>{
    try {
        const {id} = req.params;
        const vendor = await Vendor.findById(id);
        res.status(200).json(vendor);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// create a vendor
const createVendor = asyncHandler(async(req, res) => {
    try {
        const vendor = await Vendor.create(req.body)
        res.status(200).json(vendor);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

// update a vendor
const updateVendor = asyncHandler(async(req, res) => {
    try {
        const {id} = req.params;
        const vendor = await Vendor.findByIdAndUpdate(id, req.body);
        // we cannot find any vendor in database
        if(!vendor){
            res.status(404);
            throw new Error(`cannot find any vendor with ID ${id}`);
        }
        const updatedvendor = await Vendor.findById(id);
        res.status(200).json(updatedvendor);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const deleteVendor = asyncHandler(async(req, res) =>{
    try {
        const {id} = req.params;
        const vendor = await Vendor.findByIdAndDelete(id);
        if(!vendor){
            res.status(404);
            throw new Error(`cannot find any vendor with ID ${id}`);
        }
        const updatedvendor = await Vendor.find({})
        res.status(200).json(updatedvendor);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

module.exports = {
    getVendors,
    getVendor,
    createVendor,
    updateVendor,
    deleteVendor
}