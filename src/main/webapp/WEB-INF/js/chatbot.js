$(function() { // On page load
    console.log("loaded chatbot.js");
    if (sessionStorage.getItem("chat-log") === null) { // if this is a new session
        var greetingMessage = "Hello!, how can I help you?"; // greeting message
        setTimeout(function () { // time delay
            $("#main").fadeIn(); // display main div that contains chatbot after 5000ms
            addMessage("bot", greetingMessage);
        }, 5000);
    }
    else {
        document.getElementById("messages").innerHTML = sessionStorage.getItem("chat-log");
        $("#main").fadeIn();
    }

    var firstMessage = true;
    $('#input').on('keypress', function(e) { // When a key is pressed
	    if(e.keyCode === 13 || e.which === 13){ // And the key is enter
	        var inputMessage = $('#input').val(); // Get the user's message
            if (inputMessage !== null && inputMessage !== "" && !firstMessage) { // Make sure it's not empty
	        	if(inputMessage.length !== 0 && inputMessage.trim()){
	        		addMessage("user", inputMessage); // Display the sent message in the chat box
                    $('#input').val(""); // Clear the message text box ready for another message
                    processing(inputMessage)
	        	}
            } else if (inputMessage !== null && inputMessage !== "" && firstMessage) {
                addMessage("user", inputMessage);
                $('#input').val("");
                $.ajax({
                    type: "POST",
                    url: "/detect",
                    data: inputMessage,
                    contentType: "text/plain",
                    success: function (data) {
                        if (data === "en") {
                            processing(inputMessage)
                        } else {
                            var langFull = data;
                            $.getJSON('js/langcodes.json', function (json) {
                                for (var i in json) {
                                    if (data === json[i].code) {
                                        langFull = json[i].name
                                    }
                                }
                                addMessage("bot", "Would you like to talk in " + langFull);
                            });
                        }
                    }
                });
                firstMessage = false;
            }
	    }
	});
});

function addMessage(id, message){
    if (id === "bot") {
        var sound = document.getElementById("messageReceived");
        sound.play();
        var speechSetting = document.getElementById("speechControl").title;
        console.log(speechSetting);
        if (speechSetting === "Turn chat bot speech off"){
            if (!message.match("<")){
            responsiveVoice.speak(message);
            }
        }
    }
	$('#messages').append("<div class=\"message " + id + "\"><div class=\"messagetext\">" + message + "</div> " +
        "<p style='font-size: 10px; color: gray'>" + time() + "</p></div>"); // add time
    chatLog = document.getElementById("messages").innerHTML; // get the whole chat log
    sessionStorage['chat-log'] = chatLog; // save it as a session cookie
}
function minimise(){
    $('#titlebar').fadeOut(); //Remove titlebar from screen
    $('#inputBar').fadeOut(); //Remove text box from screen
    $('#messages').fadeOut(); //Remove messages from screen
    $('#collapse').fadeIn(); //Display collapsed chatbot
    $('.expand').fadeIn(); //Expand button appears
}

function reopen(){
    $('#collapse').fadeOut(); //Remove collapsed title bar from screen
    $('.expand').fadeOut(); //Remove button from screen
    $('#titlebar').fadeIn(); //Add titlebar to screen
    $('#inputBar').fadeIn(); //Add text box to screen
    $('#messages').fadeIn(); //Add messages to screen
}


function processing(inputMessage){
    $.ajax({
        type: "POST",
        url: "chatbot",
        data: JSON.stringify({
            "message": inputMessage
        }),
        datatype: "json",
        contentType: "application/json",
        success: function(data) {

            if (data.message === "Which team you want to send an email to?") { //the user can choose a team to send an email to
                addMessage("bot", data.message);
                addMessage("bot", data.message.replace(data.message,'<button type="button" class="button" onclick="location.href=\'mailto:sales_pool@fdmgroup.com\'"> Sales </button>' +
                    ' <button type="button" class="button" onclick="location.href=\'mailto:marketing@example.com\'"> Marketing</button>'+
                    ' <button type="button" class="button" onclick="location.href=\'mailto:finance@example.com\'"> Finance</button>' +
                    ' <button type="button" class="button" onclick="location.href=\'mailto:it@example.com\'"> IT </button>' +
                    ' <button type="button" class="button" onclick="location.href=\'mailto:hr@example.com\'"> HR</button>'+
                    ' <button type="button" class="button" onclick="location.href=\'mailto:recruitment_pool@fdmgroup.com\'"> Recruitment</button>'+
                    ' <button type="button" class="button" onclick="location.href=\'mailto:other@example.com\'"> Other</button>' +
                    ' <button type="button" class="button" onclick="dontKnow()"> I do not know </button>' ))

            }
            else if (data.message === "How do you want to contact us?") { //when the user has to decide how to contact FDM
                addMessage("bot", data.message);
                addMessage("bot",data.message.replace(data.message,'<button type="button" class="button" onclick= "email()" > Email </button>' +
                    ' <button type="button" class="button" onclick="other()"> Other.. </button>'))
            }
            else if (data.message === "Here is our contact details:") { //when the user wants to know FDM's contact info
                addMessage("bot", data.message);
                addMessage("bot",data.message.replace(data.message,'<p>London <br> 020 3056 8240 <br> Cottons Centre, Cottons Lane <br>' +
                    ' London, SE1 2QG <br> <br> Leeds <br> 0113 331 5048 <br> No. 1 Whitehall Riverside <br> Leeds, West Yorkshire LS1 4BN <br> <br>' +
                    ' Glasgow <br> 0141 218 3100 <br> 1 West Regent Street, 6th Floor <br> Glasgow, G2 1RW</p>'))
            }
            else if (data.message.match("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}")){ // when the message is an email
                var email = data.message;
                window.location.href = "mailto:" + email;
            }
            else if (data.message === "https://www.fdmgroup.com/careers/graduates/"){ // when the message is a link to graduate careers
                addMessage("bot","Click here to view our graduate careers page:");
                link("/gradCareers", "grad.png");
            }
            else if (data.message === "https://www.fdmgroup.com/careers/ex-forces/"){ // when the message is a link to ex-forces careers
                addMessage("bot","Click here to view our ex-forces careers page:");
                link("/exforcesCareers", "exforces.png");
            }
            else if(data.message === "Taking you to admin panel"){
                window.location.href = "/admin"

            }
            else {
                addMessage("bot", data.message); // Display the response message in the chat box
            }
            chatLog = document.getElementById("messages").innerHTML; // get the whole chatbot html
            sessionStorage['chat-log'] = chatLog; // save it as a session cookie
            $('#messages').scrollTop($('#messages')[0].scrollHeight); // Make sure the chatbox is scrolled to the bottom

        }
    });
}

function email() { //this method is when the user clicks on email button
    var inputMessage = "email";
    processing(inputMessage)
}

function other() { //this method is when the user clicks on other button
    var inputMessage = "phone";
    processing(inputMessage)
}

function dontKnow() { //this method is when the user clicks on I do not know button
    var inputMessage = "idk";
    processing(inputMessage)
}

function soundChangeOff(){
    $('#imageSoundOn').fadeOut();
    // fade the mute icon out
    setTimeout(function () {
        $('#imageSoundOff').fadeIn();
    }, 700);
    // mute sound
    var msgRec = document.getElementById("messageReceived");
    msgRec.muted = true;
}
function soundChangeOn(){
    $('#imageSoundOff').fadeOut();
    setTimeout(function () {
        $('#imageSoundOn').fadeIn();
    }, 700);
    // return sound to chatbot
    var msgRec = document.getElementById("messageReceived");
    msgRec.muted = false;
}
function time(){
    var date = new Date();
    var hrs = date.getHours().toString();
    if (hrs.length === 1){ // if in first 10 hrs
        hrs = "0" + hrs;
    }
    var mins = date.getMinutes().toString();
    if (mins.length === 1){ // if in first 10 mins
        mins = "0" + mins;
    }
    if (mins.length === 0) { // at O'Clock
        mins = "00";
    }
    toReturn = hrs + ":" + mins;
    return toReturn;
}

function save(){
    $('#emailPopUp').fadeIn();
}
function sendEmail(){
    var email = document.getElementById("email").value;
    var body = document.getElementById("messages").innerText;
    for (var i=0;i<body.length;i++){
        if (body.charAt(i) === ':'){ // if the character is :, a space is inserted after the next two numbers
            body = body.substring(0,i+3) + "     " + body.substring(i+3, body.length); // makes the email more readable
        }
    }
    var mail = window.open('mailto:'+email+'?subject=Your FDM Chat Log&body=' + body); // fill in the email address, subject and the body
    setTimeout(function() { mail.close() }, 500); // close the tab that opened
    $('#emailPopUp').fadeOut();
}
function closeEmail(){
    $('#emailPopUp').fadeOut();
}
function link(hrefLink, imgName){
    var messageDiv = document.getElementById("messages"); // get the message div to add the link to
    var link = document.createElement("a"); // create a link that leads to the page
    link.setAttribute("href", hrefLink); // link to the page provided in the parameter
    var image = document.createElement("img"); // create image for the link
    image.src = imgName; // set the image source to the one provided in the parameter
    image.setAttribute("height", "80"); // set image height so it fits in the message box
    image.setAttribute("width", "110"); // set image width
    link.appendChild(image); // make the image the link
    messageDiv.appendChild(link); // add the link to the chatbot
    return false;
}

function speech(){
    var speechSetting = document.getElementById("speechControl").title;
    if (speechSetting === "Turn chat bot speech on"){
        document.getElementById("speechControl").title = "Turn chat bot speech off";
    }
    else {
        document.getElementById("speechControl").title = "Turn chat bot speech on";
    }
}




