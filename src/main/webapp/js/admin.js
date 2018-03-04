function search() {
    var table = document.getElementById("display"); // Get the table
    var input = document.getElementById("searchBar"); // Get admin input
    var inputLower = input.value.toLowerCase(); // Put all characters to lower case
    var tr = table.getElementsByTagName("tr"); // Get all rows from table
    for (var i = 0; i < tr.length; i++) { // For each row in the table
        var td0 = tr[i].getElementsByTagName("td")[0]; // Get the cell at index 0 (1st column)
        var td1 = tr[i].getElementsByTagName("td")[1]; // Get the cell at index 1 (2nd column)
        var td2 = tr[i].getElementsByTagName("td")[2]; // Get the cell at index 2 (3rd column)
        if (td0 || td1 || td2) { // If it exists
            if ((td0.innerHTML.toLowerCase().indexOf(inputLower) >= 0)||(td1.innerHTML.toLowerCase().indexOf(inputLower) >= 0)||(td2.innerHTML.toLowerCase().indexOf(inputLower) >= 0)) { // If the data within the cells matches the searched value
                tr[i].style.display = ""; // Make  row visible
            } else { // Otherwise
                tr[i].style.display = "none"; // Make invisible
            }
        }
    }
}

function addRow(){
    var x = document.getElementById("name").value; // get admin input values
    var y = document.getElementById("userSays").value;
    var z = document.getElementById("responses").value;
    var data = [x,y,z];
    if (x.length>=1 && y.length>=1 && z.length>=1) { // check data is added to each
        // if so
        // set up the controller parameters
        $.ajax({
            type: "POST",
            url: '/add',
            data: JSON.stringify(data),
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                // log the success
                console.log("intent added");
                // display the intent on the table
                displayIntent(data);
            },
            error: function () {
                console.log("error occurred while adding intent")
            }
        });
    }
}
function load(){
    console.log("loaded admin.js");
    // when the page loads
    // got to /intents to get all the intent information from dialogflow
    $.ajax({
        type: "GET",
        url:'/intents',
        success: function(data) {
            // for each intent received, add it to the table
            for (var i=0; i<data.length;i++){
                displayIntent(data[i]);
            }
        },
        error: function(){
            console.log("intents failed to load");
        }
    });
}

function displayIntent(intent){
    var table = document.getElementById("display"); // get the display table
    var row = table.insertRow(0); // insert a row
    var cell1 = row.insertCell(0); // insert 5 cells
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = intent.name; //set cell data to intent name
    cell2.innerHTML = intent.userSays; //set cell data to intent's userSays
    cell3.innerHTML = intent.responses; //set cell data to intent's responses
    cell4.innerHTML = "<button onclick='update("+cell1+","+cell2+","+cell3+");' style='color: green;'>/<button>"; // add edit button
    cell5.innerHTML = "<button onclick='return deleteIntent(\"" + intent.id + "\");' style='color: red;'>X<button>"; // add delete button
}


function deleteIntent(id) {
    $.ajax({
        type: "POST",
        url: '/delete',
        data: id,
        contentType: "text/plain",
        success: function () {
            console.log("intent deleted");
            //when intent is succesfully deleted it is also removed from the currently displayed table
            var table = document.getElementById("display");
            while (table.hasChildNodes()) {
                table.removeChild(table.firstChild);
            }
            load();
            console.log("intent removed from the table")
        },
        error: function () {
            console.log("error while deleting intent");
        }
    });
}

function update(one, two, three){
    one.innerHTML = "<input type='text' placeholder='"+one.innerText+"'>";
}

