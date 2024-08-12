
const db = require('../models')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');
require('dotenv').config()

const loginSuccessService = (id, tokenLogin) => new Promise (async (resolve, reject) => {
    try {
        const newToken = uuidv4()
        let response = await db.User.findOne({
            where: {id, tokenLogin},
            raw: true
        })
        const token = response && jwt.sign({id: response.id, email: response.email, role: response.role}, process.env.SECRET_KEY,{expiresIn : '1d'})
        resolve({
            error : token ? 0 : 3,
            message : token ? 'OK' : 'User not found or fail to login',
            token: `Bearer ${token}`
        })

        if(response){
            await db.User.update({
                tokenLogin: newToken
            }, {
                where: {id}
            })
        }

    } catch (error) {
        reject({
            error : 2 ,
            message: 'Fail at auth Service: '+ error
        })
    }
})

module.exports = {
    loginSuccessService
}