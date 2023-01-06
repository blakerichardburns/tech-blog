const router = require('express').Router();
const { response } = require('express');
const { request } = require('http');
const { Blogpost } = require('../../models');
const authorized = require('../../utils/authorization');

router.post('/', authorized, async (request, response) => {
  try {
    const newBlogpost = await Blogpost.create({
      ...request.body,
      user_id: request.session.user_id,
    });

    response.status(200).json(newBlogpost);
  } catch (error) {
    response.status(400).json(error);
  }
});

router.put('/:id', authorized, async (request, response) => {
  try {
    const blogpostData = await Blogpost.update(request.body, {
      where: {
        id: request.params.id,
      },
    });
    if (!blogpostData[0]) {
      response.status(404).json({ message: 'Post not found...' });
      return;
    }
    response.status(200).json(blogpostData);
  } catch (error) {
    response.status(500).json(error);
  }
});

router.delete('/:id', authorized, async (request, response) => {
  try {
    const blogpostData = await Blogpost.destroy({
      where: {
        id: request.params.id,
        user_id: request.session.user_id,
      },
    });

    if (!blogpostData) {
      response.status(404).json({ message: 'Post not found...' });
      return;
    }

    response.status(200).json(blogpostData);
  } catch (error) {
    response.status(500).json(error);
  }
});

module.exports = router;
