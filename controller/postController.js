const mongoose = require('mongoose');
const { post } = require('../routes/postRoutes');
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
    },
    //All users posts
    allPost: (req, res) => {
        PostModel.find()
            .populate("author", "_id fullname profileImg")
            .then((dbPosts) => {
                res.status(200).json({post: dbPosts})
            })
            .catch((err) => {
                console.log(err);
            })
    },
    //All post only user logged in
    myAllPost: (req, res) => {
        PostModel.find({author: req.user._id})
            .populate("author", "_id fullname profileImg")
            .then((dbPosts) => {
                res.status(200).json({post: dbPosts})
            })
            .catch((err) => {
                console.log(err);
            })
    },
    deletePost: (req, res) => {
        PostModel.findOne({_id: req.params.postId})
            .populate("author", "_id")
            .exec((error, postFound) => {
                if (error || !postFound) {
                    return res.status(400).json({error: "post does not exist"});
                };
                if (postFound.author._id.toString() == req.user._id.toString()) {
                    postFound.remove()
                    .then((data) => {
                        res.status(200).json({result: data})
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                }
            })
    },
    like: (req, res) => {
        PostModel.findOneAndUpdate({_id: req.body.postId}, {
            $push: {likes: req.user._id}
        }, {
            new: true //return updated record
        }).populate("author", "_id fullName")
          .exec((error, result) => {
            if (error) {
                return res.status(400).json({error: error})
            } else {
                return res.status(200).json(result)
            }
          })
    }
};

module.exports = postController;