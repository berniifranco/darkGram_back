const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    likes: [
        {
            type: ObjectId,
            ref: "userModel"
        }
    ],
    comments: [
        {
            commentText: String,
            commentedBy: { type: ObjectId, ref: "userModel" }
        }
    ],
    image: {
        type: String,
        required: true
    },
    author: {
        type: ObjectId,
        ref: "userModel"
    }
});

mongoose.model("postModel", postSchema);