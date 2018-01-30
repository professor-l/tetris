/* global G */

var gameInterval;
var frameCount = 0;
var juggling;

var KeyCodes = {
    left: 37,
    right: 39,
    softDrop: 40,
    hardDrop: 32,
    hold: 67,
    rotateCW: 88,
    rotateCCW: 90
    
}

var Compressed = {
    leftRight: 0,
    softDrop: false,
    hardDrop: false,
    hold: false,
    rotateCW: false,
    rotateCCW: false
}

var Speeds = {
    das: 12,
    arr: 1,
    dasarr: 0,
    softDrop: 2,
    hardDrop: 1,
    gravity: 30
}

var ModValues = {
    left: 0,
    right: 0,
    softDrop: 0,
    gravity: 0
}

function keyDownFunction(e) {
    var c = e.keyCode;
    
    if (c == KeyCodes.left && Compressed.leftRight != -1) {
        Compressed.leftRight = -1;
        if (G.horizontalShift("l")) {
            juggling = false;
        }
        ModValues.left = frameCount % Speeds.das;
        Speeds.dasarr = Speeds.das;
    }
    
    else if (c == KeyCodes.right && Compressed.leftRight != 1) {
        Compressed.leftRight = 1;
        if (G.horizontalShift("r")) {
            juggling = false;
        }
        ModValues.right = frameCount % Speeds.das;
        Speeds.dasarr = Speeds.das;
    }
    
    else if (c == KeyCodes.softDrop && Compressed.softDrop == false) {
        Compressed.softDrop = true;
        ModValues.softDrop = frameCount % Speeds.softDrop;
    }
    
    else if (c == KeyCodes.hardDrop && Compressed.hardDrop == false) {
        clearInterval(gameLoop);
        
        juggling = false;
        Compressed.hardDrop = true;
        
        while (G.moveDown());
        
        G.clearLines(G.checkLineClears());
        
        if (!G.spawnNewPiece()) {
            endGame();
        }
        
        updateNextPieceDisplay();
        
        setInterval(gameLoop, 1000/60);
    }
    
    else if (c == KeyCodes.rotateCW && Compressed.rotateCW == false) {
        if (G.rotate("cw")) {
            juggling = false;
        }
    }
    
    else if (c == KeyCodes.rotateCCW && Compressed.rotateCCW == false) {
        if (G.rotate("ccw")) {
            juggling = false;
        }
    }
    
    else if (c == KeyCodes.hold && Compressed.hold == false) {
        Compressed.hold = true;
        G.hold();
        updateHoldPieceDisplay();
    }
}



function keyUpFunction(e) {
    var c = e.keyCode;
    
    if (c == KeyCodes.left && Compressed.leftRight == -1) {
        Compressed.leftRight = 0;
    }
    
    else if (c == KeyCodes.right && Compressed.leftRight == 1) {
        Compressed.leftRight = 0;
    }
    
    else if (c == KeyCodes.softDrop && Compressed.softDrop == true) {
        Compressed.softDrop = false;
    }
    
    else if (c == KeyCodes.hardDrop && Compressed.hardDrop == true) {
        Compressed.hardDrop = false;
    }
    
    else if (c == KeyCodes.rotateCW && Compressed.rotateCW == true) {
        Compressed.rotateCW = false;
    }
    
    else if (c == KeyCodes.rotateCCW && Compressed.rotateCCW == true) {
        Compressed.rotateCCW = false;
    }
    
    else if (c == KeyCodes.hold && Compressed.hold == true) {
        Compressed.hold = false;
    }
}

function gameLoop() {
    frameCount++;
    
    if (Compressed.leftRight == -1 && 
        frameCount % Speeds.dasarr == ModValues.left) {
        
        if (G.horizontalShift("l")) {
            juggling = false;
        }
        if (Speeds.dasarr == Speeds.das) { 
            Speeds.dasarr = Speeds.arr;
            ModValues.left = frameCount % Speeds.arr;
        }
    }
    
    
    
    else if (Compressed.leftRight == 1 && 
             frameCount % Speeds.dasarr == ModValues.right) {
        
        if (G.horizontalShift("r")) {
            juggling = false;
        }
        if (Speeds.dasarr == Speeds.das) { 
            Speeds.dasarr = Speeds.arr;
            ModValues.right = frameCount % Speeds.arr;
        }
    }
    
    if (Compressed.softDrop == true && 
        frameCount % Speeds.softDrop == ModValues.softDrop) {
        
        G.moveDown();
    }
    
    if (juggling && frameCount % Speeds.gravity == ModValues.gravity) {
        juggling = false;
        
        G.clearLines(G.checkLineClears());
        
        if (!G.spawnNewPiece()) {
            endGame();
        }
        updateNextPieceDisplay();
    }
    
    else if (frameCount % Speeds.gravity == ModValues.gravity) {
        if (!G.moveDown()) {
            juggling = true;
        }
    }
    
    G.update();
}



function startGame() {
    G.spawnNewPiece();
    updateNextPieceDisplay();
    gameInterval = setInterval(gameLoop, 1000/60);
    
    document.onkeydown = keyDownFunction;
    document.onkeyup = keyUpFunction;
}

function endGame() {
    document.onkeydown = null;
    document.onkeyup = null;
    
    clearInterval(gameInterval);
}



document.getElementById("start-button").onclick = startGame;