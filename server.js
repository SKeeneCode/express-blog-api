const routes = require('./routes');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const https = require('https');
const fs = require('fs');
const path = require('path');

let store = {
    posts: []
};

let key = fs.readFileSync(path.join(__dirname,'../../ssl/keys/c07f7_003d1_ecb06ccb2afcd72cfa43b6011c82464e.key'));
let cert = fs.readFileSync(path.join(__dirname,'../../ssl/certs/samkeene_co_uk_c07f7_003d1_1574035199_5b90fc5e96ac0c534d2ee116af6fd342.crt'));
let options = {
    key: key,
    cert: cert
};

let app = express();
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorhandler());

app.use((req, res, next) => {
    req.store = store;
    next();
});

app.get('/', (req, res) => {
    res.send('hello world')
});

app.get('/posts', routes.Posts.getPosts);
app.post('/posts', routes.Posts.addPost);
app.put('/posts/:postID', routes.Posts.updatePost);
app.delete('/posts/:postID', routes.Posts.removePost);

app.get('/posts/:postID/comments', routes.Comments.getComments);
app.post('/posts/:postID/comments/', routes.Comments.addComment);
app.put('/posts/:postID/comments/:commentID', routes.Comments.updateComment);
app.delete('/posts/:postID/comments/:commentID', routes.Comments.removeComment);

let server = https.createServer(options, app);

server.listen(3000, () => {
    console.log("server starting on port : " + 3000)
});


