const express = require('express');
const router = express.Router();

const postController = require('../controller/postController');
const protected = require('../middlewares/protected');

router.post('/create_post',protected, postController.create);

module.exports = router;