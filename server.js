const path = require('path');
const express = require('express');
const session = require('express-session');
const expressHandlebars = require('express-handlebars');
const routes = require('./controllers');
const date = require('./utils/date');

const sequelize = require('./config/connection');
const exp = require('constants');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const handlebars = expressHandlebars.create({ date });

const userSession = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 900000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(userSession));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now Listening...'));
});
