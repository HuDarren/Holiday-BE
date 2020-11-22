const express = require('express');
const morgan = require('morgan')
const db = require('./server/db')
const app = express();
const PORT = process.env.PORT || 3000;

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  app.get("/", (req, res) => res.json({ message: "Hello World" }));
  app.post("/user", async (req, res) => {
    try {
      const newUser = new User(req.body);
      await newUser.save();
      res.json({ user: newUser }); // Returns the new user that is created in the database
    } catch (error) {
      console.error(error);
    }
  });
  app.get("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await User.findAll({
        where: {
          id: userId,
        },
      });
      res.json({ user });
    } catch (error) {
      console.error(error);
  }
});

    // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
};

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(`Example app listening on port ${PORT}`)
  )
}

// Note: using `{ force: true }` will drop the table if it already exists
const syncDb = () => db.sync()

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
  bootApp()
} else {
  createApp()
}
