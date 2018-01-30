var tableBody = document.getElementById("game-table-body");

function initBoardTable() {
    for (var i = 20; i < 40; i++) {
        
        var row = document.createElement("tr");
        row.id = "row" + i;
        
        for (var j = 0; j < 10; j++) {
            var cell = document.createElement("td");
            cell.id = i + "-" + j;
            cell.className = "blank";
            
            row.appendChild(cell);
        }
        
        tableBody.appendChild(row);
        
    }
}

initBoardTable();



function updateNextPieceDisplay() {
    var b = document.getElementById("next-table-body");
    
    while (b.children[0].firstElementChild) {
        b.children[0].removeChild(b.children[0].firstElementChild);
    }
    while (b.children[1].firstElementChild) {
        b.children[1].removeChild(b.children[1].firstElementChild);
    }
    
    var ref = pieces[G.nextPiece][0];
    
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < ref[i].length; j++) {
            var td = document.createElement("td");
            td.className = colors[ref[i][j]];
            b.children[i].appendChild(td);
        }
    }
}

function updateHoldPieceDisplay() {
    var b = document.getElementById("hold-table-body");
    
    while (b.children[0].firstElementChild) {
        b.children[0].removeChild(b.children[0].firstElementChild);
    }
    while (b.children[1].firstElementChild) {
        b.children[1].removeChild(b.children[1].firstElementChild);
    }
    
    var ref = pieces[G.holdPiece][0];
    
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < ref[i].length; j++) {
            var td = document.createElement("td");
            td.className = colors[ref[i][j]];
            b.children[i].appendChild(td);
        }
    }
}