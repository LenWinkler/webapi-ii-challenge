const router = require('express').Router();

const Data = require('./db');

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