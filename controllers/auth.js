const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'jwtlogin'
});


exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('login', {
                message: 'All fields are mandatory!'
            })
        }

        let sql3 = 'SELECT * FROM users WHERE email = ?';
        db.query(sql3, [email], async (err, results) => {

            if (!results || !(await bcrypt.compare(password, results[0].passwrd))) {
                res.status(401).render('login', {
                    message: "Email or Password is Incorrect"
                });
            }

            else {
                const user = results[0];
                const token = jwt.sign({ id: user.uid }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE
                });

                res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                res.redirect('/user/dashboard');
            }
        });

    } catch (err) {
        throw err;
    }
}

exports.register = (req, res, next) => {

    const { name, email, password, passwordConfirm } = req.body;
    let sql1 = 'SELECT email FROM users WHERE email = ?';
    db.query(sql1, [email], async (err, result) => {
        if (err)
            throw err;

        if (result.length > 0) {
            return res.render('register', {
                message: 'Email Already Registered'
            });
        } else if (password != passwordConfirm) {
            return res.render('register', {
                message: 'Passwords do not match'
            });
        }

        let hashed = await bcrypt.hash(password, 8);

        let sql2 = 'INSERT INTO users SET ?';
        db.query(sql2, { username: name, email: email, passwrd: hashed }, (err, result) => {
            if (err)
                throw err;
            else {
                return res.render('register', { message: "User registered" });
            }
        })

    });
}


exports.getLogout = (req, res, next) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}