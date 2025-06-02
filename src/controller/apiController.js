const APIService = require('../services/APIService')


const apiTest = (req, res) => {

    return res.status(200).json({
        message: 'success',
        data: 'data ok'
    })
}

const handleRegister = async (req, res) => {
    try {
        // email, name, userName, password, phone
        if(!req.body.email || !req.body.password || !req.body.userName || !req.body.phone) {
            return res.status(200).json({
                EM: 'Missing required parameters ', //message
                EC: '1', //er code  
                DT: '' //date
            })
        }

        if (req.body.password && req.body.password.length < 6 ) {
            return res.status(200).json({
                EM: 'passwort must have 6 length ', //message
                EC: '1', //er code  
                DT: '' //date
            })
        }
        // service
        let data = await APIService.registerNewUser(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: '' 
        })
    } catch (err) {
        // console.log('error >>> ', err)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1',
            DT: ''
        })
    }
    console.log('resulf >>> ', req.body)
    // return res.status(200).json({
    //     message: 'success'
    // })

}

const handleLogin = async(req, res) => {
    const {userName, password} = req.body
    try {
        if (!userName || !password) {
            return res.status(200).json({
                EM: 'Missing required parameters ', //message
                EC: '1', //er code  
                DT: '' //date
            })
        }
        if (password && password.length < 6) {
            return res.status(200).json({
                EM: 'passwort must have 6 length ', //message
                EC: '1', //er code  
                DT: '' //date
            })

        }

        //
        const data = await APIService.LoginUser(req.body)

        //set cookie
        res.cookie('JWT', data.DT.acces_token, {httpOnly: true}, {maxAge: 3600})


        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
        
    } catch (error) {
        return res.status(500).json({
            EM: '',
            EC: '-1',
            DT: ''
        })
    }
}


module.exports = {
    apiTest,
    handleRegister,
    handleLogin
}