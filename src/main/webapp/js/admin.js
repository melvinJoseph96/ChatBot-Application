function search() {

}
function login(){

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
        cell4.innerHTML = "<button onclick='return false;'>/<button>";
        cell5.innerHTML = "<button onclick='return false;' style='color: red; text-shadow: 0 1px 0 #fff;'>X<button>";
    }
}