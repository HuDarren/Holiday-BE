const express = require('express');
const morgan = require('morgan');
const db = require('./server/db');
const app = express();
// const session = require('express-session');
const passport = require('passport');
const PORT = process.env.PORT || 3001;
module.exports = app;

// passport registration
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get('/', (req, res) => res.json({ message: 'Hello World' }));

  // auth and api routes
  app.use('/auth', require('./server/auth'));
  app.use('/api', require('./server/api'));

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

const startListening = () => {
  const server = app.listen(PORT, () =>
    console.log(`Example app listening on port ${PORT}`)
  );
};

// Note: using `{ force: true }` will drop the table if it already exists
const syncDb = () => db.sync();

async function bootApp() {
  await syncDb();
  await createApp();
  await startListening();
}

// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp();
} else {
  createApp();
}
