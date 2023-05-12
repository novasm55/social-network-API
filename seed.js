const mongoose = require('mongoose');
const db = require('./models');

mongoose.connect('mongodb://localhost/social-network-api', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

let userSeed = [
  {
    username: "user1",
    email: "user1@email.com"
  },
  {
    username: "user2",
    email: "user2@email.com"
  }
];

let thoughtSeed = [
  {
    thoughtText: "Here's a cool thought...",
    username: "user1",
    // Note: Replace with actual _id from User document
    userId: "5edff358a0fcb779aa7b118b"
  },
  {
    thoughtText: "Another cool thought...",
    username: "user2",
    // Note: Replace with actual _id from User document
    userId: "5edff358a0fcb779aa7b118b"
  }
];

// First, we clear the database and insert the new User data
db.User.deleteMany({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + ' user records inserted!');

    // Then, we clear the database and insert the new Thought data
    db.Thought.deleteMany({})
      .then(() => db.Thought.collection.insertMany(thoughtSeed))
      .then(data => {
        console.log(data.result.n + ' thought records inserted!');
        process.exit(0);
      })
      .catch(err => {
        console.error(err);
        process.exit(1);
      });

  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

