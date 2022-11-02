const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  userName: String,
  userAvatar: String
}, {
  timestamps: true
});

const musicSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  musicUrl: String,
  userName: String,
  userAvatar: String,
  title: {
    type: String,
    required: true
  },
  comments: [commentSchema],
  game: { type: Schema.Types.ObjectId, ref: 'Game' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Music', musicSchema);