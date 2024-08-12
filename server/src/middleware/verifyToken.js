const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req,res,next) => {

    const token = req?.headers?.authentication?.split(' ')[1]

    if(!token) {
        return res.status(200).json({
            error : 1,
            message: 'Chưa đăng nhập'
        })
    }

    jwt.verify (token,process.env.SECRET_KEY,(err,decode)=> {
        if(err) {
            return res.status(200).json({
                error : 1,
                message: 'Token không hợp lệ'
            })
        }

        req.currentUser = decode
        next()
    })
}

module.exports = verifyToken