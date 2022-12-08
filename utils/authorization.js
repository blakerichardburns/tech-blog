const authorized = (request, response, next) => {
  if (!request.session.logged_in) {
    response.redirect('/signup-login');
  } else {
    next();
  }
};

module.exports = authorized;
