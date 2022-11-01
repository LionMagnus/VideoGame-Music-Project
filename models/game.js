const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
title: {
    type: String,
    required: true
},
genre: {
    type: String,
    enum: ['ACTION', 'RPG', 'STRATEGY','SIMULATION', 'SPORTS', 'ADVENTURE','CASUAL']
},
musics: [{type: Schema.Types.ObjectId, ref: 'Music'}]
}, {
    timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);