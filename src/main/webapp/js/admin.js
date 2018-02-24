function search() {
    var input = document.getElementById("searchBar");
    var table = document.getElementById("display");
    var searchLower = input.value.toLowerCase();
    var tr = table.getElementsByTagName("tr");
    for (var i = 0; i < tr.length; i++) {
        var td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            if (td.innerHTML.toLowerCase().indexOf(searchLower) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function addRow(){
    var x = document.getElementById("name").value;
    var y = document.getElementById("userSays").value;
    var z = document.getElementById("responses").value;
    if (x.length>=1 && y.length>=1 && z.length>=1) {
        var table = document.getElementById("display");
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML = document.getElementById("name").value;
        cell2.innerHTML = document.getElementById("userSays").value;
        cell3.innerHTML = document.getElementById("responses").value;
        cell4.innerHTML = "<button onclick='return false;' style='color: green; text-shadow: 0 1px 0 #fff;'>/<button>";
        cell5.innerHTML = "<button onclick='return false;' style='color: red; text-shadow: 0 1px 0 #fff;'>X<button>";
    }
}
function load(){
    console.log("loaded admin.js");
    $.ajax({
        type: "GET",
        url:'/intents',
        success: function(data) {
            // data.forEach(displayIntent());
            for (var i=0; i<data.length;i++){
                displayIntent(data[i]);
            }
        }
    });
}

function displayIntent(intent){
    var table = document.getElementById("display");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = intent.name; //name
    cell2.innerHTML = intent.userSays; //userSays
    cell3.innerHTML = intent.responses; //responses
    cell4.innerHTML = "<button onclick='return false;' style='color: green;'>/<button>";
    cell5.innerHTML = "<button onclick='return false;' style='color: red;'>X<button>";
}