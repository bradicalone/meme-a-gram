const express = require('express');
const router = express.Router();
const pool = require('../database/db');
const passport = require('passport');

router.post('/signup', async (req, res) => {

    try {
        const { name, email, password, password2 } = req.body;
        console.log(name, email, password, password2)

        const results = await pool.query(
            `SELECT * FROM users
            WHERE email  = $1`,
            [email]
        )
        console.log(results.rows)
        if(results.rows.length) {
            throw 'Email already registered'
        } 

        const signUp = await pool.query(
            `INSERT INTO users (name, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, password`, 
            [name, email, password]
        )

        res.send("Successfully Authenticated")
    } catch(err) {
        console.log('errR:', err)
        res.status(409).json(err)
        
    }
})
router.post('/login', passport.authenticate("local"), (req, res) => {
    console.log(req.user)
    res.json('signUp')
});
module.exports = router