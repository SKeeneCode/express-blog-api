const routes = require('./routes');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');

let store = {
    posts: []
};


let app = express();
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorhandler());

app.use((req, res, next) => {
    req.store = store;
    next();
});

app.get('/posts', routes.Posts.getPosts);
app.post('/posts', routes.Posts.addPost);
app.put('/posts/:postID', routes.Posts.updatePost);
app.delete('/posts/:postID', routes.Posts.removePost);

app.get('/posts/:postID/comments', routes.Comments.getComments);
app.post('/posts/:postID/comments/', routes.Comments.addComment);
app.put('/posts/:postID/comments/:commentID', routes.Comments.updateComment);
app.delete('/posts/:postID/comments/:commentID', routes.Comments.removeComment);

app.listen(3000);


