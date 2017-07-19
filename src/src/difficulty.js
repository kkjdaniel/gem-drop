var difficultyState = {

    create: function() {

        // Transition Effect
        this.camera.flash('#000000');

        // Set Game Background
        var background = game.add.sprite(-300, 0, "background");
        background.scale.setTo(0.6, 0.6);

        // Easy Button
        var easy = game.add.sprite(game.world.centerX - 5, 110, "button_easy");
        easy.scale.setTo(0.4, 0.4);
        easy.anchor.set(0.5);

        easy.inputEnabled = true;
        easy.input.useHandCursor = true;
        easy.events.onInputDown.add(this.playEasy, this);

        // Medium Button
        var medium = game.add.sprite(game.world.centerX - 5, 245, "button_medium");
        medium.scale.setTo(0.4, 0.4);
        medium.anchor.set(0.5);

        medium.inputEnabled = true;
        medium.input.useHandCursor = true;
        medium.events.onInputDown.add(this.playMedium, this);

        // Hard Button
        var hard = game.add.sprite(game.world.centerX - 5, 385, "button_hard");
        hard.scale.setTo(0.4, 0.4);
        hard.anchor.set(0.5);

        hard.inputEnabled = true;
        hard.input.useHandCursor = true;
        hard.events.onInputDown.add(this.playHard, this);

        // Add Back Button
        var back = game.add.sprite(game.world.centerX, 545, "button_replay");
        back.scale.setTo(0.15, 0.15);
        back.anchor.set(0.5);

        back.inputEnabled = true;
        back.input.useHandCursor = true;
        back.events.onInputDown.add(this.goBack, this);

    },

    playEasy: function() {
        this.camera.fade('#000000');
        this.camera.onFadeComplete.add(function() {
            game.state.start('game', true, false, 'easy');
        }, this);
    },

    playMedium: function() {
        this.camera.fade('#000000');
        this.camera.onFadeComplete.add(function() {
            game.state.start('game', true, false, 'medium');
        }, this);
    },

    playHard: function() {
        this.camera.fade('#000000');
        this.camera.onFadeComplete.add(function() {
            game.state.start('game', true, false, 'hard');
        }, this);
    },

    goBack: function() {
        this.camera.fade('#000000');
        this.camera.onFadeComplete.add(function() {
            game.state.start('menu');
        }, this);
    }

};