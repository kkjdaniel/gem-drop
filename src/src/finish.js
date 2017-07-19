var finishState = {

    score: null,

    init: function(score) {
        this.score = score;
    },

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

        // Add Player Score
        var scorelbl = game.add.text(game.world.centerX, 345, "Score:", { fill: '#FFF', font: '45px Helvetica' });
        scorelbl.stroke = '#212938';
        scorelbl.strokeThickness = 6;
        scorelbl.anchor.set(0.5);

        var score = game.add.text(game.world.centerX, 415, this.score, { fill: '#FFF', font: '55px Helvetica' });
        score.stroke = '#212938';
        score.strokeThickness = 6;
        score.anchor.set(0.5);

        var scoreNtf = game.add.text(game.world.centerX, 470, '', { fill: '#FFF', font: '24px Helvetica' });
        scoreNtf.stroke = '#212938';
        scoreNtf.strokeThickness = 6;
        scoreNtf.anchor.set(0.5);

        // Add Replay Button
        var play = game.add.sprite(80, 545, "button_replay");
        play.scale.setTo(0.15, 0.15);
        play.anchor.set(0.5);

        play.inputEnabled = true;
        play.input.useHandCursor = true;
        play.events.onInputDown.add(this.restart, this);

        // Add Highscore Button
        var highscore = game.add.sprite(230, 545, "button_highscore");
        highscore.scale.setTo(0.15, 0.15);
        highscore.anchor.set(0.5);

        highscore.inputEnabled = true;
        highscore.input.useHandCursor = true;
        highscore.events.onInputDown.add(this.highscores, this);

        // Submit User Score
        var request = new XMLHttpRequest();
        request.open('POST', 'server/addscore.php', true);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send('score=' + this.score);
        console.log(request);

        request.onload = function() {
            var response = request.responseText;
            if (response == 'true') {
                scoreNtf.setText('You set a new highscore!');
            }
        }

    },

    restart: function() {
        this.camera.fade('#000000');
        this.camera.onFadeComplete.add(function() {
            game.state.start('menu')
        }, this);
    },

    highscores: function() {
        this.camera.fade('#000000');
        this.camera.onFadeComplete.add(function() {
            game.state.start('highscores');
        }, this);
    }

};