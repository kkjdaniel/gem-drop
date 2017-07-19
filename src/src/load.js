var loadState = {

    preload: function() {

        // Set Background Colour
        game.stage.backgroundColor = "#000000";

        // Add Loading Message
        game.add.text(85, 300, 'Loading...', { fill: '#ffffff' });

        // Menu Sprites
        game.load.image('logo_white', 'assets/img/logo_white.png');
        game.load.image('button_play', 'assets/img/button_play.png');
        game.load.image('button_highscore', 'assets/img/button_highscore.png');
        game.load.image('button_help', 'assets/img/button_help.png');
        game.load.image('button_replay', 'assets/img/button_replay.png');

        // Difficulty Sprites
        game.load.image('button_easy', 'assets/img/button_easy.png');
        game.load.image('button_medium', 'assets/img/button_normal.png');
        game.load.image('button_hard', 'assets/img/button_hard.png');

        // Help Sprites
        game.load.image('arrow_keys', 'assets/img/arrow_keys.png');
        game.load.image('gems_line', 'assets/img/gems_line.png');

        // Gem Sprites
        game.load.image('gem_grey', 'assets/img/gem_grey.png');
        game.load.image('gem_blue', 'assets/img/gem_blue.png');
        game.load.image('gem_green', 'assets/img/gem_green.png');
        game.load.image('gem_red', 'assets/img/gem_red.png');
        game.load.image('gem_yellow', 'assets/img/gem_yellow.png');

        // Grid Sprite
        game.load.image('grid', 'assets/img/grid.png');

        // Background Image
        game.load.image('background', "assets/img/background.png");

        // Background Music
        game.load.audio('bgm', 'assets/music/menu.mp3');

        // Game SFX
        game.load.audio('complete', 'assets/sfx/complete.mp3');
        game.load.audio('chain', 'assets/sfx/chain.mp3');

    },

    create: function() {

        // Set Background Music
        var backgroundMusic = game.add.audio('bgm');
        backgroundMusic.loopFull(0.8);

        // Start Menu State
        game.state.start('menu');

    }

};