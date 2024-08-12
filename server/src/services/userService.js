
const db = require('../models')


const getCurrentUser = (id) => new Promise (async (resolve, reject) => {
    try {
        let response = await db.User.findOne({
            where: {id},
            raw: true
        })
        resolve({
            error : response ? 0 : 4,
            message : response ? 'OK' : 'User not found',
            response 
        })

    } catch (error) {
        reject({
            error : 2 ,
            message: 'Fail at auth Service: '+ error
        })
    }
})

module.exports = {
    getCurrentUser
}