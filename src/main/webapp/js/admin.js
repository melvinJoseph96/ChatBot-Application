function search() {

}
function login(){

}

function addRow(){
    var table = document.getElementById("intents");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 =row.insertCell(2);
    var cell4 =row.insertCell(3);
    var cell5 =row.insertCell(4);
    cell1.innerHTML = "aaa";
    cell2.innerHTML = "bbb";
    cell3.innerHTML = "ccc";
    cell4.innerHTML = "<button>/<button>";
    cell5.innerHTML = "<button>X<button>";
}