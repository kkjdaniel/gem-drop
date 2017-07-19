var gameState = {

    // Global Variables
    background: null,
    gridHeight: null,
    gridWidth: null,

    map: null,
    gridSprites: null,

    completeSound: null,
    chainSound: null,

    spawnChance: null,
    tickSpeed: null,
    scoreMultiplier: null,

    timer: null,
    timerEvent: null,
    timerCounter: null,

    gameScore: null,
    gameScoreBuffer: null,

    scoreCounter: null,
    scoreTween: null,

    activePiece: null,
    piecesToDrop: [],
    chainsToBeRemoved: [],

    init: function(difficulty) {

        // Set Difficulty
        if (difficulty == 'easy') {
            this.spawnChance = 0.8;
            this.tickSpeed = 0.8;
            this.scoreMultiplier = 3;
        } else if (difficulty == 'medium') {
            this.spawnChance = 0.6;
            this.tickSpeed = 0.6;
            this.scoreMultiplier = 4;
        } else if (difficulty == 'hard') {
            this.spawnChance = 0.4;
            this.tickSpeed = 0.5;
            this.scoreMultiplier = 5;
        }

    },

    create: function() {

        // Initialise Score
        this.gameScore = 0;
        this.gameScoreBuffer = 0;

        // Transition Effect
        this.camera.flash('#000000');

        // Set Game Background
        this.background = game.add.sprite(-300, 0, "background");
        this.background.scale.setTo(0.6, 0.6);

        // Set Complete Sound
        this.completeSound = this.game.add.audio('complete');
        this.completeSound.volume = 4.5;

        // Set Chain Sound
        this.chainSound = this.game.add.audio('chain');
        this.chainSound.volume = 1;

        // Add Score Counter
        this.scoreCounter = game.add.text(45, 582, '0', { fill: '#FFF', font: '25px Helvetica' });
        this.scoreCounter.stroke = '#212938';
        this.scoreCounter.strokeThickness = 6;

        // Score Counter Tween
        this.scoreTween = game.add.tween(this.scoreCounter.scale).to({ x: 1.4, y: 1.4 }, 200, Phaser.Easing.Linear.In).to({ x: 1, y: 1 }, 200, Phaser.Easing.Linear.In);

        // Add Timer Counter
        this.timerCounter = game.add.text(195, 582, '0', { fill: '#FFF', font: '25px Helvetica' });
        this.timerCounter.stroke = '#212938';
        this.timerCounter.strokeThickness = 6;

        // Initialise New Game Map
        this.map = new GameMap();
        this.map.init(this.spawnChance);
        console.log(this.map.locations);

        // Keyboard Input
        var leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        var rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        var upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        var downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        var spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Create Initial Piece
        this.activePiece = new Piece(3, 0, false);
        this.map.addPiece(this.activePiece);
        this.map.updateMap();

        // Left Key Pressed
        leftKey.onDown.add(function(key) {
            if (this.activePiece != null) {
                if (this.map.isValidMove(this.activePiece, this.map.LEFT)) {
                    this.activePiece.moveLeft();
                    this.map.updateMap();
                }
            }
        }, this);

        // Right Key Pressed
        rightKey.onDown.add(function(key) {
            if (this.activePiece != null) {
                if (this.map.isValidMove(this.activePiece, this.map.RIGHT)) {
                    this.activePiece.moveRight();
                    this.map.updateMap();
                }
            }
        }, this);

        // Up / Rotate Key Pressed
        upKey.onDown.add(function(key) {
            if (this.activePiece != null) {
                if (this.map.isValidMove(this.activePiece, this.map.ROTATE)) {
                    this.activePiece.rotate();
                    this.map.updateMap();
                }
            }
        }, this);

        // Spacebar / Rotate Key Pressed
        spaceBar.onDown.add(function(key) {
            if (this.activePiece != null) {
                if (this.map.isValidMove(this.activePiece, this.map.ROTATE)) {
                    this.activePiece.rotate();
                    this.map.updateMap();
                }
            }
        }, this);

        // Down Key Pressed
        downKey.onDown.add(function(key) {
            if (this.activePiece != null) {
                if (this.map.isValidMove(this.activePiece, this.map.DOWN)) {
                    this.activePiece.moveDown();
                    this.map.updateMap();
                }
            }
        }, this);

        // Start Game Ticker
        game.time.events.loop(Phaser.Timer.SECOND * this.tickSpeed, this.tick, this);

        // Start Gravity Ticker
        game.time.events.loop(Phaser.Timer.SECOND * 0.1, this.gravityTick, this);

        // Create Game Timer (2 Minutes)
        this.timer = game.time.create();
        this.timerEvent = this.timer.add(Phaser.Timer.MINUTE * 2, this.endTimer, this);
        this.timer.start();

    },

    pieceStopped: function() {

        this.completeSound.play();

        this.map.removeLatestPiece();

        var singlePiece1 = new Piece(this.activePiece.POSITIONS[this.activePiece.position][0][0], this.activePiece.POSITIONS[this.activePiece.position][0][1], true, this.activePiece.color[0]);
        var singlePiece2 = new Piece(this.activePiece.POSITIONS[this.activePiece.position][1][0], this.activePiece.POSITIONS[this.activePiece.position][1][1], true, this.activePiece.color[1]);

        this.piecesToDrop.push(singlePiece1, singlePiece2);
        this.map.addPiece(singlePiece1);
        this.map.addPiece(singlePiece2);

        var chains = this.map.getValidChains();
        for (chain of chains) {
            if (chain.length >= 3) {

                score = (chain.length * this.scoreMultiplier);
                this.chainSound.play();
                this.createScoreAnimation(score);

                for (coordiante of chain) {
                    this.map.setAtPosition(coordiante[1], coordiante[0], this.map.GEM_GREY);
                    var index = this.map.getIndexOfPiece(coordiante[1], coordiante[0]);
                    this.map.pieces[index].setColor(this.map.GEM_GREY);
                }

                this.chainsToBeRemoved.push(chain);

            }
        }

        var hasLost = this.map.checkLost();
        var hasWon = this.map.checkWon();
        if (hasLost || hasWon) {
            game.state.start('finish', true, false, (this.gameScore + this.gameScoreBuffer));
        }

        this.activePiece = null;

    },

    tick: function() {

        // Remove Chains
        if (this.chainsToBeRemoved.length > 0) {
            for (var p = 0; p < this.chainsToBeRemoved.length; p++) {
                var chain = this.chainsToBeRemoved[p];
                for (var i = 0; i < chain.length; i++) {
                    this.map.removePiece(chain[i][1], chain[i][0]);
                    this.chainsToBeRemoved.splice(i, 1);
                }
            }
        }

        // Move Active Piece
        if (this.activePiece == null) {
            this.activePiece = new Piece(3, 0, false);
            this.map.addPiece(this.activePiece);
            this.map.updateMap();
        } else {
            if (this.map.isValidMove(this.activePiece, this.map.DOWN)) {
                this.activePiece.moveDown();
                this.map.updateMap();
                if (!this.map.isValidMove(this.activePiece, this.map.DOWN)) {
                    this.pieceStopped();
                }
            } else {
                this.pieceStopped();
            }
        }

    },

    incrementScore: function() {

        this.gameScore += 1;
        this.scoreCounter.setText(this.gameScore);

    },

    createScoreAnimation: function(score) {

        var scoreFont = "25px Helvetica";

        var scoreAnimation = game.add.text(100, 582, "+" + score, { font: scoreFont, fill: "#6dff68", stroke: "#212938", strokeThickness: 6 });
        scoreAnimation.anchor.setTo(0.5, 0);
        scoreAnimation.align = 'center';

        var scoreTween = game.add.tween(scoreAnimation).to({ x: 45, y: 582 }, 800, Phaser.Easing.Exponential.In, true);

        scoreTween.onComplete.add(function() {
            scoreAnimation.destroy();
            this.scoreTween.start();
            this.gameScoreBuffer += score;
        }, this);

    },

    gravityTick: function() {

        // Drop Single Pieces
        for (var i = 0; i < this.piecesToDrop.length; i++) {
            if (this.map.isValidMove(this.piecesToDrop[i], this.map.DOWN)) {
                this.piecesToDrop[i].moveDown();
                this.map.updateMap();
            } else {
                //this.piecesToDrop.splice(i, 1);
                // var chains = this.map.getValidChains();
                // for (chain of chains) {
                //     if (chain.length >= 3) {

                //         score = (chain.length * this.scoreMultiplier);
                //         this.chainSound.play();
                //         this.createScoreAnimation(score);

                //         for (coordiante of chain) {
                //             this.map.setAtPosition(coordiante[1], coordiante[0], this.map.GEM_GREY);
                //             var index = this.map.getIndexOfPiece(coordiante[1],coordiante[0]);
                //             this.map.pieces[index].setColor(this.map.GEM_GREY);
                //         }

                //         this.chainsToBeRemoved.push(chain);

                //     }
                // }
            }
        }

    },

    endTimer: function() {

        // Timer Finished
        this.timer.stop();
        game.state.start('finish', true, false, (this.gameScore + this.gameScoreBuffer));

    },

    formatTime: function(s) {

        // Format Timer
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);

    },

    update: function() {

        // Update Score Label
        if (this.gameScoreBuffer > 0) {
            this.incrementScore();
            this.gameScoreBuffer--;
        }

        // Update Timer
        if (this.timer.running) {
            this.timerCounter.setText(this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)), 2, 14, "#ff0");
        }

        // Remove Old Grid
        if (this.gridSprites != []) {
            for (var i in this.gridSprites) {
                this.gridSprites[i].kill();
                this.gridSprites[i].destroy();
            }
        }
        this.gridSprites = [];

        // Grid Location
        var x = 55;
        var y = 55;

        // Sprite Scaling
        var scale = 0.2;

        // Draw New Grid
        var gridSprites = [];
        for (var COL = 0; COL < this.map.HEIGHT; COL++) {
            for (var ROW = 0; ROW < this.map.WIDTH; ROW++) {

                var emptySquare = game.add.sprite(x, y, 'grid');
                emptySquare.anchor.setTo(0.5, 0.5);
                emptySquare.scale.setTo(scale, scale);
                emptySquare.alpha = (0.4);
                gridSprites.push(emptySquare);

                // Sprites
                switch (this.map.getAtPosition(ROW, COL)) {
                    case this.map.GEM_GREY:
                        var newPiece = game.add.sprite(x, y, 'gem_grey');
                        newPiece.anchor.setTo(0.5, 0.5);
                        newPiece.scale.setTo(scale, scale);
                        gridSprites.push(newPiece);
                        break;
                    case this.map.GEM_BLUE:
                        var newPiece = game.add.sprite(x, y, 'gem_blue');
                        newPiece.anchor.setTo(0.5, 0.5);
                        newPiece.scale.setTo(scale, scale);
                        gridSprites.push(newPiece);
                        break;
                    case this.map.GEM_GREEN:
                        var newPiece = game.add.sprite(x, y, 'gem_green');
                        newPiece.anchor.setTo(0.5, 0.5);
                        newPiece.scale.setTo(scale, scale);
                        gridSprites.push(newPiece);
                        break;
                    case this.map.GEM_RED:
                        var newPiece = game.add.sprite(x, y, 'gem_red');
                        newPiece.anchor.setTo(0.5, 0.5);
                        newPiece.scale.setTo(scale, scale);
                        gridSprites.push(newPiece);
                        break;
                    case this.map.GEM_YELLOW:
                        var newPiece = game.add.sprite(x, y, 'gem_yellow');
                        newPiece.anchor.setTo(0.5, 0.5);
                        newPiece.scale.setTo(scale, scale);
                        gridSprites.push(newPiece);
                        break;
                }

                this.gridHeight = (emptySquare.height);
                this.gridWidth = (emptySquare.width);
                x += this.gridWidth;

            }
            y += this.gridHeight;
            x = 55;
        }
        this.gridSprites = gridSprites;

    }

};