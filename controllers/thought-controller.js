const { Thought, User } = require('../models');

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    // use the .find() method to retrieve all thoughts from the database
    Thought.find({})
      .populate({
        path: 'reactions', // populate reactions field
        select: '-__v' // exclude the __v field
      })
      .select('-__v') // exclude the __v field
      .sort({ _id: -1 }) // sort in descending order by _id
      .then(dbThoughtData => res.json(dbThoughtData)) // return the data
      .catch(err => {
        console.log(err);
        res.status(400).json(err); // if an error occurs, return it
      });
  },

  // get one thought by id
  getThoughtById({ params }, res) {
    // use the .findOne() method to retrieve a single thought by its _id
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'reactions', // populate reactions field
        select: '-__v' // exclude the __v field
      })
      .select('-__v') // exclude the __v field
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create a new thought
  createThought({ body }, res) {
    // use the .create() method to create a new thought
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // update a thought by its _id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // delete a thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        return User.findOneAndUpdate(
          { thoughts: params.id },
          { $pull: { thoughts: params.id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // add a reaction to a thought
  // add a reaction to a thought
  addReaction({ params, body }, res) {
    // use the .findOneAndUpdate() method to add a reaction to the reactions array
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // remove a reaction from a thought
  removeReaction({ params }, res) {
    // use the .findOneAndUpdate() method to remove a reaction from the reactions array
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;
