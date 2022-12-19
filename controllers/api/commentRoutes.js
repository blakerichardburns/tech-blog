const router = require('express').Router();
const { response } = require('express');
const { request } = require('http');
const { Comment } = require('../../models');
const authorized = require('../../utils/authorization');

router.post('/:id', authorized, async (request, response) => {
    try {
      const newComment = await Comment.create({
        ...request.body,
        user_id: request.session.user_id,
      });
  
      response.status(200).json(newComment);
    } catch (error) {
      response.status(400).json(error);
    }
  });
  
  module.exports = router;