const express = require('express');
const router = express.Router();
const pool = require('../database/db')
const { upload } = require('./upload');

// Post a new meme
router.post('/', upload.single('file'), async (req, res) => {
    try {

        if(!req.user) return res.status(409).json({err: 'Not Authenticated'})

        const { title } = req.body;
        let src = req.file ? req.file.path : 'public/noImg.jpg'

        const newMeme = await pool.query(
            "INSERT INTO meme (title, src, users_id) VALUES($1, $2, $3) RETURNING *",
            [title, src, req.user.id]
        )
        
        res.json(newMeme.rows[0])
    } catch(err) {
        console.log('err:', err)
    }
})

// Update meme
router.put('/:id', async (req,res) => {
    try {
        const { id } = req.params;
        const { title=null } = req.body
        const updatedMeme = await pool.query("UPDATE meme SET title WHERE meme_id = $2", [title,id])
    } catch (err) {
        console.log('err:', err)

    }
})

// Get all memes
router.get('/', async (req, res) => {
    console.log('req user get all memes route',req.user)
    
    try {

        if(!req.user) return res.status(409).json({err: 'Not Authenticated'})

        const allMemes = await pool.query("SELECT * FROM meme WHERE users_id = $1", [req.user.id])
        res.json(allMemes.rows)

    } catch(err) {
        console.log('err:', err)
    }
})

// Get a single meme
router.get('/:id', async (req, res) => {
    try {
        
        if(!req.user) return res.status(409).json({err: 'Not Authenticated'})

        const { id } = req.params;
        const meme = await pool.query("SELECT * FROM meme WHERE meme_id = $1", [id])
        res.json(meme.rows[0])

    } catch(err) {
        console.log('err:', err)
    }
})


module.exports = router