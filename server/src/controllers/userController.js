const userService = require('../services/userService')

const getOne = async(req, res) => {
    const {currentUser} = req
    console.log(currentUser)
    try {
        if(!currentUser?.id) res.status(400).json({
            error : 1 ,
            message : 'Missing input'
        })
        let response = await userService.getCurrentUser(currentUser?.id)
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
    getOne
}