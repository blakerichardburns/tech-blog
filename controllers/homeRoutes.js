const router = require('express').Router();
const { response, request } = require('express');
const { BlogPost, Comment, User } = require('../models');
const authorized = require('../utils/authorization');
const authorization = require('../utils/authorization');

router.get('/', async (request, response) => {
    try {
        const blogPostData = await BlogPost.findAll({
            include: [
                {
                    model: User,
                    attributes: ['user_name'],
                },
            ],
        });

        const blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));

        response.render('home', { blogPosts, logged_in: request.session.logged_in });
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
});

router.get('/blogpost/:id', async (request, response) => {
    try {
        const blogPostData = await BlogPost.findByPk(request.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['user_name'],
                },
                {
                    model: Comment,
                    attributes: ['content'],
                },
            ],
        });

        const blogPost = blogPostData.get({ plain: true });

        response.render('blogPost', {
            ...blogPost,
            logged_in: request.session.logged_in
        });
    } catch (error) {
        response.status(500).json(error);
    }
});

router.get('/dashboard', authorization, async (request, response) => {
    try {
        const userData = await User.findByPk(request.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: BlogPost }],
        });

        const user = userData.get({ plain: true });

        response.render('dashboard', {
            ...user,
            logged_in: request.session.logged_in
        });
    } catch (error) {
        response.status(500).json(error);
    }
});

router.get('/signup-login', (request, response) => {
    if (request.session.logged_in) {
        response.redirect('/dashboard');
        return;
    }

    response.render('signup-login');
});

router.get('/dashboard/:id', authorization, async (request, response) => {
    try {
        const postData = await BlogPost.findByPk(request.params.id)
        const blogpost = postData.get({ plain: true })

        response.render('updatePost', {
            blogpost,
            logged_in: request.session.logged_in})
    } catch (error) {
        response.status(500).json(error);
    }
});

module.exports = router;