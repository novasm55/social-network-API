const mongoose = require('mongoose');

// Define the Reaction schema
const ReactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,  // Type is ObjectId
    default: new mongoose.Types.ObjectId(),  // Default value is a new ObjectId
  },
  reactionBody: {
    type: String,  // Type is string
    required: true,  // This field is required
    maxlength: 280,  // The maximum length of the string is 280
  },
  username: {
    type: String,  // Type is string
    required: true,  // This field is required
  },
  createdAt: {
    type: Date,  // Type is Date
    default: Date.now,  // Default value is the current date
  },
});

// Define the Thought schema
const ThoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,  // Type is string
    required: true,  // This field is required
    minlength: 1,  // The minimum length of the string is 1
    maxlength: 280,  // The maximum length of the string is 280
  },
  createdAt: {
    type: Date,  // Type is Date
    default: Date.now,  // Default value is the current date
  },
  username: {
    type: String,  // Type is string
    required: true,  // This field is required
  },
  reactions: [ReactionSchema],  // This is an array of Reaction documents
});

// A virtual is a property that is not stored in MongoDB. Virtuals are typically used for computed properties on documents.
ThoughtSchema.virtual('reactionCount').get(function() {
  // `this` is the Thought document. This function returns the length of the Thought's reactions array.
  return this.reactions.length;
});

// The Thought model is created from the ThoughtSchema
const Thought = mongoose.model('Thought', ThoughtSchema);

// Export the Thought model
module.exports = Thought;
