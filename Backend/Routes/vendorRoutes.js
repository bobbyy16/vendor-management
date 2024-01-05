const express = require('express');
const {getVendors,
    getVendor,
    createVendor,
    updateVendor,
    deleteVendor} = require('../Controllers/vendorController')

const router = express.Router();
// get all products
router.get('/', getVendors);
// get products by id
router.get('/:id', getVendor);
// Create product
router.post('/', createVendor);
// update a product
router.put('/:id', updateVendor);
// delete a product
router.delete('/:id', deleteVendor);

module.exports = router;