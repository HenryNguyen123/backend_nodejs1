const UserService = require('../services/UserService')

const read = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let limit = parseInt(req.query.limit)
        const data = await UserService.getAllUserWithPagination(page, limit)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
            status: 200
        })

        // const data = await UserService.getAllUser()
        // return res.status(200).json({
        //     EM: data.EM,
        //     EC: data.EC,
        //     DT: data.DT,
        //     status: 200
        // })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error from server",
            EC: 1,
            DT: '',
            status: 500
        })
    }
}

const create = async (req, res) => {
    try {
        const dataUser = req.body
        const data = await UserService.createUser(dataUser)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error from server",
            EC: 1,
            DT: '',
            status: 500
        })
    }
}

const update = async (req, res) => {
    try {
        const data = await UserService.updateUser(req.body)
        if (data) {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
        return res.status(200).json({
            EM: 'error with server',
            EC: 2,
            DT: ''
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error from server",
            EC: 1,
            DT: '',
            status: 500
        })
    }
}

const destroy = async (req, res) => {
    try {
        const id = req.body.id
        const data = await UserService.deleteUser(id)
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: "error from server",
            EC: 1,
            DT: '',
            status: 500
        })
    }
}

const readOneUser = async (req, res) => {
    try {
        const data = await UserService.handleGetOneUser(req.body.id)
        if (data) {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
        return res.status(200).json({
            EM: 'error with server',
            EC: 1,
            DT: 0
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error with server',
            EC: 2,
            DT: 0
        })
    }
}

module.exports = {
    read,
    create,
    update,
    destroy,
    readOneUser
}