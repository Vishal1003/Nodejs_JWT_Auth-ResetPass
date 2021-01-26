const express = require('express');
const mysql = require('mysql');
const env = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const methodOverride = require('method-override');

const app = express();
env.config();

app.use(cors());

app.use(methodOverride('_method'));


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'jwtlogin'
});

db.connect((err) => {
    if (err)
        throw err;
    else
        console.log("Mysql Connected")
});

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, './public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));


app.listen(5000, () => {
    console.log("Server started @ 5000")
});