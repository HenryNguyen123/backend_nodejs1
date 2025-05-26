const db = require('../models/index')

const getGroupAll = async() => {
    try {
        const data= await db.Group.findAll({
                        attributes: ['id', 'name', 'description']
                    })
        if (data) {
            return {
                EM: 'get group successfuly',
                EC: 0,
                DT: data
            }
        }
        return {
            EM: 'error with server',
            EC: 0,
            DT: 'data'
        }
        
    } catch (error) {
        console.log(error)
    }
}

module.exports= {
    getGroupAll
}