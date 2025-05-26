const express = require('express')
const apiRouter = express.Router()
const apiController = require('../controller/apiController')
const userController = require('../controller/userController')

apiRouter.get('/test-api', apiController.apiTest)

apiRouter.post('/register', apiController.handleRegister)

apiRouter.post('/login', apiController.handleLogin)

//get - R, post - c, put - U, delete - D
apiRouter.get('/user/show', userController.read)
apiRouter.post('/user/create', userController.create)
apiRouter.put('/user/show', userController.update)
apiRouter.delete('/user/delete', userController.destroy)

module.exports = apiRouter