const express = require('express');
const authController = require('../controllers/auth');
const { requireAuth, forwardAuth } = require('../middlewares/auth');

const router = express.Router();


router.get('/register', forwardAuth, (req, res, next) => {
    res.render('register');
});

router.post('/register', authController.register);

router.get('/login', forwardAuth, (req, res, next) => {
    res.render('login');
});

router.post('/login', authController.login);


router.get('/dashboard', requireAuth, (req, res) => {
    res.render('dashboard', { user: req.user });
});

router.get('/logout', authController.getLogout);

module.exports = router;