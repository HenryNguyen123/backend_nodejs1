const connection = require('../config/database')
const db = require('../models/index')

// import bcrypt from "bcryptjs";
const bcrypt = require("bcryptjs")
let salt = bcrypt.genSaltSync(10);

const hashPassword =  (password) => {
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword
}

const getStudent = async()=>{
        const [results, fields] = await connection.query('select * from student')
    
        // console.log('results >>> ', results)
}

const createUser = async(email, getHashPassword, userName, name, groupId) => {
    // const [results, fields] = await connection.query('INSERT into users (email, password, name) VALUES(?, ?, ?)', [email, password, name])

    try {
        const results = db.User.create({
            name: name,
            email: email,
            password: getHashPassword,
            userName: userName,
            groupId: groupId
        })

        return results
        
    } catch (error) {
        console.log('>>>> error >>> ', error)
    }
    
}

const getUsers =  async () => {
    // let [results, fields] = await connection.query('select id, name, email from users')
    const results = await db.User.findAll({
                    attributes: ["id", "name", "userName", "email", "password", "groupId", "phone", "sex"],
                    include: {model: db.Group},
                    raw: true,
                    nest: true
                })
    return results
}

const showEditUser = async (id) => {
    // let [results, fields] = await connection.query('select id, name, email from users where id=?', [id])
    const results = await db.User.findOne({ where: { id: id } })
    return results
}

const editUserPost = async (email, name, id, userName, groupId) => {
    // let [results, fields] = await connection.query('update users set email=?, name=? where id=?', [email, name, id])
    // return results
    await db.User.update(
        { 
            email: email,
            name: name,
            userName: userName,
            groupId: groupId
        },
        {
            where: {
                id: id,
            },
        },
    );
}

const handleDeleteUser =  async (id) => {
    // let [results, fields] = await connection.query('DELETE FROM users WHERE id=?', [id])
    await db.User.destroy({
        where: {
            id: id,
        },
    })
    // return results
}

module.exports = {
    getStudent,
    createUser,
    hashPassword,
    getUsers,
    showEditUser,
    editUserPost,
    handleDeleteUser
}