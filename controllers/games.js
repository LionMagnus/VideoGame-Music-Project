const Music = require('../models/music');
const Game = require('../models/game');

module.exports = {
    index,
    show,
    new: newGame,
    create
};
  
function index(req, res) {
    Game.find({}, function(err, games) {
        res.render('games/index', { title: 'All Games', games });
    });
}
  
function show(req, res) {
    Game.findById(req.params.id, function(err, game){
        Music.find({game: game._id}, function(err, musics) {
            res.render('games/show', {
                title: 'VideoGame Music Fest',
                game,
                musics
        });
    });
});
}
  
function newGame(req, res) {
    res.render('games/new', { title: 'Add Game' });
}
  
function create(req, res) {
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    const game = new Game(req.body);
    game.save(function(err) {
        if (err) return res.redirect('/games/new');
        res.redirect(`/games/${game._id}`);
    });
}