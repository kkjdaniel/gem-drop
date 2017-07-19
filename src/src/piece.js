function Piece(x, y, single, color) {

    // Initialisation
    this.X = x;
    this.Y = y;

    // Positions Array
    this.POSITIONS = [
        [[x,y],[x,y+1]],
        [[x,y],[x+1,y]], 
        [[x,y],[x,y-1]], 
        [[x,y],[x-1,y]], 
        [[x,y]]
    ];

    // Current Position
    this.position = ((single) ? 4 : 0);

    // Piece Colour
    this.color = ((color == null) ? [Math.floor((Math.random() * 4) + 1), Math.floor((Math.random() * 4) + 1)] : [color]);

    // Get Next Position (After Rotation)
    this.getNextPosition = function() {
        if (this.position == 3) {
            return 0;
        } else {
            return (this.position + 1);
        }
    };

    // Update Positions with new Coordinates
    this.updatePositions = function() {
        this.POSITIONS = [
            [[this.X,this.Y],[this.X,this.Y+1]],
            [[this.X,this.Y],[this.X+1,this.Y]], 
            [[this.X,this.Y],[this.X,this.Y-1]], 
            [[this.X,this.Y],[this.X-1,this.Y]], 
            [[this.X,this.Y]]
        ];
    };

    // Change Piece Coordinates
    this.moveUp = function() {
        this.Y = (this.Y - 1);
        this.updatePositions();
    };

    this.moveDown = function() {
    	this.Y = (this.Y + 1);
        this.updatePositions();
    };

    this.moveLeft = function() {
    	this.X = (this.X - 1);
        this.updatePositions();
    };

    this.moveRight = function() {
    	this.X = (this.X + 1);
        this.updatePositions();
    };

    // Change Position, Rotating Piece
    this.rotate = function() {
        if (this.position == 3) {
            this.position = 0;
        } else {
            this.position++;
        }
    }

    // Set Piece Colour
    this.setColor = function(color) {
        this.color = [color];
    }

}