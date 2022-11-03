const Music = require('../models/music');

module.exports = {
  create,
  delete: deleteComment,
  edit,
  update
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
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    music.comments.push(req.body);
    console.log(req.body);
    music.save(function(err) {
      res.redirect(`/musics/${music._id}`);
    });
  });
}

function edit(req, res){
  Music.findOne({
    'comments._id': req.params.id,
    'comments.user': req.user._id
  }, function(err, music){
      if (!music || err) return res.redirect(`/musics/${music._id}`);
      let comment = music.comments.id(req.params.id);
      res.render('comments/edit', {title: 'Edit Comment', comment });
    }
  )
}

function update(req, res) {
  Music.findOne({
    'comments._id': req.params.id,
    'comments.user': req.user._id
  }, function(err, music) {
    const comment = music.comments.id(req.params.id);
    if (!comment.user.equals(req.user._id)) return res.redirect(`/musics/${music._id}`);
    comment.content = req.body.content;
    music.save(function(err) {
      res.redirect(`/musics/${music._id}`);
    });
  });
}