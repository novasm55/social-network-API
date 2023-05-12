const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');

app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import and use your routes here

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
