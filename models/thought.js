const { Schema, model } = require('mongoose');

const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function (timestamp) {
              return new Date(timestamp).toLocaleString();
            },
        },
        username: {
            type: String,
            required: true,
          },
          reactions: {
          [reactionSchema]
          },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)
.virtual('reactionsCount')
// Getter
.get(function () {
  return this.reactions.length;
})