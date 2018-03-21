$(document).ready(function(){
    $('#userSays').keypress(function(e){ // when enter key is hit for the user bar
        if(e.keyCode === 13) {
            addTo('addedUser', "userSays"); // add the userSays input value to the addedUser list
        }
    });
    $('#responses').keypress(function(e){ // when user key is hit for the response bar
        if(e.keyCode === 13) {
            addTo('addedResp', "responses"); // add the responses input value to the addedResp list
        }
    });
    $('#input').on('keypress', function(e) { // When a key is pressed
        if(e.keyCode === 13 || e.which === 13) { // And the key is enter
            run(); // method found in chatbotMessages.js
        }
    });
});

function search() { // search bar function
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

function addTo(id,name) {
    $('#' + id).fadeIn(); // display the list
    var user = document.getElementById(id);
    user.style.backgroundColor = "white";
    var list = user.getElementsByTagName("ul")[0]; // get the list element
    var data = document.createElement("li"); //create a list item
    data.style.wordWrap = "break-word"; // wrap key word if too long
    data.style.borderBottom = "1px solid #f8f8f8"; // add line under each element
    data.onclick = function () { // when the item is clicked, it will be deleted
        this.parentElement.removeChild(this);
        if($('#' + id).has("ul").has("li").length === 0){
            $('#' + id).fadeOut();
        }
    };
    data.innerText = document.getElementById(name).value; // get the inputted value
    list.appendChild(data); // add it to the list
    document.getElementById(name).value = ""; // remove the value from the name input box
}

function addRow(){
    // get admin input values
    var x = document.getElementById("name").value; // name is input box value
    if (document.getElementById("name").value === ""){// make sure the text boxes are empty
        $('#nameError').fadeIn(); // display error message
        $('#nameError').fadeOut(4000); // fade slowly
        return false;
    }
    if (document.getElementById("userSays").value !== ""){// make sure the text boxes are empty
        $('#userError').fadeIn(); // display error message
        $('#userError').fadeOut(4000); // fade slowly
        return false;
    }
    if (document.getElementById("responses").value !== ""){
        $('#respError').fadeIn(); // display error message
        $('#respError').fadeOut(4000); // fade slowly
        return false;
    }
    var listUser = document.getElementById("addedUser");
    var elementsUser = listUser.getElementsByTagName("li");
    var userSaysList = []; // list of keywords
    for (var i=0;i<elementsUser.length;i++){ // add all li values to the list
        userSaysList.push(elementsUser[i].innerText);
    }

    var listResp = document.getElementById("addedResp");
    var elementsResp = listResp.getElementsByTagName("li");
    var responsesList = []; // list of responses
    for (var i=0;i<elementsResp.length;i++){ // add all li values to the list
        responsesList.push(elementsResp[i].innerText);
    }
    var data = [[x],userSaysList,responsesList];

    if (x.length>=1 && userSaysList.length>=1 && responsesList.length>=1) { // check data is added to each
        // if so
        // set up the controller parameters
        $.ajax({
            type: "POST",
            url: '/admin/add',
            data: JSON.stringify(data),
            datatype: "json",
            contentType: "application/json",
            success: function (data) {
                // log the success
                console.log("intent added");
                // display the intent on the table
                load();
                document.getElementById("info").innerText = "Intent Added"; // set the notification info
                setTimeout(function () {
                    $('#notification').fadeIn(); // display the notification
                },2000);
                setTimeout(function () { // remove the notification from the screen
                    $('#notification').fadeOut(600);
                },3000);
            },
            error: function () {
                console.log("error occurred while adding intent")
            }
        });
    }
    // remove the data
    cancel();
}
function load(){
    console.log("loaded admin.js");
    console.log(sessionStorage.getItem("current"));
    if (sessionStorage.getItem("current") === null) { // if this is a new session
        sessionStorage["current"] = "controlPanel";
        displayControl();
    }
    else if (sessionStorage.getItem("current") === "controlPanel"){ // if the admin has selected the control panel
        displayControl(); // display the control panel
    }
    else if (sessionStorage.getItem("current") === "chatbotSimulation"){ // if the admin selected the chatbot simulator
        displaySim(); // display the simulation
    }
    $('#progress').fadeIn();
    var elem = document.getElementById("progressBar");
    var width = 1;
    var id = setInterval(frame, 25);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
    setTimeout(function(){$('#progress').fadeOut();},2000);
    // when the page loads
    // got to /admin/intents to get all the intent information from dialogflow
    $.ajax({
        type: "GET",
        url:'/admin/intents',
        success: function(data) {
            document.getElementById("display").innerHTML = "";
            sessionStorage.setItem('intents',JSON.stringify(data));
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
    // control panel
    var table = document.getElementById("display"); // get the display table
    var row = table.insertRow(0); // insert a row
    var cell1 = row.insertCell(0); // insert 5 cells
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = intent.name; //set cell data to intent name
    cell2.innerHTML = intent.userSays; //set cell data to intent's userSays
    cell3.innerHTML = intent.responses; //set cell data to intent's responses
    cell4.innerHTML = "<button id='editButton' onclick='update(\"" + intent.name + "\",\"" + intent.id + "\")' style='background-color: #212121;border-radius: 15px;padding:5px;font-size: 10px'>Edit<button> <button id='deleteButton' onclick='return deleteThis(\"" + intent.id + "\");' style='background-color: #212121;border-radius: 15px;padding:5px;font-size: 10px'>Delete<button>"; // add edit button
    // simulator's table
    var table1 = document.getElementById("listIntents"); // get the display table
    row = table1.insertRow(0); // insert a row
    cell1 = row.insertCell(0); // insert 3 cells
    cell2 = row.insertCell(1);
    cell1.innerHTML = intent.userSays; //set cell data to intent's userSays
    cell2.innerHTML = intent.responses; //set cell data to intent's responses
}
function deleteThis(id){
    $('#deletePop').fadeIn();
    document.getElementById("invisible").innerText = id;
}

function deleteIntent(id) {
    $.ajax({
        type: "POST",
        url: '/admin/delete',
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
            console.log("intent removed from the table");
            document.getElementById("info").innerText = "Intent Deleted"; // set the notifcation info
            setTimeout(function () {
                $('#notification').fadeIn(); // display the notification
            },2000);
            setTimeout(function () { // remove the notification from the screen
                $('#notification').fadeOut(600);
            },3000);

        },
        error: function () {
            console.log("error while deleting intent");
        }
    });
}

function menu() {
    if (document.getElementById("menu").style.display === "block"){
        $('#menu').fadeOut();
    }
    else {
        $('#menu').fadeIn();
    }
}
function displayControl() {
    console.log("display control panel");
    $('#controlPanel').fadeIn();
}
function displaySim(){
    console.log("display chatbot simulation");
    $('#chatbotSimulator').fadeIn();
    $('#messages').scrollTop($('#messages')[0].scrollHeight);
}

function expand1(){
    var displayed = document.getElementById("addedUser").style.display;
    if (displayed === ""||displayed==="none"){
        $('#addedUser').fadeIn(); // fade in if not visible
    }
    else if (displayed === "block"){
        $('#addedUser').fadeOut(); // fade out it visible
    }
}
function expand2(){
    var displayed = document.getElementById("addedResp").style.display;
    if (displayed === ""||displayed==="none"){ // check if the list is displayed
        $('#addedResp').fadeIn(); // fade in if not
    }
    else if (displayed === "block"){
        $('#addedResp').fadeOut(); // fade out if it is
    }
}
function cancel(){
    document.getElementById("name").value = ""; // empty all the data
    document.getElementById("userSays").value = "";
    document.getElementById("responses").value = "";

    // remove listed data
    var user = document.getElementById("addedUser");
    user = user.getElementsByTagName("ul");
    user[0].innerHTML = "";

    var resp = document.getElementById("addedResp");
    resp = resp.getElementsByTagName("ul");
    resp[0].innerHTML = "";

    // hide elements
    $('#addedUser').fadeOut();
    $('#addedResp').fadeOut();
}

function closeThis(){
    $('#deletePop').fadeOut();
}

/**
 * If the menu bar is open and a click is detected anywhere but the menu, the menu will close to avoid
 * obstructing the page.
 */
$(document).click(function(event) {
    if(!$(event.target).closest('#menu').length && !$(event.target).closest('#menuButton').length) {
        if($('#menu').css('display') === "block") {
            $('#menu').fadeOut();
        }
    }
});