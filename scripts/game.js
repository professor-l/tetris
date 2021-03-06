function Piece(index) {
    this.referenceArray = pieces[index];
    this.rotationIndex = 0;
    this.coordinates = [];
}

function duplicatePiece(p) {
    var d = new Piece(0);
    d.referenceArray = p.referenceArray;
    d.rotationIndex = p.rotationIndex;
    d.coordinates = p.coordinates.slice();
    return d;
}

function getWallKickData(pieceArray, startRI, endRI) {
    if (pieceArray != IPiece) {
        
        if (startRI == 0 && endRI == 1) {
            return [[0, 0], [0, -1], [-1, -1], [2, 0], [2, -1]];
        }
        
        if (startRI == 1 && endRI == 0) {
            return [[0, 0], [0, 1], [1, 1], [-2, 0], [-2, 1]];
        }
        
        
        
        if (startRI == 1 && endRI == 2) {
            return [[0, 0], [0, 1], [1, 1], [-2, 0], [-2, 1]];
        }
        
        if (startRI == 2 && endRI == 1) {
            return [[0, 0], [0, -1], [-1, -1], [2, 0], [2, -1]];
        }
        
        
        
        if (startRI == 2 && endRI == 3) {
            return [[0, 0], [0, -1], [-1, 1], [2, 0], [2, 1]];
        }
        
        if (startRI == 3 && endRI == 2) {
            return [[0, 0], [0, 1], [1, -1], [-2, 0], [-2, -1]];
        }
        
        
        
        if (startRI == 3 && endRI == 0) {
            return [[0, 0], [0, 1], [1, -1], [-2, 0], [-2, -1]];
        }
        
        if (startRI == 0 && endRI == 3) {
            return [[0, 0], [0, -1], [-1, 1], [2, 0], [2, 1]];
        }
    }
    
    
    
    else {
        
        if (startRI == 0 && endRI == 1) {
            return [[0, 0], [0, -2], [0, 1], [1, -2], [-2, 1]];
        }
        
        if (startRI == 1 && endRI == 0) {
            return [[0, 0], [0, 2], [0, -1], [-1, 2], [2, -1]];
        }
        
        
        
        if (startRI == 1 && endRI == 2) {
            return [[0, 0], [0, -1], [0, 2], [-2, -1], [1, -2]];
        }
        
        if (startRI == 2 && endRI == 1) {
            return [[0, 0], [0, 1], [0, -2], [2, 1], [-1, 2]];
        }
        
        
        
        if (startRI == 2 && endRI == 3) {
            return [[0, 0], [0, 2], [0, -1], [-1, 2], [2, -1]];
        }
        
        if (startRI == 3 && endRI == 2) {
            return [[0, 0], [0, -2], [0, 1], [1, -2], [-2, 1]];
        }
        
        
        
        if (startRI == 3 && endRI == 0) {
            return [[0, 0], [0, 1], [0, -2], [2, 1], [-1, 2]];
        }
        
        if (startRI == 0 && endRI == 3) {
            return [[0, 0], [0, -1], [0, 2], [-2, -1], [1, -2]];
        }
        
    }
    
    return [[0, 0]];
}

function validCoordinates(i, j) {
    return (i >= 0 && i < 40 && j >= 0 && j < 10);
}




// Game object for easy duplication
function Game() {

    // Board array, 2d
    this.board = [];
    
    this.currentPiece;
    this.ghost;
    this.ghostBool = true;
    
    // Previous board, used to minimize updates of DOM
    this.previousBoard = [];
    
    this.updatePreviousBoard = function() {
        for (var i = 10; i < 40; i++) {
            this.previousBoard[i] = this.board[i].slice();
        }
    }

    

    this.resetBoards = function() {
        this.board = [];
        this.previousBoard = [];
        for (var i = 0; i < 40; i++) {
            this.board.push([0,0,0,0,0,0,0,0,0,0]);
            this.previousBoard.push([0,0,0,0,0,0,0,0,0,0]);
        }
    }
    this.resetBoards();
    
    
    
    // Draw and Update - DOM functions
    this.draw = function() {
        for (var i = 20; i < 40; i++) {
            for (var j = 0; j < 10; j++) {
                document.getElementById(i + "-" + j).className = 
                    colors[this.board[i][j]];
            }
        }
    }
    
    this.update = function() {
        for (var i = 20; i < 40; i++) {
            for (var j = 0; j < 20; j++) {
                if (this.board[i][j] != this.previousBoard[i][j]) {
                    document.getElementById(i + "-" + j).className = 
                        colors[this.board[i][j]];
                }
            }
        }
        this.updatePreviousBoard();
    }
    
    
    
    // Upcoming pieces functionality
    this.nextArrays = [[],[]];
    this.nextPiece;
    
    this.getNewPiece = function() {
        
        // If nextArray[1] is empty
        if (this.nextArrays[1][0] === undefined) {
            
            // Shuffle permutations of 0-6 with Fischer-Yates
            this.nextArrays[1] = [0, 1, 2, 3, 4, 5, 6];
            
            for (var i = this.nextArrays[1].length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                
                var temp = this.nextArrays[1][i];
                this.nextArrays[1][i] = this.nextArrays[1][j];
                this.nextArrays[1][j] = temp;
            }
        }
        
        // If nextArrah[0] is empty
        if (this.nextArrays[0][0] === undefined) {
            
            // Copy from fixed-length sub-array
            this.nextArrays[0] = this.nextArrays[1].slice();
            
            // Shuffle with Fischer-Yates
            for (var i = this.nextArrays[1].length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                
                var temp = this.nextArrays[1][i];
                this.nextArrays[1][i] = this.nextArrays[1][j];
                this.nextArrays[1][j] = temp;
                
            }
        }
        
        // Get next piece if necessary
        if (this.nextPiece === undefined) {
            this.nextPiece = this.nextArrays[0].shift();
        }
        
        // Reset next piece
        var newIndex = this.nextPiece;
        this.nextPiece = this.nextArrays[0].shift();
        
        // Set current piece based on next piece before it was reset
        this.currentPiece = new Piece(newIndex);
        
        return newIndex;
    }
    
    
    
    // Helper functions for piece manipulation
    this.attemptPlacement = function(pieceObject) {
        
        for (var i = 0; i < pieceObject.referenceArray[0].length; i++) {
            for (var j = 0; j < pieceObject.referenceArray[0][0].length; j++) {
                
                // If this is a value that will be written (not 0)
                if (pieceObject.referenceArray[pieceObject.rotationIndex][i][j]
                    != 0) {
                    
                    // Get cooridnates on board
                    var boardi = pieceObject.coordinates[0] + i;
                    var boardj = pieceObject.coordinates[1] + j;
                    
                    if (!validCoordinates(boardi, boardj)) { return false; }
                    
                    // If location is occupied (1-7, inclusive)
                    var value = this.board[boardi][boardj];
                    if (value > 0 && value < 8) {
                        return false;
                    }
                    
                }
            }
        }
        
        // If we have not yet returned false, this will work, so write piece
        for (i = 0; i < pieceObject.referenceArray[0].length; i++) {
            for (j = 0; j < pieceObject.referenceArray[0][0].length; j++) {
                
                var piece = 
                    pieceObject.referenceArray[pieceObject.rotationIndex];
                
                if (piece[i][j] != 0) {
                    
                    boardi = pieceObject.coordinates[0] + i;
                    boardj = pieceObject.coordinates[1] + j;

                    this.board[boardi][boardj] = piece[i][j];
                }
            }
        }
        
        return true;
        
    }
    
    this.removeCurrentPiece = function() {
        for (var i = 0; 
             i < this.currentPiece.referenceArray[0].length; 
             i++) {
            for (var j = 0; 
                 j < this.currentPiece.referenceArray[0][0].length; 
                 j++) {
                
                var piece = this.currentPiece.referenceArray
                            [this.currentPiece.rotationIndex];
                
                var boardi = this.currentPiece.coordinates[0] + i;
                var boardj = this.currentPiece.coordinates[1] + j;
                
                if (piece[i][j] != 0) {
                    this.board[boardi][boardj] = 0;
                }
            }
        }
    }
    
    
    
    // Actual manipulation functions
    this.spawnNewPiece = function(p) {
        this.holdBool = false;
        
        if (!p) { this.getNewPiece(); }
        else { this.currentPiece = p; }
        
        var spawni = 18;
        var spawnj = 5 - Math.floor(
            (this.currentPiece.referenceArray[0][0].length + 1) / 2);
        this.currentPiece.coordinates = [spawni, spawnj];
        
        var successful = this.attemptPlacement(this.currentPiece);
        this.moveDown();
        
        if (this.ghostBool) { this.updateGhost(); }
        
        return successful;
    }
    
    this.rotate = function(s) {
        
        // Duplicate currentPiece
        var toRotate = duplicatePiece(this.currentPiece);
        
        // Get next rotation index by adding 1 or 3, then modding
        toRotate.rotationIndex += (s == "ccw" ? 3 : 1);
        toRotate.rotationIndex %= toRotate.referenceArray.length;
        
        // Erase current piece to test for rotations
        this.removeCurrentPiece();
        
        // Get wall kick data using function above
        var kicks = getWallKickData(toRotate.referenceArray,
                                    this.currentPiece.rotationIndex,
                                    toRotate.rotationIndex);
        
        var successful = false;
        
        // For each coordinate in wall kick data
        for (var i = 0; i < kicks.length; i++ ) {
            
            // Add offsets
            toRotate.coordinates[0] += kicks[i][0];
            toRotate.coordinates[1] += kicks[i][1];
            
            // If successful, break loop
            successful = this.attemptPlacement(toRotate);
            if (successful) { break; }
            
            // Remove offsets if unsuccessful
            else {
                toRotate.coordinates[0] -= kicks[i][0];
                toRotate.coordinates[1] -= kicks[i][1];
            }
        }
        
        if (successful) { this.currentPiece = toRotate; }
        
        // Redraw currentPiece if it wasn't redrawn
        else { this.attemptPlacement(this.currentPiece); }
        
        if (this.ghostBool) {
            this.eraseGhost();
            this.updateGhost();
        }
        
        return successful;
    }
    
    this.horizontalShift = function(s) {
        
        this.removeCurrentPiece();
        
        this.currentPiece.coordinates[1] += (s == 'l' ? -1 : 1);
        var successful = this.attemptPlacement(this.currentPiece);
        
        if (successful) {
            if (this.ghostBool) {
                this.eraseGhost();
                this.updateGhost();
            }
            return true;
        }
    
        this.currentPiece.coordinates[1] -= (s == 'l' ? -1 : 1);    
        this.attemptPlacement(this.currentPiece);
        return false;
        
    }
    
    this.moveDown = function() {
        
        this.removeCurrentPiece();
        
        this.currentPiece.coordinates[0] += 1;
        var successful = this.attemptPlacement(this.currentPiece);
        if (successful) { return true; }
    
        this.currentPiece.coordinates[0] -= 1;    
        this.attemptPlacement(this.currentPiece);
        return false;
        
    }
    
    
    
    // Clearing lines
    this.checkLineClears = function() {
        
        var clearRows = [];
        
        for (var i = 0; i < 40; i++) {
            
            var clear = true;
            
            for (var j = 0; j < 10; j++) {
                if (this.board[i][j] < 1 || this.board[i][j] > 7) {
                    clear = false;
                    break;
                }
            }
            
            if (clear) {
                clearRows.push(i);
            }
            
        }
        return clearRows;
    }
    
    this.clearLines = function(a) {
        for (var i = 0; i < a.length; i++) {
            
            for (var j = a[i]; j > 0; j--) {
                this.board[j] = this.board[j - 1].slice();
            }
            
            G.board[0] = [0,0,0,0,0,0,0,0,0,0];
        }
    }
    
    
    
    // Manipulation of ghost piece
    this.updateGhost = function() {
        var toGhost = duplicatePiece(this.currentPiece);
        
        while (this.moveDown());
        
        this.ghost = duplicatePiece(this.currentPiece);
        this.removeCurrentPiece();
        
        var draw = this.ghost.referenceArray[this.ghost.rotationIndex];
        
        for (var i = 0; i < draw.length; i++) {
            for (var j = 0; j < draw[i].length; j++) {
                if (draw[i][j] != 0) {
                    var boardi = this.ghost.coordinates[0] + i;
                    var boardj = this.ghost.coordinates[1] + j;
                    this.board[boardi][boardj] = 15 - draw[i][j];
                }
            }
        }
        
        this.currentPiece = toGhost;
        this.attemptPlacement(this.currentPiece);
        
    }
    
    this.eraseGhost = function() {
        var erase = this.ghost.referenceArray[this.ghost.rotationIndex];
        
        for (var i = 0; i < erase.length; i++) {
            for (var j = 0; j < erase[i].length; j++) {
                if (erase[i][j] != 0) {
                    var boardi = this.ghost.coordinates[0] + i;
                    var boardj = this.ghost.coordinates[1] + j;
                    if (this.board[boardi][boardj] > 7) {
                        this.board[boardi][boardj] = 0;
                    }
                }
            }
        }
    }
    
    
    
    // Hold piece
    this.holdPiece = -1;
    this.holdBool = false;
    
    this.hold = function() {
        
        if (this.holdBool) { return false; }
        
        this.removeCurrentPiece();
        this.eraseGhost();
        
        var prevHold = this.holdPiece;
        this.holdPiece = pieces.indexOf(this.currentPiece.referenceArray);
        
        if (prevHold == -1) {
            var t = this.spawnNewPiece();
            this.holdBool = true;
            return t;
        }
        
        this.currentPiece = new Piece(prevHold);
        var t = this.spawnNewPiece(this.currentPiece);
        
        this.holdBool = true;
        
        return t;
    }
}

var G = new Game();