const { Op } = require('sequelize');
const db =  require('../models/index')

// import bcrypt from "bcryptjs";
const bcrypt = require("bcryptjs")
let salt = bcrypt.genSaltSync(10);

const hashPassword =  (password) => {
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword
}

const getAllUser = async() => {
    try {
        let user = await db.User.findAll({
                                attributes: ["id", "name", "userName", "email", "groupId", "phone", "sex"],
                                include: {model: db.Group, attributes: ['name', 'description']},
                                raw: true,
                                nest: true
        });
        if (user) {
            return {
                EM: "get successfuly data",
                EC: 0,
                DT: user
            }
        }

        return {
                EM: "get successfuly data",
                EC: 0,
                DT: []
        }
        
    } catch (error) {
        console.log(error)
    }
}

const getAllUserWithPagination = async(page, limit) => {
    try {
        let offset = (page-1) * limit
        const { count, rows } = await db.User.findAndCountAll({
                                                    attributes: ["id", "name", "userName", "email", "groupId", "phone", "sex"],
                                                    include: {model: db.Group, attributes: ['name', 'description']},
                                                    raw: true,
                                                    nest: true,
                                                    offset: offset,
                                                    limit: limit,
                                                });
        const pageCount = Math.ceil(count / limit);
        let data = {
            totalRows : count,
            totalPages : pageCount,
            users : rows
        }
        if (rows) {
            return {
                EM: "get successfuly data",
                EC: 0,
                DT: data
            }
        }

        return {
                EM: "get successfuly data",
                EC: 0,
                DT: []
        }
    } catch (error) {
        console.log(error)
    }
}

const createUser = async(data) => {
    try {
        const checkUser = await db.User.findOne({ where: { 
                                                [Op.or]: [
                                                    {userName: data.userName},
                                                    {email: data.email},
                                                    {phone: data.phone}
                                                ]
                                            } 
                                        });
        if (checkUser) {
            return {
                EM: 'Email, phone number, or username already exists. Please try again.',
                EC: 2,
                DT:''
            }
        } 
        const hashPasswordNew = hashPassword(data.password)
        await db.User.create({ 
                                name: data.name, password: hashPasswordNew, email: data.email, userName: data.userName,
                                address: data.address, sex: data.gender, phone: data.phone,
                                groupId: data.group  
                            });
        return {
            EM: 'Create add new user successfuly',
            EC: 0,
            DT:''
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'error from server',
            EC: 1,
            DT:''
        }
    }
}

const updateUser = async(data) => {
    try {
        console.log('check userName >>>>>> ', data)

        let res = await db.User.update(
                            {name: data.name, address: data.address, sex: data.gender, groupId: data.group},
                            {where: {id: data.userId}}
                        )
        if (res) {
            return {
                EM: "Edit user successfuly",
                EC: 0,
                DT: ''
            }
        }
        return {
            EM: "Error with server ",
            EC: 2,
            DT: ''
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Error with server ",
            EC: 2,
            DT: ''
        }
    }
}

const deleteUser = async(id) => {
    try {
        const user = await db.User.findOne({where: {id: id}})
        // console.log('user >>> ', user)
        if (user) {
            await db.User.destroy({ where: {id: id}})
            return {
                EM: "Delete user successfuly",
                EC: 0,
                DT: ''
            }
        }

        return {
            EM: "User not exists",
            EC: 0,
            DT: ''
        }

    } catch (error) {
        console.log(error)
        return {
           EM: "error from server",
           EC: 2,
           DT: ''
        }
    }
}

const handleGetOneUser =  async(id)=> {
    try {
        let response = await db.User.findOne({ 
                                                where: {id: id},
                                                attributes: ["id", "name", "userName", "email", "groupId", "phone", "sex"],
                                                include: {model: db.Group, attributes: ['id', 'name', 'description']},
                                                raw: true,
                                                nest: true
                                            })
        if (response) {
            return {
                EM: "get User success!",
                EC: 0,
                DT: response
            }
        }
        return {
            EM: 'error with server',
            EC: 1,
            DT:[]
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'error with server',
            EC: 1,
            DT:''
        }
    }
}
module.exports = {
    getAllUser,
    getAllUserWithPagination,
    createUser, 
    updateUser,
    deleteUser,
    handleGetOneUser
}