const mongoose = require('mongoose');
const PostModel = mongoose.model("postModel");

const postController = {
    create: (req, res) => {
        const {description, location, image} = req.body;
        if (!description || !location || !image) {
            return res.status(400).json({error: "One or more mandatory fields are empty"});
        };
        req.user.password = undefined;
        const postObj = new PostModel({description, location, image, author: req.user});
        postObj.save()
            .then((newPost) => {
                res.status(201).json({post: newPost})
            })
            .catch((err) => {
                console.log(err);
            })
    }
};

module.exports = postController;