const connection = require('../config/database')
const { hashPassword, getStudent, createUser, getUsers, showEditUser, editUserPost, handleDeleteUser } = require('../services/CRUDServices')
const db = require('../models/index')

const getShowHome = async (req, res) => {
    await getStudent()
    res.render('home.ejs')
}

const getShowUser = async (req, res) => {

    res.render('user.ejs')
}

const postCreateUser = async (req, res) => {
    let {email, password, userName, name, groupId} = req.body
    // console.log('/name >>> ', req.body)

    let getHashPassword = await hashPassword(password)

    // await createUser(email, getHashPassword, name)

    // try {
    //     await db.User.create({
    //         name: name,
    //         password: getHashPassword,
    //         email: email
    //     })
    // } catch (error) {
    //     console.log('>>>error >>> ', error)
    // }
    await createUser(email, getHashPassword, userName, name, groupId)

    return res.redirect('/get-user')
}

const getAllUser = async (req, res) => {

    let users = await getUsers()
    console.log('>>>users >>> ', users)

    let roles = await db.Role.findAll({
                        include: {model: db.Group, where: { id: 1 }},
                        raw: true,
                        nest: true
                    });
    console.log('>>>role >>> ', roles)
    

    try {
        
    } catch (error) {
        console.log('>>>error >>> ', error)
    }
    return res.render('showUser.ejs', {users})
}

const showUpdateUser = async(req, res) => {
    let id = req.params.id
    let user = await showEditUser(id)

    return res.render('updateUser.ejs', {user: user})
}

const editUser = async (req, res) => {

    let {id, email, name, userName, groupId} = req.body
    await editUserPost(email, name, id, userName, groupId)
    return res.redirect('/get-user')
}

const deleteUser = async (req, res) => {
    let id = req.params.id
    await handleDeleteUser(id)
    return res.redirect('/get-user')
}

module.exports = {
    getShowHome,
    getShowUser,
    postCreateUser,
    getAllUser,
    showUpdateUser,
    editUser,
    deleteUser
}