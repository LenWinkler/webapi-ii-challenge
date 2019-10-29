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

router.post('/:id/comments', (req, res) => { // not working correctly
    const comment = req.body;
    // passing insertComment a nonexistant id breaks it
    if(!req.body.text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } else {
        Data.insertComment(comment)
            .then(response => res.status(201).json(comment))
            .catch(err => console.log(err))
    }
})

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

router.get('/:id/comments', (req, res) => { // not working correctly
    const id = req.params.id;
    // don't know how to check if post exists
    Data.findById(id)
    .then(response => {
        if(response.length === 0){
            res.status(404).json({ message: "The post with the specified id does not exist" })
        } else {
            Data.findPostComments(id)
        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(err => {
            console.log('get comments error', err);
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
        }
    })
})

module.exports = router;