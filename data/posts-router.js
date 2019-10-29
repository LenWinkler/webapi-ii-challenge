const router = require('express').Router();

const Data = require('./db');

router.post('/', (req, res) => {
    const newPost = req.body;
    
    if(!newPost.title || !newPost.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })

    } else {

    Data.insert(newPost)
        .then(reply => {
            res.status(201).json(newPost)
        })
        .catch(err => {
            console.log('new post error', err);
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        })
}})

router.get('/', (req, res) => {
    Data.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.log('get error', err);
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

module.exports = router;