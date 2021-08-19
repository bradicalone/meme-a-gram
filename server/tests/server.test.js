const request = require('supertest')
const index = require('../index')
const pool = require('../database/db')

beforeEach( async () => {
    // await pool.query (
    //     `DROP TABLE users`
    // )
    // await pool.query (
    //     `SET FOREIGN_KEY_CHECKS = 0;`
    // )
    // await pool.query (
    //     `TRUNCATE users`
    // )
    // await pool.query(`CREATE TABLE users (
    //     id SERIAL PRIMARY KEY NOT NULL,
    //     name VARCHAR(200) NOT NULL,
    //     email VARCHAR(30) NOT NULL,
    //     password VARCHAR(200) NOT NULL
    // )`)
});


test('Sign up new user', async () => {
    await request(index).post('/user/signup').send({
        name: 'Brad',
        email: 'b.vanderbush@icloudddd.com',
        password: '1',
        password2: '1'
    }).expect(409)
})