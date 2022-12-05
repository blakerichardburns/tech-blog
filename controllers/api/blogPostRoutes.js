const router = require('express').Router();
const { response } = require('express');
const { request } = require('http');
const { BlogPost } = require('../../models');
const authorized = require('../../utils/authorization');

router.post('/', authorized, async (request, response) => {
    try {
        const newBlogPost = await BlogPost.create({
            ...request.body,
            user_id: request.statusMessage.user_id,
        });

        response.status(200).json(newBlogPost);
    } catch (error) {
        response.status(400).json(error);
    }
});

router.delete('/:id', authorized, async (request, response) => {
    try {
        const blogPostData = await BlogPost.destroy({
            where: {
                id: request.params.id,
                user_id: request.session.user_id,
            },
        });

        if (!blogPostData) {
            response.status(404).json({ message: "Post not found..."});
            return;
        }

        response.status(200).json(blogPostData);
    } catch (error) {
        response.status(500).json(error);
    }
});

module.exports = router;



module.exports = router;