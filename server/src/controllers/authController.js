const authService = require('../services/authService')

const loginSuccess = async(req, res) => {
    const {id, tokenLogin} = req?.body
    try {
        if(!id || !tokenLogin) res.status(400).json({
            error : 1 ,
            message : 'Missing input'
        })
        let response = await authService.loginSuccessService(id, tokenLogin)
        if(response.error !== 0)res.status(400).json(response)
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            error : 1 ,
            message : 'Fail at auth controller: '+ error
        })
    }
}

module.exports = {
    loginSuccess
}