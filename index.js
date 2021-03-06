const express = require('express');

const postsRouter = require('./data/posts-router');

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter);

server.listen(8000, () => {
    console.log('\n***Server running on http://localhost:8000***\n')
})

 