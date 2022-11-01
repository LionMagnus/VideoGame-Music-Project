const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    userName: String,
    userAvatar: String
  }, {
    timestamps: true
  });

const musicSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    musicUrl: String,
    caption: String,
    userName: String,
    userAvatar: String,
    comments: [commentSchema]
  }, {
    timestamps: true
});

const gameSchema = new Schema({
title: {
    type: String,
    required: true
},
genre: {
    type: String,
    enum: ['ACTION', 'RPG', 'STRATEGY','SIMULATION', 'SPORTS', 'ADVENTURE','CASUAL']
},
musics: [musicSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);