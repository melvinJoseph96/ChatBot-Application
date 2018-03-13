$(document).ready(function(){
    $('#userSays').keypress(function(e){ // when enter key is hit for the user bar
        if(e.keyCode==13) {
            $('#addedUser').fadeIn(); // display the list
            var user = document.getElementById("addedUser");
            user.style.backgroundColor = "white";
            var list = user.getElementsByTagName("ul")[0]; // get the list element
            var data = document.createElement("li"); //create a list item
            data.style.wordWrap = "break-word"; // wrap key word if too long
            data.style.borderBottom = "1px solid #f8f8f8"; // add line under each element
            data.onclick = function () {
                this.parentElement.removeChild(this);
            };
            data.innerText = document.getElementById("userSays").value; // get the inputted value
            list.appendChild(data);
            document.getElementById("userSays").value = "";
        }
    });
    $('#responses').keypress(function(e){ // when user key is hit for the response bar
        if(e.keyCode==13) {
            $('#addedResp').fadeIn(); // display the list
            var user = document.getElementById("addedResp");
            user.style.backgroundColor = "white";
            var list = user.getElementsByTagName("ul")[0]; // get the list element
            var data = document.createElement("li"); //create a list item
            data.style.wordWrap = "break-word"; // wrap key word if too long
            data.style.borderBottom = "1px solid #f8f8f8"; // add line under each element
            data.onclick = function () {
                this.parentElement.removeChild(this);
            };
            data.innerText = document.getElementById("responses").value; // get the inputted value
            list.appendChild(data);
            document.getElementById("responses").value = "";
        }
    });
});

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
                displayIntent(data);
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
        sessionStorage["current"] = "dashboard";
        displayDash();
    }
    else if (sessionStorage.getItem("current") === "dashboard"){ // if the admin has selected the dashboard
        displayDash(); //display the dashboard
    }
    else if (sessionStorage.getItem("current") === "controlPanel"){ // if the admin has selected the control panel
        displayControl(); // display the control panel
    }
    else if (sessionStorage.getItem("current") === "unansweredQuestions"){ // if the admin has selected the unanswered questions
        displayQuestion(); // display the unanswered quesitions
    }
    else if (sessionStorage.getItem("current") === "chatbotSimulation"){ // if the admin selected the chatbot simulator
        displaySim(); // display the simulation
    }

    // when the page loads
    // got to /admin/intents to get all the intent information from dialogflow
    $.ajax({
        type: "GET",
        url:'/admin/intents',
        success: function(data) {
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
    var table = document.getElementById("display"); // get the display table
    var row = table.insertRow(0); // insert a row
    var cell1 = row.insertCell(0); // insert 5 cells
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = intent.name; //set cell data to intent name
    cell2.innerHTML = intent.userSays; //set cell data to intent's userSays
    cell3.innerHTML = intent.responses; //set cell data to intent's responses
    cell4.innerHTML = "<button id='editButton' onclick='update(\"" + intent.name + "\",\"" + intent.id + "\")' style='background-color: #212121;border-radius: 15px;padding:5px;font-size: 10px'>Edit<button> <button id='deleteButton' onclick='return deleteIntent(\"" + intent.id + "\");' style='background-color: #212121;border-radius: 15px;padding:5px;font-size: 10px'>Delete<button>"; // add edit button

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
            console.log("intent removed from the table")
        },
        error: function () {
            console.log("error while deleting intent");
        }
    });
}

function update(name,id){
    // find the row you want to update
    var table = document.getElementById("display");
    var tr = table.getElementsByTagName("tr"); // Get all rows from table
    for (var i = 0; i < tr.length; i++) {
        var td0 = tr[i].getElementsByTagName("td")[0]; // Get the cell at index 0 (1st column), intent name
        if (td0.innerText === name) { // if the intent row is found
            var intents = sessionStorage.getItem('intents'); // get the list of intents
            intents = JSON.parse(intents);
            var userS;
            var resp;

            for (var j=0;j<intents.length;j++){
                if (intents[j].name === name){
                    userS = intents[j].userSays;
                    resp = intents[j].responses;
                }
            }

            var userList ="<input type='text' id='textUs"+userS.toString().replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")+"' placeholder='Enter new keywords' onkeypress='handle(event,\""+userS.toString().replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")+"\")' " +
                 "name='keywords' size='45'><br>" +

                "<input type='text' id='textUs1"+userS.toString().replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")+"' placeholder='Edit selected keyword' onkeypress='handle1(event,\""+userS.toString().replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")+"\")' " +
                "name='keywords1' size='45'>" +

                "<br><select id='user_says"+userS.toString().replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")+"' style='width: 333px;outline: none;' onclick='select(this,\""+userS.toString().replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")+"\")'>";
            for (var j=0;j<userS.length;j++){ // list all the keywords into a dropdown
                userList += "<option value='"+ userS[j]+"'>"+userS[j]+"</option>";
            }
            userList +=   "</select>";

            var respList ="<input type='text' id='textR"+resp.toString().replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")+"' placeholder='Enter new responses' size='45' onkeypress='handler(event,\""+resp.toString().replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")+"\")'>" +
               "<br><input type='text' id='textResp1"+resp.toString().replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")+"' placeholder='Edit selected response' onkeypress='handle2(event,\""+resp.toString().replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")+"\")' " +
                "name='responses1' size='45'>" +
                "<select style='width: 333px;outline: none;' id='responsesSelect"+resp.toString().replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")+"' onclick='select1(this,\""+resp.toString().replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")+"\")'>";
            for (var j=0;j<resp.length;j++){ //list all the responses into a dropdown
               respList += "<option onclick='this.parentElement.removeChild(this);' value='"+ resp[j]+"'>"+resp[j]+"</option>";
            }
            respList +=   "</select>";

            td0.innerHTML = "<input id='name"+resp.toString().replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")+"' type='text' size='40' value='"+name+ "'>"; // change the cells to input boxes with the values inside
            tr[i].getElementsByTagName("td")[1].innerHTML = userList;
            tr[i].getElementsByTagName("td")[2].innerHTML = respList;
            tr[i].getElementsByTagName("td")[3].innerHTML = "<button id='update' onclick='submit2(this,\"" + id + "\")' style='background-color: #212121;border-radius: 15px;padding:5px;font-size: 10px'>Update</button>";
            console.log(document.body.innerHTML);
            return false;
        }
    }
}

function submit2(data,id){
    var row = data.parentNode.parentNode;
    var one = row.getElementsByTagName("td")[0]; // fetch each cell of the row
    var two = row.getElementsByTagName("td")[1];
    var three = row.getElementsByTagName("td")[2];
    var four = row.getElementsByTagName("td")[3];
    var inputOne = one.getElementsByTagName("input")[0].value;
    var inputTwo = two.getElementsByTagName("input")[0].value;
    var inputThree = three.getElementsByTagName("input")[0].value;
    one.innerText =  inputOne;// put the input box values into the cell
    two.innerText = inputTwo;
    three.innerText = inputThree;
    four.innerHTML = "<button id='editButton' onclick='update(\"" + intent.name + "\",\"" + intent.id + "\")' style='background-color: #212121;border-radius: 15px;padding:5px;font-size: 10px'>Edit<button> <button id='deleteButton' onclick='return deleteIntent(\"" + intent.id + "\");' style='background-color: #212121;border-radius: 15px;padding:5px;font-size: 10px'>Delete<button>"; // add edit button
    var data = [id,inputOne,inputTwo,inputThree];
    $.ajax({
        type: "POST",
        url: '/admin/update',
        data: JSON.stringify(data),
        datatype: "json",
        contentType: "application/json",
        success: function () {
            console.log("intent updated");
        },
        error: function () {
            console.log("error while updating intent");
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
function displayDash(){
    console.log("display dashboard");
    var menu = document.getElementById("menuItems"); // get the menu items
    menu.style.marginTop = "5%";
    $('#dashboard').fadeIn(); //display the dashboard
    // first add data to the summary bar
    var today = document.getElementById("today"); // get the cell for today
    // value is the number of unanswered questions there have been today
    today.innerHTML = "<h4>Today</h4><p style='margin-top:-15px'>19</p><p style='font-size: 10px; margin-top: -13px'>Unanswered Questions</p>"; // 19 needs to be replaced with value from database

    var week = document.getElementById("week"); // get the cell for week
    // value is the number of unanswered questions there have been this week
    week.innerHTML = "<h4>This Week</h4><p style='margin-top:-15px'>20</p><p style='font-size: 10px; margin-top: -13px'>Unanswered Questions</p>"; // 20 needs to be replaced with value from database

    var month = document.getElementById("month"); // get the cell for month
    // value is the number of unanswered questions there have been this month
    month.innerHTML = "<h4>This Month</h4><p style='margin-top:-15px'>30</p><p style='font-size: 10px; margin-top: -13px'>Unanswered Questions</p>"; // 30 needs to be replaced with value from database

    var year = document.getElementById("year"); // get the cell for year
    // value is the number of unanswered questions there have been this year
    year.innerHTML = "<h4>This Year</h4><p style='margin-top:-15px'>50</p><p style='font-size: 10px; margin-top: -13px'>Unanswered Questions</p>"; // 50 needs to be replaced with value from database

    var unanswered = document.getElementById("needs"); // get the cell for need
    // value is the number of questions answered
    unanswered.innerHTML = "<h4>Require Answers</h4><p style='margin-top:-15px;color: red'><b>17</b></p>"; // 17 needs to be replaced with value from database

    //display graph of answered questions
    displayAnswered();

    //display answered question number on graph
    document.getElementById("over").innerHTML = "<h3 style='font-size: 16px; margin-top: 3px'>Total</h3><p style='font-size: 12px;margin-top: -15px;color: green'><b>7</b></p>"; // get value from the database

    //display the most recent answers table
    var zero = document.getElementById("zero");
    zero.innerHTML = "<p style='color: #1d1641'>admin</p>"; // most recent admin to answer a question, needs to get data from the database
    var zerodata = document.getElementById("zerodata"); // box the time goes into
    zerodata.innerHTML = "<p>12:24</p>"; // get data from the database

    var first = document.getElementById("first");
    first.innerHTML = "<p style='color: #1d1641'>hs355</p>"; // second most recent admin to answer a question, needs to get data from the database
    var firstdata = document.getElementById("firstdata"); // box the time goes into
    firstdata.innerHTML = "<p>12:04</p>"; // get data from the database

    var second = document.getElementById("second");
    second.innerHTML = "<p style='color: #1d1641'>admin</p>"; // third most recent admin to answer a question, needs to get data from the database
    var seconddata = document.getElementById("seconddata"); // box the time goes into
    seconddata.innerHTML = "<p>11.45</p>"; // get data from the database

    var third = document.getElementById("third");
    third.innerHTML = "<p style='color: #1d1641'>gd542</p>"; // fourth most recent admin to answer a question, needs to get data from the database
    var thirddata = document.getElementById("thirddata"); // box the time goes into
    thirddata.innerHTML = "<p>11:34</p>"; // get data from the database

    var fourth = document.getElementById("fourth");
    fourth.innerHTML = "<p style='color: #1d1641'>tr253</p>"; // fifth most recent admin to answer a question, needs to get data from the database
    var fourthdata = document.getElementById("fourthdata"); // box the time goes into
    fourthdata.innerHTML = "<p>10:19</p>"; // get data from the database
}
function displayControl() {
    console.log("display control panel");
    $('#controlPanel').fadeIn();
}
function displayQuestion(){
    console.log("display unanswered questions");
    $('#unansweredQuestions').fadeIn();
}
function displaySim(){
    console.log("display chatbot simulation");
    $('#chatbotSimulator').fadeIn();
}

function displayAnswered(){
    var ctx = document.getElementById('answered').getContext('2d'); // data for the answered questions
    var chart = new Chart(ctx, {
        // The type of chart is line
        type: 'line',

        // The data for our dataset
        data: {
            labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            datasets: [{
                label: "Answered Questions",
                backgroundColor: 'paleturquoise',
                borderColor: 'lightblue',
                data: [0, 10, 5, 11, 12, 13, 6]
            }]
        },

        // Configuration options
        options: {
            title: { // chart title
                display: true,
                text: 'The Number of Answered Questions By Admins This Week'
            },
            label :{
                display: false
            }
        }
    });
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

function handle(e,a){
    if(e.keyCode === 13){ // if enter hit
        var option = document.createElement("option");
        option.onclick = function () { // add the onclick delete
            this.parentElement.removeChild(this);
        };
        option.value = document.getElementById("textUs"+a).value; // get the new value
        option.innerText = document.getElementById("textUs"+a).value; // get the new value
        document.getElementById("textUs"+a).value = ""; // remove text box value
        document.getElementById("user_says"+a).appendChild(option); // add new option to dropdown
    }
}
function handle1(e,a){
    if(e.keyCode === 13){ // if enter hit
        var select= document.getElementById("user_says"+a); // get the select box
        var option = select.options[select.selectedIndex];
        option.value = document.getElementById("textUs1"+a).value; // get the new value
        option.text = document.getElementById("textUs1"+a).value; // get the new text
        document.getElementById("textUs1"+a).value = ""; // remove text box value
    }
}
function handle2(e,a){
    if(e.keyCode === 13){ // if enter hit
        var select= document.getElementById("responsesSelect"+a); // get the select box
        var option = select.options[select.selectedIndex];
        option.value = document.getElementById("textResp1"+a).value; // get the new value
        option.text = document.getElementById("textResp1"+a).value; // get the new text
        document.getElementById("textResp1"+a).value = ""; // remove text box value
    }
}
function handler(e,a){
    if(e.keyCode === 13){ // if enter hit
        var option = document.createElement("option");
        option.onclick = function () { // add the onclick delete
            this.parentElement.removeChild(this);
        };
        option.value = document.getElementById("textR"+a).value; // get the new value
        option.innerText = document.getElementById("textR"+a).value; // get the new value
        document.getElementById("textR"+a).value = ""; // remove text box value
        document.getElementById("responsesSelect"+a).appendChild(option); // add new option to dropdown
    }
}
function select(e,a){
    document.getElementById("textUs1"+a).value = e.options[e.selectedIndex].text; // put the selected value into the text box
}
function select1(e,a){
    document.getElementById("textResp1"+a).value = e.options[e.selectedIndex].text; // put the selected value into the text box
}