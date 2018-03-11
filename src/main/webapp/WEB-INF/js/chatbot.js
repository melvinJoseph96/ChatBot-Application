var isMinimised;

$(function() { // On page load
    console.log("loaded chatbot.js");
    if (sessionStorage.getItem("chat-log") === null) { // if this is a new session
        var greetingMessage = "Hello!, how can I help you?"; // greeting message
        isMinimised= false;
        setTimeout(function () { // time delay
            $("#chatbot").fadeIn(); // display main div that contains chatbot after 5000ms
            addMessage("bot", greetingMessage);
        }, 5000);
    }
    else {
        document.getElementById("messages").innerHTML = sessionStorage.getItem("chat-log");
        if (sessionStorage.getItem("isMinimised") === "true"){
            $('#collapse').fadeIn();
            $('.expand').fadeIn();
        }
        else
            $("#chatbot").fadeIn();
    }

    var action = "firstMessage";
    var currentLang = "en";
    $('#input').on('keypress', function(e) { // When a key is pressed
	    if(e.keyCode === 13 || e.which === 13){ // And the key is enter
	        var inputMessage = $('#input').val(); // Get the user's message
            inputMessage = inputMessage.trim();
            var notEmpty = inputMessage !== null && inputMessage.trim().length !== 0;

            if (notEmpty && inputMessage === "change language" || inputMessage === "language") {
                addMessage("user", inputMessage);
                $('#input').val("");
                addMessage("bot", "Please enter a name (in english) of a language you would like to use");
                action = "languageChangePrompt";
                chatLog = document.getElementById("messages").innerHTML; // get the whole chatbot html
                sessionStorage['chat-log'] = chatLog; // save it as a session cookie
                $('#messages').scrollTop($('#messages')[0].scrollHeight); // Make sure the chatbox is scrolled to the bottom
            } else if (notEmpty && action === "default") { // Make sure it's not empty
                addMessage("user", inputMessage); // Display the sent message in the chat box
                $('#input').val(""); // Clear the message text box ready for another message
                processing(inputMessage, currentLang)
            } else if (notEmpty && action === "firstMessage") {
                addMessage("user", inputMessage);
                $('#input').val("");
                $.ajax({
                    type: "POST",
                    url: "/detect",
                    data: inputMessage,
                    contentType: "text/plain",
                    success: function (response) {
                        if (response === "en") {
                            processing(inputMessage);
                            action = "default"
                        } else {
                            addMessage("bot", "Would you like to talk in " + getFullLang(response) + "?");
                            action = "languageChangeConfirm";
                        }
                        currentLang = response;
                    }
                });
                chatLog = document.getElementById("messages").innerHTML; // get the whole chatbot html
                sessionStorage['chat-log'] = chatLog; // save it as a session cookie
                $('#messages').scrollTop($('#messages')[0].scrollHeight); // Make sure the chatbox is scrolled to the bottom
            } else if (notEmpty && action === "languageChangeConfirm") {
                addMessage("user", inputMessage); // Display the sent message in the chat box
                $('#input').val(""); // Clear the message text box ready for another message
                inputMessage = inputMessage.trim().toLowerCase();
                var inputTranslated = translate(inputMessage, currentLang, "en");
                if (inputMessage === "yes" || inputMessage === "ok" || inputTranslated.trim().toLowerCase() === "yes") {
                    var botAnswer = "You can speak " + getFullLang(currentLang) + " now";
                    var botAnswerTranslated = translate(botAnswer, "en", currentLang);
                    addMessage("bot", botAnswerTranslated);
                } else if (inputMessage === "no" || inputMessage === "nope" || inputTranslated.trim().toLowerCase() === "no") {
                    currentLang = "en";
                    addMessage("bot", "Let's continue in English then. You can always change the language by typing \"change language\"");
                }
                action = "default";
                chatLog = document.getElementById("messages").innerHTML; // get the whole chatbot html
                sessionStorage['chat-log'] = chatLog; // save it as a session cookie
                $('#messages').scrollTop($('#messages')[0].scrollHeight); // Make sure the chatbox is scrolled to the bottom
            } else if (notEmpty && action === "languageChangePrompt") {
                addMessage("user", inputMessage);
                $('#input').val("");
                var langCode = getLangCode(inputMessage.trim().toLowerCase());
                if (langCode === "notfound") {
                    addMessage("bot", "Sorry, we couldn't find a language like that");
                } else {
                    var botAnswer = "Let's talk in " + inputMessage;
                    var botAnswerTranslated = translate(botAnswer, "en", langCode);
                    addMessage("bot", botAnswerTranslated);
                    currentLang = langCode;
                }
                action = "default";
                chatLog = document.getElementById("messages").innerHTML; // get the whole chatbot html
                sessionStorage['chat-log'] = chatLog; // save it as a session cookie
                $('#messages').scrollTop($('#messages')[0].scrollHeight); // Make sure the chatbox is scrolled to the bottom
            }
	    }
	});
});

function addMessage(id, message){
    if (id === "bot") {
        var sound = document.getElementById("messageReceived");
        sound.play();
        var speechSetting = document.getElementById("speechControl").title;
        console.log("NEW MESSAGE: " + message); // used to test the text to speech javascript - logs the new message
        console.log("speech setting - " + speechSetting); // used to test text to speech - logs if the function is on or off
        if (speechSetting === "Turn chat bot speech off"){
            if (document.getElementById("messageReceived").muted === false) { // only play if the chat bot is not muted
                if (!message.match("<")) {
                    responsiveVoice.speak(message);
                    console.log("text to speech has played"); // used to test text to speech - logs whether the speech was played
                }
            }
        }
        else {
            console.log("text to speech has not played"); // used to test text to speech - logs if no speech was played
        }
    }
	$('#messages').append("<div class=\"message " + id + "\"><div class=\"messagetext\">" + message + "</div> " +
        "<p style='font-size: 10px; color: gray'>" + time() + "</p></div>"); // add time
    chatLog = document.getElementById("messages").innerHTML; // get the whole chat log
    sessionStorage['chat-log'] = chatLog; // save it as a session cookie
}
function minimise(){
    sessionStorage['isMinimised'] = "true";
    $('#chatbot').fadeOut(); //Remove the chatbot
    $('#collapse').fadeIn(); //Display collapsed chatbot
    $('.expand').fadeIn(); //Expand button appears
}

function reopen(){
    sessionStorage['isMinimised'] = "false";
    $('#collapse').fadeOut(); //Remove collapsed title bar from screen
    $('.expand').fadeOut(); //Remove button from screen
    $('#chatbot').fadeIn(); //Display the chatbot
}


function processing(inputMessage, lang) {
    var isEnglish = lang === "en";
    if (!isEnglish) {
        inputMessage = translate(inputMessage, lang, "en");
    }

    $.ajax({
        type: "POST",
        url: "chatbot",
        data: JSON.stringify({
            "message": inputMessage
        }),
        datatype: "json",
        contentType: "application/json",
        success: function(data) {

            var answerInEng = data.message;
            var answerToTheUser = answerInEng;
            if (!isEnglish) {
                answerToTheUser = translate(answerInEng, "en", lang);
            }

            if (answerInEng === "Which team you want to send an email to?") { //the user can choose a team to send an email to
                addMessage("bot", answerToTheUser);
                addMessage("bot", answerToTheUser.replace(answerToTheUser, '<button type="button" class="button" onclick="location.href=\'mailto:sales_pool@fdmgroup.com\'"> Sales </button>' +
                    ' <button type="button" class="button" onclick="location.href=\'mailto:marketing@example.com\'"> Marketing</button>'+
                    ' <button type="button" class="button" onclick="location.href=\'mailto:finance@example.com\'"> Finance</button>' +
                    ' <button type="button" class="button" onclick="location.href=\'mailto:it@example.com\'"> IT </button>' +
                    ' <button type="button" class="button" onclick="location.href=\'mailto:hr@example.com\'"> HR</button>'+
                    ' <button type="button" class="button" onclick="location.href=\'mailto:recruitment_pool@fdmgroup.com\'"> Recruitment</button>'+
                    ' <button type="button" class="button" onclick="location.href=\'mailto:other@example.com\'"> Other</button>' +
                    " <button type='button' class='button' onclick='dontKnow(\"" + lang + "\")'> I do not know </button>"))

            }
            else if (answerInEng === "How do you want to contact us?") { //when the user has to decide how to contact FDM
                addMessage("bot", answerToTheUser);
                addMessage("bot", answerToTheUser.replace(answerToTheUser,
                    "<button type='button' class='button' onclick= 'email(\"" + lang + "\")' > Email </button>" +
                    "<button type='button' class='button' onclick='other(\"" + lang + "\")'> Other.. </button>"))
            }
            else if (answerInEng === "Here is our contact details:") { //when the user wants to know FDM's contact info
                addMessage("bot", answerToTheUser);
                addMessage("bot", answerToTheUser.replace(answerToTheUser, '<p>London <br> 020 3056 8240 <br> Cottons Centre, Cottons Lane <br>' +
                    ' London, SE1 2QG <br> <br> Leeds <br> 0113 331 5048 <br> No. 1 Whitehall Riverside <br> Leeds, West Yorkshire LS1 4BN <br> <br>' +
                    ' Glasgow <br> 0141 218 3100 <br> 1 West Regent Street, 6th Floor <br> Glasgow, G2 1RW</p>'))
            }
            else if (answerInEng.match("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}")) { // when the message is an email
                var email = answerToTheUser;
                window.location.href = "mailto:" + email;
            }
            else if (answerInEng === "https://www.fdmgroup.com/careers/graduates/") { // when the message is a link to graduate careers
                var message = "Click here to view our graduate careers page:";
                if (!isEnglish) {
                    message = translate(message, "en", lang);
                }
                addMessage("bot", message);
                link("/gradCareers", "media/grad.png");
                $('#messages').scrollTop($('#messages')[0].scrollHeight); // Make sure the chatbox is scrolled to the bottom
            }
            else if (answerInEng === "https://www.fdmgroup.com/careers/ex-forces/") { // when the message is a link to ex-forces careers
                var message = "Click here to view our ex-forces careers page:";
                if (!isEnglish) {
                    message = translate(message, "en", lang);
                }
                addMessage("bot", message);
                link("/exforcesCareers", "media/exforces.png");
                $('#messages').scrollTop($('#messages')[0].scrollHeight); // Make sure the chatbox is scrolled to the bottom
            }
            else if (answerInEng === "Taking you to admin panel") {
                window.location.href = "/admin"

            }
            else {
                addMessage("bot", answerToTheUser); // Display the response message in the chat box
            }
            var chatLog = document.getElementById("messages").innerHTML; // get the whole chatbot html
            sessionStorage['chat-log'] = chatLog; // save it as a session cookie
            $('#messages').scrollTop($('#messages')[0].scrollHeight); // Make sure the chatbox is scrolled to the bottom

        }
    });
}


function email(lang) { //this method is when the user clicks on email button
    var inputMessage = "email";
    processing(inputMessage, lang)
}

function other(lang) { //this method is when the user clicks on other button
    var inputMessage = "phone";
    processing(inputMessage, lang)
}

function dontKnow(lang) { //this method is when the user clicks on I do not know button
    var inputMessage = "idk";
    processing(inputMessage, lang)
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
    // mute text to speech
    if (responsiveVoice.isPlaying()){ // if the voice over is playing
        console.log("text to speech is playing");
        responsiveVoice.cancel(); // cancel the speech
        console.log("text to speech has stopped playing");
        if (responsiveVoice.isPlaying()){ // test to see if successful
            console.log("FAIL"); // if the speech is still playing, log a failed test
        }
        else{
            console.log("PASS"); // otherwise, log the success
        }
    }
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

function getFullLang(lang) {

    $.ajaxSetup({
        async: false
    });

    var toReturn = lang;
    $.getJSON('js/langcodes.json', function (json) {
        for (var i in json) {
            if (lang === json[i].code) {
                toReturn = json[i].name;
            }
        }
    });

    $.ajaxSetup({
        async: true
    });

    return toReturn;
}

function getLangCode(lang) {

    $.ajaxSetup({
        async: false
    });

    var toReturn = "notfound";
    $.getJSON('js/langcodes.json', function (json) {
        for (var i in json) {
            if (lang === json[i].name.trim().toLowerCase()) {
                toReturn = json[i].code;
            }
        }
    });

    $.ajaxSetup({
        async: true
    });

    return toReturn;
}

function translate(query, source, target) {
    var toReturn = query;
    $.ajaxSetup({
        async: false
    });
    var data = [query,source,target];
    $.ajax({
        type: "POST",
        url: "/translate",
        data: JSON.stringify({
            "query": query,
            "source": source,
            "target": target
        }),
        contentType: "application/json",
        success: function (response) {
            console.log("ajax code was successful: /translate connection therefore successful");
            toReturn = response;
            console.log("outcome - value of 'toReturn': " + toReturn);
        },
        error: function(){
            console.log("ERROR: failed to connect to /translate");
        }
    });

    $.ajaxSetup({
        async: true
    });
    return toReturn;
}


