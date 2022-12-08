const authorized = (request, response, next) => {
  if (!request.session.logged_in) {
    response.redirect('/login');
  } else {
    next();
  }
};

module.exports = authorized;
