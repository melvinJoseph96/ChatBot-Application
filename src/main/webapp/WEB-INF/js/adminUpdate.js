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
            tr[i].getElementsByTagName("td")[3].innerHTML = "<button id='update' onclick='submit2(\""+userS.toString().replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")+"\",\"" +resp.toString().replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")+"\",\"" + id + "\")' style='background-color: #212121;border-radius: 15px;padding:5px;font-size: 10px'>Update</button>";

            return false;
        }
    }
}

function submit2(userS,resp,id){

    var name;
    var userSays = [];
    var responses = [];

    name = document.getElementById("name" + resp).value; // name of the intent
    var selectUser = document.getElementById("user_says" + userS); // get select element of the user says
    var selectedResp = document.getElementById("responsesSelect" + resp); // get the select element of responses
    var selectUser1 = selectUser.getElementsByTagName("option"); // get the lists of the options
    var selectedResp1 = selectedResp.getElementsByTagName("option");

    for (var i=0;i<selectUser1.length;i++) { // add all the values to userSays
        userSays.push(selectUser1[i].value);
    }
    for (var i=0;i<selectedResp1.length;i++) { // add all the values to responses
        responses.push(selectedResp1[i].value);
    }

    var data = [];
    data.push([id],[name],userSays,responses);
    $.ajax({
        type: "POST",
        url: '/admin/update',
        data: JSON.stringify(data),
        datatype: "json",
        contentType: "application/json",
        success: function () {
            console.log("intent updated");
            // set
            // reload page
            load();
            document.getElementById("info").innerText = "Intent Updated"; // set the notification info
            setTimeout(function () {
                $('#notification').fadeIn(); // display the notification
            },2000);
            setTimeout(function () { // remove the notification from the screen
                $('#notification').fadeOut(600);
            },3000);
        },
        error: function () {
            console.log("error while updating intent");
        }
    });
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