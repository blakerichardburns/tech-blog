const router = require('express').Router();
const { response, request } = require('express');
const { BlogPost, Comment, User } = require('../models');
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

        response.render('home', { blogPosts, loggedIn: request.session.loggedIn });
    } catch (error) {
        console.log(error);
        response.status(500).json(error);
    }
});

router.get('/blogPost/:id', async (request, response) => {
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
            include: [{ model: BlogPost, Comment }],
        });

        const user = userData.get({ plain: true });

        response.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (error) {
        response.status(500).json(error);
    }
});

// router.get('/login,' (request, response) => {
//     if (request.session.logged_in) {
//         response.redirect('/dashboard');
//         return;
//     }

//     response.render('signup-login');
// });

module.exports = router;