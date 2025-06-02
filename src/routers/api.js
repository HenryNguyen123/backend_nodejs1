const express = require('express')
const apiRouter = express.Router()
const apiController = require('../controller/apiController')
const userController = require('../controller/userController')
const groupController = require('../controller/groupController')
const {checkUserJWT, checkUserPromision} = require('../middlewares/JWTaction')

// middleware check login
// const checkLoginMiddleware = (req, res, next) => {
//     const publicPaths = ['/login', '/register', '/test-api']
//     console.log('path >>> ', req.path)
//     if (publicPaths.includes(req.path)) {
//         return next() // Cho phép vào các route public
//     }
    
//     //check user
//     // if (user) {
//     //     next()
//     // } else {

//     // }
// }
// apiRouter.use(checkLoginMiddleware)


apiRouter.get('/test-api', apiController.apiTest)

apiRouter.post('/register', apiController.handleRegister)

apiRouter.post('/login', apiController.handleLogin)

//check all router
apiRouter.use(checkUserJWT,checkUserPromision)

//get - R, post - c, put - U, delete - D
apiRouter.get('/user/show', userController.read)
apiRouter.post('/user/create', userController.create)
apiRouter.put('/user/update', userController.update)
apiRouter.delete('/user/delete', userController.destroy)

apiRouter.post('/user/get-user', userController.readOneUser)
apiRouter.get('/group', groupController.getGroup)



module.exports = apiRouter