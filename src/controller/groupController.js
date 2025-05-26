const APIGroup = require('../services/APIGroup')

const getGroup = async(req, res) => {
    try {
        let data = await APIGroup.getGroupAll()
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
            DT:  ''
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error with server',
            EC: 2,
            DT:  ''
        })
    }
}

module.exports = {
    getGroup
}