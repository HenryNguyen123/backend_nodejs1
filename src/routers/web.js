const express = require('express')
const router = express.Router()
const { getShowHome, getShowUser, postCreateUser, getAllUser, showUpdateUser, editUser, deleteUser } = require('../controller/homeController')

router.get('/', getShowHome)
router.get('/user', getShowUser)
router.post('/create-user', postCreateUser)

router.get('/get-user', getAllUser)

router.get('/update-user/:id', showUpdateUser)
router.post('/edit-user', editUser)

router.get('/delete-user/:id', deleteUser)


// api



module.exports = router