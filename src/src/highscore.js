var highscoreState = {

    create: function() {

        // Transition Effect
        this.camera.flash('#000000');

        // Set Game Background
        var background = game.add.sprite(-300, 0, "background");
        background.scale.setTo(0.6, 0.6);

        // Add Title Text
        var title = game.add.text(game.world.centerX, 48, "Highscores:", { font: "25px Helvetica", fill: "#FFF", stroke: "#212938", strokeThickness: 6, wordWrap: true, wordWrapWidth: 280, align: "center" });
        title.anchor.set(0.5);

        // Get Highscores
        var request = new XMLHttpRequest();
        request.open('GET', 'server/getscore.php', true);
        console.log(request);

        request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                // Parse Highscore Response
                var response = JSON.parse(request.responseText);
                console.log(response);

                // Display Highscores (Success)
                var y = 98;
                for (var i = 0; i < response.length; i++) {
                    var score = game.add.text(game.world.centerX, y, (i + 1) + '. ' + response[i] + ' pts', { font: "25px Helvetica", fill: "#FFF", stroke: "#212938", strokeThickness: 6, wordWrap: true, wordWrapWidth: 280, align: "center" });
                    score.anchor.set(0.5);
                    y += 40;
                }
            } else {
                // Display Error Message (Fail)
                game.add.text(game.world.centerX, 98, "Error Loading Scores!", { font: "25px Helvetica", fill: "#FFF", stroke: "#212938", strokeThickness: 6, wordWrap: true, wordWrapWidth: 280, align: "center" });
            }
        };

        request.onerror = function() {
            game.add.text(game.world.centerX, 98, "Error Loading Scores!", { font: "25px Helvetica", fill: "#FFF", stroke: "#212938", strokeThickness: 6, wordWrap: true, wordWrapWidth: 280, align: "center" });
        };

        request.send();

        // Add Back Button
        var back = game.add.sprite(game.world.centerX, 545, "button_replay");
        back.scale.setTo(0.15, 0.15);
        back.anchor.set(0.5);

        back.inputEnabled = true;
        back.input.useHandCursor = true;
        back.events.onInputDown.add(this.goBack, this);

    },

    goBack: function() {
        this.camera.fade('#182138');
        this.camera.onFadeComplete.add(function() {
            game.state.start('menu');
        }, this);
    }

};