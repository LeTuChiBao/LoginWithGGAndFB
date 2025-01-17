const router = require('express').Router()
const passport = require('passport')
require('dotenv').config()
const authController = require('../controllers/authController')

//locahost:5000/api/auth/google
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'],session: false }));

//locahost:5000/api/auth/google/callback

router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', (err,profile) => {
        req.user = profile
        next()
    }) (req,res, next)
        
}, (req, res)=> {
        res.redirect(`${process.env.URL_CLIENT}/login-success/${req.user?.id}/${req.user.tokenLogin}`)

});

router.get('/facebook',
    passport.authenticate('facebook', {scope: ["email"] , session: false }));
  
router.get('/facebook/callback', (req, res, next) => {
    passport.authenticate('facebook', (err,profile) => {
        req.user = profile
        next()
    }) (req,res, next)
        
}, (req, res)=> {
        res.redirect(`${process.env.URL_CLIENT}/login-success/${req.user?.id}/${req.user.tokenLogin}`)
    });

    
router.post('/login-success',authController.loginSuccess)

module.exports = router