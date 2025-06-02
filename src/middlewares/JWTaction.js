require('dotenv').config()
var jwt = require('jsonwebtoken');
    const publicPaths = ['/login', '/register', '/test-api']
const createJWT = (payload) => {
    let key =  process.env.JWT_SECERT
    let token = null
    try {
        token = jwt.sign(payload, key);
    } catch (error) {
        console.log(error)
    }
    return token
}

const verifyToken = (token) => {
    let key =  process.env.JWT_SECERT
    // let data = null
    // jwt.verify(token, key, function(err, decoded) {
    //     if(err) {
    //         console.log(err)
    //         return data
    //     }
    //     return decoded
    // });
    try {
        let decoded =  null
        decoded =  jwt.verify(token, key)
        return decoded
    } catch (error) {
        console.log('Token verify error:', error)
        return null
    }
}

const checkUserJWT = (req, res, next) => {
    if (publicPaths.includes(req.path)) return next() // Cho phép vào các route public

    let cookie = req.cookies
    if (cookie && cookie.JWT) {
        let token = cookie.JWT
        let decoded = verifyToken(token)
         req.user = decoded
        if (decoded) {
            next()
        } else {
            return res.status(401).json({
                EM: 'not authenticated the user',
                EC: 1,
                DT: ''
            })
        }
    } else {
        return res.status(401).json({
            EM: 'not authenticated the user',
            EC: 1,
            DT: ''
        })
    }
}

const checkUserPromision = (req, res, next) => {
    if (publicPaths.includes(req.path)) return next() // Cho phép vào các route public

    if (req.user) {
        let email =  req.user.email
        let roles = req.user.groupWithRole?.Roles
        let currenUrl =  req.path
        if (!roles || roles.length === 0){
            return res.status(403).json({
                EM: 'You do not have permission to access this resource.',
                EC: 1,
                DT: ''
            })  
        }

        let canAccess = roles.some(item => item.url === currenUrl)
        if (canAccess) {
            next()
        }else {
            return res.status(403).json({
                EM: 'You do not have permission to access this resource.',
                EC: 1,
                DT: ''
            })  
        }

    }else {
        return res.status(403).json({
            EM: 'You do not have permission to access this resource.',
            EC: 1,
            DT: ''
        })
    }
}

module.exports = {createJWT, verifyToken, checkUserJWT, checkUserPromision}