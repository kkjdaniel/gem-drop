var menuState = {

    create: function() {

        // Transition Effect
        this.camera.flash('#000000');

        // Set Game Background
        var background = game.add.sprite(-300, 0, "background");
        background.scale.setTo(0.6, 0.6);

        // Add Game Logo
        var logo = game.add.sprite(game.world.centerX, 150, "logo_white");
        logo.scale.setTo(0.50, 0.50);
        logo.anchor.set(0.5);

        // Add Play Button
        var play = game.add.sprite(game.world.centerX, 425, "button_play");
        play.scale.setTo(0.30, 0.30);
        play.anchor.set(0.5);

        play.inputEnabled = true;
        play.input.useHandCursor = true;
        play.events.onInputDown.add(this.start, this);

        // Add Highscore Button
        var highscore = game.add.sprite(80, 545, "button_highscore");
        highscore.scale.setTo(0.2, 0.2);
        highscore.anchor.set(0.5);

        highscore.inputEnabled = true;
        highscore.input.useHandCursor = true;
        highscore.events.onInputDown.add(this.highscores, this);

        // Add Help Button
        var help = game.add.sprite(230, 545, "button_help");
        help.scale.setTo(0.2, 0.2);
        help.anchor.set(0.5);

        help.inputEnabled = true;
        help.input.useHandCursor = true;
        help.events.onInputDown.add(this.help, this);

    },

    start: function() {
        this.camera.fade('#000000');
        this.camera.onFadeComplete.add(function() {
            game.state.start('difficulty');
        }, this);
    },

    highscores: function() {
        this.camera.fade('#000000');
        this.camera.onFadeComplete.add(function() {
            game.state.start('highscores');
        }, this);
    },

    help: function() {
        this.camera.fade('#000000');
        this.camera.onFadeComplete.add(function() {
            game.state.start('help');
        }, this);
    }

};