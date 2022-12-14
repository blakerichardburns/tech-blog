const router = require('express').Router();
const { response, request } = require('express');
const { Blogpost, Comment, User } = require('../models');
const authorized = require('../utils/authorization');

router.get('/', async (request, response) => {
  try {
    const blogpostData = await Blogpost.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },
      ],
    });

    const blogposts = blogpostData.map((blogpost) =>
      blogpost.get({ plain: true })
    );

    response.render('home', {
      blogposts,
      logged_in: request.session.logged_in,
      user_name: request.session.user_name,
    });
  } catch (error) {
    console.log(error);
    response.status(500).json(error);
  }
});

router.get('/blogpost/:id', async (request, response) => {
  try {
    const blogpostData = await Blogpost.findByPk(request.params.id, {
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const blogpost = blogpostData.get({ plain: true });
    response.render('blogpost', {
      ...blogpost,
      logged_in: request.session.logged_in,
      user_name: request.session.user_name,
    });
  } catch (error) {
    response.status(500).json(error);
  }
});

router.get('/dashboard', authorized, async (request, response) => {
  try {
    const userData = await User.findByPk(request.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blogpost }],
    });

    const user = userData.get({ plain: true });

    response.render('dashboard', {
      ...user,
      logged_in: request.session.logged_in,
      user_name: request.session.user_name,
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

router.get('/blogpost/:id/update', authorized, async (request, response) => {
  try {
    const postData = await Blogpost.findByPk(request.params.id);
    const blogpost = postData.get({ plain: true });

    response.render('updatePost', {
      blogpost,
      logged_in: request.session.logged_in,
      user_name: request.session.user_name,
    });
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;
