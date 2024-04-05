const express = require('express');
const router = express.Router()
const {loginAdmin} = require('../controllers/adminController')
const {adminAuth} = require('../middleware/authMiddleware')


router.post('/login/admin', loginAdmin)
// router.put('/me/:id', adminAuth,getMe)

module.exports = router;
