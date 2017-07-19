var helpState = {

    create: function() {

        // Transition Effect
        this.camera.flash('#000000');

        // Set Game Background
        var background = game.add.sprite(-300, 0, "background");
        background.scale.setTo(0.6, 0.6);

        // Arrow Keys Tip
        var arrows = game.add.sprite(game.world.centerX - 5, 110, "arrow_keys");
        arrows.scale.setTo(0.65, 0.65);
        arrows.anchor.set(0.5);

        var arrowText = game.add.text(game.world.centerX, 230, "Move the piece using your arrow keys.", { font: "25px Helvetica", fill: "#FFF", stroke: "#212938", strokeThickness: 6, wordWrap: true, wordWrapWidth: 280, align: "center" });
        arrowText.anchor.set(0.5);

        // Gems Tip
        var arrows = game.add.sprite(game.world.centerX - 5, 345, "gems_line");
        arrows.scale.setTo(0.65, 0.65);
        arrows.anchor.set(0.5);

        var gemText = game.add.text(game.world.centerX, 425, "Build matching chains to score points!", { font: "25px Helvetica", fill: "#FFF", stroke: "#212938", strokeThickness: 6, wordWrap: true, wordWrapWidth: 260, align: "center" });
        gemText.anchor.set(0.5);

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