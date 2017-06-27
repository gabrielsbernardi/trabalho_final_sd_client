(function() {
    $("#sala-button").click(function() {        
        $(location).attr('href', '/room?room=' + $('#sala-input').val());
    });
})();

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
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        var th = document.createElement("th");
        tr.appendChild(th);
        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < dataRoom.length; i++) {

            tr = table.insertRow(-1);
            tr.innerHTML = "<button id=\"sala-button\">Ir</button>";

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = dataRoom[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);  
    })

    
}