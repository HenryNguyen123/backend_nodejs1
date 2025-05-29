const { or, Op } = require('sequelize');
const db = require('../models/index')
const {getGroupWithRole} = require('../services/JWTservice')
const {createJWT} = require('../middlewares/JWTaction')
require('dotenv').config()

const bcrypt = require("bcryptjs")
let salt = bcrypt.genSaltSync(10);

const hashPassword =  (password) => {
    return bcrypt.hashSync(password, salt);
}

const checkHashPassword = (input, password) => {
    return bcrypt.compareSync(input, password)
}

const registerNewUser = async (data) => {
    try {
        // check email/phone unique ?
        const checkPhone = await db.User.findOne({ where: { phone: data.phone } });
        if (checkPhone) {
            return {
                EM:'this phone is unique!',
                EC: 1
            }
        }
        const checkEmail = await db.User.findOne({ where: { email: data.email } });
        if (checkEmail) {
            return {
                EM:'this email is unique!',
                EC: 1
            }
        }
        // hash user password

        const getHashPassword = hashPassword(data.password)
        //create new user
  
        const user = await db.User.create({ 
            email: data.email,
            phone: data.phone,
            password: getHashPassword,
            userName: data.userName,
            name: data.name,
            groupId: 2,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return {
            EM:'A new user is created successfuly!',
            EC: 0
        }
    } catch (error) {
        console.log("er >>> ", error)
        return {
            EM: 'something wrongs in server',
            EC: -2
        }
    }

}

const LoginUser = async(data) => {
    // console.log('data >>>>>', data)
    // console.log('check login')
    try {
        const user = await db.User.findOne({ where: {     
                            [Op.or]: [
                                { phone: data.userName },
                                { email: data.userName }
                                ]} 
                            });
        console.log('user >> ', user)

        if(user) {
            //check password 
            let checkpassword = checkHashPassword(data.password, user.password);
            if (!checkpassword) {
                console.log('not found user with email/phone', data)
                return {
                    EM:'email/phone or password fail!',
                    EC: 1,
                    DT: ''
                }
            }
            
            //test role
            const groupWithRole = await getGroupWithRole(user)
            const payload = {
                email: user.email,
                groupWithRole,
                expiresIn: process.env.JWT_EXPIRESIN
            }

            // token
            let token = createJWT(payload)

            return {
                EM:'success!',
                EC: 0,
                DT: {
                    acces_token: token,
                    data: groupWithRole
                }
            }

        }

        return {
            EM:'email/phone or password fail!',
            EC: 1,
            DT: ''
        }
    } catch (error) {
        
    }
}
module.exports = {
    registerNewUser,
    LoginUser
}