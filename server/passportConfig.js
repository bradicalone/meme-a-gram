const LocalStrategy = require("passport-local").Strategy
const pool  = require("./database/db")

// const bcrypt = require("bcrypt")

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        try {
            const query = await pool.query(
                `SELECT * FROM users WHERE email = $1`, [email]
            )
    
            if(query.rows.length) {
                const user = query.rows[0]
                //bcrypt goes here
                if(password === user.password) {
                    // is match
                    return done(null, user) // no errors
                }
                
                return done(null, false, {message: 'password is not correct'})
            } else {
                return done(null, false, {message: "Email is not found"})
            }
        } catch ( err ) {
            console.log('err:', err)
        }
    }

    passport.use(
        new LocalStrategy(
            {
                usernameField: "email",
                passwordField: "password"
            },
            authenticateUser
        )
    )
    passport.serializeUser((user, done) => { // Initial Login
        return done(null, user.id)
    })  //store into session cookie

    passport.deserializeUser( async (id, done) => {  // uses id for session
        console.log('user id:', id)
        try {
            const query = await pool.query(
                `SELECT * FROM users WHERE id = $1`, [id]
            )
            return done(null, query.rows[0])
        } catch(err) {
            console.log('err:', err)
        }
    })
}

module.exports = initialize;