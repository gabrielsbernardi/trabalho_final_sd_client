function goRoom(room, name) {
    window.location.href = "/room?room=" + room + "&name=" + name;
}

function postRoom(name) {
    $.post('https://mysterious-harbor-62613.herokuapp.com/sala/insereSala', {nome: name}, (data) => {
        if (data.result == "success") {
            createTableFromJSON();
        }
    }) 
}

window.onload = function() {
    createTableFromJSON();
}

function createTableFromJSON() {

    $.get('https://mysterious-harbor-62613.herokuapp.com/sala/buscarSalas', (data) => {
        var dataRoom = data.json;

        // EXTRACT VALUE FOR HTML HEADER. 
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        var col = [];
        for (var i = 0; i < dataRoom.length; i++) {
            for (var key in dataRoom[i]) {
                key = key == "id" ? "ID" : "Nome"; 
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }                    
        }
        col.push("");

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.
                
        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < dataRoom.length; i++) {

            tr = table.insertRow(-1);                    
            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                if (col[j] == "ID") {
                    tabCell.innerHTML = dataRoom[i]["id"];
                } else if (col[j] == "Nome") {
                    tabCell.innerHTML = dataRoom[i]["nome"];
                } else {
                    tabCell.innerHTML = "<button class='button-table' id=\"sala-button\" onclick=\"goRoom(" + dataRoom[i]["id"] + ", '" + dataRoom[i]["nome"] + "')\">Acessar</button>";
                }
            }        
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);  
    })

    
}