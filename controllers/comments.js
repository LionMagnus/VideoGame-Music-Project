const Music = require('../models/music');

module.exports = {
  create,
  delete: deleteComment
};

function deleteComment(req, res, next) {
  Music.findOne({
    'comments._id': req.params.id,
    'comments.user': req.user._id
  }).then(function(music) {
    if (!music) return res.redirect('/musics');
    music.comments.remove(req.params.id);
    music.save().then(function() {
      res.redirect(`/musics/${music._id}`);
    }).catch(function(err) {
      return next(err);
    });
  });
}

function create(req, res) {
  Music.findById(req.params.id, function(err, music) {
    req.body.userId = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    // We push an object with the data for the
    // comment subdoc into Mongoose arrays
    music.comments.push(req.body);
    music.save(function(err) {
      // Step 5: Respond with a redirect because we've mutated data
      res.redirect(`/musics/${music._id}`);
    });
  });
}