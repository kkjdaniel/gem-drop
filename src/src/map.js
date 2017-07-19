function GameMap() {

    // Map Constants
    this.WIDTH = 7;
    this.HEIGHT = 16;

    this.EMPTY = 0;
    this.GEM_GREY = 9;
    this.GEM_BLUE = 1;
    this.GEM_GREEN = 2;
    this.GEM_RED = 3;
    this.GEM_YELLOW = 4;

    this.UP = 0;
    this.DOWN = 1;
    this.LEFT = 2;
    this.RIGHT = 3;
    this.ROTATE = 4;

    this.XAxis = 0;
    this.YAxis = 1;

    // Map Array
    this.locations = [];

    // Pieces Array
    this.pieces = [];

    // Set Object at Coordinates
    this.setAtPosition = function(x, y, object) {
        this.locations[y][x] = object;
    };

    // Get Object at Coordinates
    this.getAtPosition = function(x, y) {
        return this.locations[y][x];
    };

    // Check if Coordinate is in a Specific Piece
    this.inPiece = function(piece, x, y) {
        var match = false;
        for (var i = 0; i < piece.POSITIONS[piece.position].length; i++) {
            var xToCheck = piece.POSITIONS[piece.position][i][0];
            var yToCheck = piece.POSITIONS[piece.position][i][1];
            if (x == xToCheck && y == yToCheck) {
                match = true;
            }
        }
        return match;
    };

    // Check if Square is Empty
    this.isEmpty = function(x, y) {
        if (x >= 0 && x <= (this.WIDTH - 1) && y >= 0 && y <= (this.HEIGHT - 1)) { // Check Map Boundaries
            if (this.locations[y][x] == this.EMPTY) { // Check Location
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    // Add Piece to Map
    this.addPiece = function(piece) {
        this.pieces.push(piece);
    };

    // Get Piece by Location
    this.getIndexOfPiece = function(x, y) {
        var match = false;

        for (var i = 0; i < this.pieces.length; i++) {
            var piece = this.pieces[i];
            var xToCheck = piece.POSITIONS[piece.position][0][0];
            var yToCheck = piece.POSITIONS[piece.position][0][1];
            if (x == xToCheck && y == yToCheck) {
                match = i;
            }
        }

        return match;
    };

    // Remove Piece by Location
    this.removePiece = function(x, y) {
        var match = false;

        for (var i = 0; i < this.pieces.length; i++) {
            var piece = this.pieces[i];
            var xToCheck = piece.POSITIONS[piece.position][0][0];
            var yToCheck = piece.POSITIONS[piece.position][0][1];
            if (x == xToCheck && y == yToCheck) {
                this.pieces.splice(i, 1);
                match = true;
            }
        }

        return match;
    };

    // Remove the Latest Piece
    this.removeLatestPiece = function(piece) {
        this.pieces.pop();
    };

    // Initialise Game Map
    this.init = function(difficulty) {
        var locations = [];
        for (var COL = 0; COL < this.HEIGHT; COL++) {
            var newRow = [];
            for (var ROW = 0; ROW < this.WIDTH; ROW++) {

                // Initialise Grid with Pieces
                var chance = Math.random();
                if (chance < difficulty) {
                    newRow.push(this.EMPTY);
                } else if (chance < 1.0) {
                    if (COL > 6) {
                        var piece = new Piece(ROW, COL, true);
                        this.addPiece(piece);
                        newRow.push(piece.color);
                    } else {
                        newRow.push(this.EMPTY);
                    }
                }

            }
            locations.push(newRow);
        }
        this.locations = locations;
        return locations;
    };

    // Update Map Locations
    this.updateMap = function() {
        var pieces = [];
        for (var i = 0; i < this.pieces.length; i++) {
            var piece = this.pieces[i];
            for (var p = 0; p < piece.POSITIONS[piece.position].length; p++) {
                var x = piece.POSITIONS[piece.position][p][0];
                var y = piece.POSITIONS[piece.position][p][1];
                var color = piece.color[p];
                var position = [x, y, color];
                pieces.push(position);
            }
        }

        var locations = [];
        for (var COL = 0; COL < this.HEIGHT; COL++) {
            var newRow = [];

            // Set to Empty as Default
            for (var i = 0; i < this.WIDTH; i++) {
                newRow.push(this.EMPTY);
            }

            for (var ROW = 0; ROW < this.WIDTH; ROW++) {
                // Populate Row with Pieces
                for (var i = 0; i < pieces.length; i++) {
                    var x = pieces[i][0];
                    var y = pieces[i][1];
                    var color = pieces[i][2];
                    if (y == COL && x == ROW) {
                        newRow[x] = color;
                    }
                }

            }

            locations.push(newRow);
        }
        this.locations = locations;

        return locations;
    };

    // Check Valid Move In Direction
    this.isValidMove = function(piece, dir) {
        var flag = true;

        if (dir == this.ROTATE) { // Rotation
            for (var i = 0; i < piece.POSITIONS[piece.getNextPosition()].length; i++) {
                var x = piece.POSITIONS[piece.getNextPosition()][i][0];
                var y = piece.POSITIONS[piece.getNextPosition()][i][1];
                if (!this.isEmpty(x, y)) {
                    if (!this.inPiece(piece, x, y)) {
                        flag = false;
                    }
                }
            }
        } else { // Movement
            for (var i = 0; i < piece.POSITIONS[piece.position].length; i++) {
                var x = piece.POSITIONS[piece.position][i][0];
                var y = piece.POSITIONS[piece.position][i][1];

                if (dir == this.DOWN) {
                    if (!this.isEmpty(x, y + 1)) {
                        if (!this.inPiece(piece, x, y + 1)) {
                            flag = false;
                        }
                    }
                } else if (dir == this.UP) {
                    if (!this.isEmpty(x, y - 1)) {
                        if (!this.inPiece(piece, x, y - 1)) {
                            flag = false;
                        }
                    }
                } else if (dir == this.LEFT) {
                    if (!this.isEmpty(x - 1, y)) {
                        if (!this.inPiece(piece, x - 1, y)) {
                            flag = false;
                        }
                    }
                } else if (dir == this.RIGHT) {
                    if (!this.isEmpty(x + 1, y)) {
                        if (!this.inPiece(piece, x + 1, y)) {
                            flag = false;
                        }
                    }
                }
            }
        }

        return flag;
    };

    // Find Valid Chains
    this.getValidChains = function() {
        var chains = [];

        for (var COL = 0; COL < this.HEIGHT; COL++) {
            for (var ROW = 0; ROW < this.WIDTH; ROW++) {

                var location = this.locations[COL][ROW];

                var right;
                if (ROW + 1 < this.WIDTH) {
                    right = this.locations[COL][ROW + 1];
                } else {
                    right = null;
                }

                var down;
                if (COL + 1 < this.HEIGHT) {
                    down = this.locations[COL + 1][ROW];
                } else {
                    down = null;
                }

                if (right == location && location != this.EMPTY) {

                    var newChain = [];

                    newChain.push([COL, ROW]);
                    newChain.push([COL, ROW + 1]);
                    var chainActive = true;
                    var spaceToCheck = 2;

                    while (chainActive) {
                        if (ROW + spaceToCheck < this.WIDTH) {
                            if (this.locations[COL][ROW + spaceToCheck] == location) {
                                newChain.push([COL, ROW + spaceToCheck]);
                                spaceToCheck++;
                            } else {
                                chainActive = false;
                            }
                        } else {
                            chainActive = false;
                        }
                    }

                    chains.push(newChain);

                } else if (down == location && location != this.EMPTY) {

                    var newChain = [];

                    newChain.push([COL, ROW]);
                    newChain.push([COL + 1, ROW]);
                    var chainActive = true;
                    var spaceToCheck = 2;

                    while (chainActive) {
                        if (COL + spaceToCheck < this.HEIGHT) {
                            if (this.locations[COL + spaceToCheck][ROW] == location) {
                                newChain.push([COL + spaceToCheck, ROW]);
                                spaceToCheck++;
                            } else {
                                chainActive = false;
                            }
                        } else {
                            chainActive = false;
                        }
                    }

                    chains.push(newChain);

                }
            }
        }

        return chains;
    };

    this.checkLost = function() {
        var flag = false;
        if (this.getAtPosition(3, 0) != this.EMPTY || this.getAtPosition(3, 1) != this.EMPTY) {
            //Board Filled / Game Over
            flag = true;
        }
        return flag;
    };

    this.checkWon = function() {
        var flag = true;
        for (var COL = 0; COL < this.HEIGHT; COL++) {
            for (var ROW = 0; ROW < this.WIDTH; ROW++) {
                if (this.getAtPosition(COL, ROW) != this.EMPTY) {
                    flag = false;
                }
            }
        }
        return flag;
    };

}