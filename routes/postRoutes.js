const express = require('express');
const router = express.Router();

const postController = require('../controller/postController');
const protected = require('../middlewares/protected');

router.post('/create_post',protected, postController.create);
router.get('/allposts', postController.allPost);
router.get('/myallposts',protected, postController.myAllPost);

router.delete('/deletepost/:postId',protected, postController.deletePost);

module.exports = router;