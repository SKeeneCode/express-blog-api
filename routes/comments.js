module.exports = {
    getComments(req, res) {
        res.status(200).send(req.store.posts[req.params.postID].comments)
    },
    addComment(req, res) {
        let newComment =  req.body;
        let commentID = req.store.posts[req.params.postID].comments.length;
        req.store.posts[req.params.postID].comments.push(newComment);
        res.status(201).send({commentID: commentID})
    },
    updateComment(req, res) {
        req.store.posts[req.params.postID].comments[req.params.commentID] = req.body;
        res.status(200).send(req.store.posts[req.params.postID].comments[req.params.commentID])
    },
    removeComment(req, res) {
        req.store.posts[req.params.postID].comments.splice(req.params.commentID, 1);
        res.status(404).send("deleted")
    }
};