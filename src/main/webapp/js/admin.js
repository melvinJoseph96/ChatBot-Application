function search() {

}
function login(){

}

function addRow(){
    var table = document.getElementById("display");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 =row.insertCell(2);
    var cell4 =row.insertCell(3);
    var cell5 =row.insertCell(4);
    cell1.innerHTML = "aaa";
    cell2.innerHTML = "bbb";
    cell3.innerHTML = "ccc";
    cell4.innerHTML = "<button onclick='return false;'>/<button>";
    cell5.innerHTML = "<button onclick='return false;' style='color: red; text-shadow: 0 1px 0 #fff;'>X<button>";
}