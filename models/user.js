const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^\S+@\S+\.\S+$/, //We can use regex  here as kind of a shorthand. Rather than creating a match function, mongoose's match lets us check if the email matches the email specification shorthand given by regex :) 
        },
        thoughts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thought',
        }],
        friends: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)
userSchema
  .virtual('friendsCount')
  // Getter
  .get(function () {
    return this.friends.length;
  })


// Initialize our User model
const User = model('user', userSchema);

module.exports = User;
