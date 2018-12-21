module.exports = {
    getPosts(req, res) {
    res.status(200).send(req.store.posts)
    },
    addPost(req, res) {
        let postID = req.store.posts.length;
        req.store.posts.push(req.body);
        res.status(201).send({postID: postID})
    },
    updatePost(req, res) {
        req.store.posts[req.params.postID] = req.body;
        res.status(200).send(req.store.posts[req.params.postID])
    },
    removePost(req, res) {
        req.store.posts.splice(req.params.postID, 1);
        res.status(404).send('deleted post!')
    }
};