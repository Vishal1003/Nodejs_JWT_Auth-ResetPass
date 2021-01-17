const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
            if (err) {
                console.log(err);
                res.redirect('/user/login');
            } else {
                console.log(result);
                req.user = result.id;
                next();
            }
        })
    } else {
        res.redirect('/user/login')
    }
}

const forwardAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
            if (err) {
                console.log(err);
                next();
            } else {
                req.user = result.id;
                res.redirect('/user/dashboard');
            }
        });
    } else {
        next();
    }
}

module.exports = { requireAuth, forwardAuth };