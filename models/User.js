const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,  // Type is string
    unique: true,  // Each username should be unique
    required: true,  // This field is required
    trim: true,  // This option trims whitespace from the end of the string
  },
  email: {
    type: String,  // Type is string
    required: true,  // This field is required
    unique: true,  // Each email should be unique
    // Validate that the email entered is in correct format
    match: [/.+\@.+\..+/, 'Please enter a valid e-mail address'],
  },
  thoughts: [
    {
      // This is an array of ObjectId's that reference the Thought model
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
  friends: [
    {
      // This is an array of ObjectId's that reference the User model (Self-reference)
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

// A virtual is a property that is not stored in MongoDB. Virtuals are typically used for computed properties on documents.
UserSchema.virtual('friendCount').get(function() {
  // `this` is the User document. This function returns the length of the User's friends array.
  return this.friends.length;
});

// The User model is created from the UserSchema
const User = mongoose.model('User', UserSchema);

// Export the User model
module.exports = User;
