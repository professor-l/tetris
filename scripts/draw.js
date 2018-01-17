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