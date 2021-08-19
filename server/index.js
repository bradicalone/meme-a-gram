const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const apiRouter = require('./api/meme')
const loginRouter = require('./user/user')
const session = require('express-session'); 
const cookieParser = require("cookie-parser")
const passport = require("passport");

require("./passportConfig")(passport);


app.use(express.json());
app.use(cors({
    origin: "http://localhost:8080",
    credentials: true
}))
app.use(session({
    secret: 'superSecret',
    resave: false,
    saveUninitialized: false
}));
app.use(cookieParser('superSecret'))
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);
app.use('/user', loginRouter);

if(process.env.NODE_ENV === 'production') {
    app.use('/public', express.static(path.join(__dirname, '../public')))
    app.use(express.static(path.join(__dirname, '../dist')))
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../dist', 'index.html'));
    });
}

module.exports = app;