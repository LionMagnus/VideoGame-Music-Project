const Music = require('../models/music');
const Game = require('../models/game');

module.exports = {
  show,
  new: newMusic,
  create,
  delete: deleteMusic
};

function show(req, res) {
  Music.findById(req.params.id, function (err, music) {
    res.render('musics/show', {
      title: "Music Detail",
      music
    });
  });
}

function newMusic(req, res) {
  Game.find({}, function (err, games) {
    res.render('musics/new', {
      title: 'Add Music',
      games,
      gameID: req.params.id
    })
  })
}

function create(req, res) {
  var musicUrl = req.body.musicUrl
  var match = musicUrl.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/);
  if (match && match[1].length == 11) {
    var embeddedUrl = `https://www.youtube.com/embed/${match[1]}`
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    req.body.musicUrl = embeddedUrl;
    Music.create(req.body, function (err, music) {
      res.redirect(`/games/${req.params.id}`);
    });
  } else {
    res.redirect(`/games/${req.params.id}`);
  }
}

function deleteMusic(req, res) {
  Music.findOne({
    'musics._id': req.params.id,
    'musics.user': req.user._id
  }).then(function (music) {
    if (!music) return res.redirect(`/games/${req.params.id}`);
    music.remove(req.params.id);
    music.save().then(function () {
      res.redirect(`/games/${req.params.id}`);
    }).catch(function (err) {
      return next(err);
    });
  });
}