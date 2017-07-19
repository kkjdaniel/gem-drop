// Create Game Object
var game = new Phaser.Game(310, 640, Phaser.AUTO, '');

// Add Game States
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('difficulty', difficultyState);
game.state.add('highscores', highscoreState);
game.state.add('help', helpState);
game.state.add('game', gameState);
game.state.add('finish', finishState);

// Start Initial State
game.state.start('load');