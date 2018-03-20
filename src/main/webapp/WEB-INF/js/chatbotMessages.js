var isMinimised;
var isMuted;
var chatLog;
var action = "firstMessage";
var currentLang = "en";
var isDelayed = false;

$(function() { // On page load
    console.log("loaded chatbot.js");
    if (sessionStorage.getItem("chat-log") === null) { // if this is a new session
        var greetingMessage = "Hello, how can I help you?"; // set the greeting message
        isMinimised= false; // chatbot is not minimised
        isMuted= false; // chatbot has sound turned on
        sessionStorage['speechOn'] = "false"; // text to speech is off
        setTimeout(function () { //  after time delay of 5 seconds
            $("#chatbot").fadeIn(); // display main div that contains chatbot after 5000ms
            addMessage("bot", greetingMessage); // display the greeting message
        }, 5000); // 5000ms = 5seconds
    }
    else { // if this is a return to the same session (i.e. a redirect or reopen the page on the same browser session)
        // the chat log is retrieved from the session storage
        document.getElementById("messages").innerHTML = sessionStorage.getItem("chat-log");
        // check the mute setting
        if (sessionStorage.getItem("isMuted") === "true") { // check if the chatbot is muted
            soundChangeOff(); // set the sound to off
        }
        else { // if the sound is turned on
            soundChangeOn(); // set the sound to on
        }

        // check the text to speech setting
        if (sessionStorage.getItem("speechOn") === "true"){ // if it is turned on
            document.getElementById("speechControl").title = "Turn chat bot speech off"; // change the title
        }

        // check if the chatbot is minimised
        if (sessionStorage.getItem("isMinimised") === "true"){ // if it is
            $('#collapse').fadeIn(); // display the chatbot minimised bar
        }
        else { // if the chatbot is expanded
            $("#chatbot").fadeIn(); // display the chatbot
        }
        // display the maps data
        var ids = sessionStorage.getItem('maps'); // session storage string
        if (ids !== null) {
            var Ids = ids.split("#"); // list of ids, split at occurence of #
            for (var i = 0; i < Ids.length; i++) {
                var full = Ids[i]; // get the id from the list; full id
                if (full.charAt(0) === 'l') {
                    if (full.charAt(1) === 'o') {// if this is for london
                        map(51.506198, -0.084903, full);
                    }
                    else if (full.charAt(1) === 'e') { // if this is leeds
                        map(53.794950, -1.553101, full);
                    }
                }
                else if (full.charAt(0) === 'g') { // for glasgow
                    map(55.862934, -4.255477, full);
                }
            }
        }

        // scroll to bottom of chat log
        $('#messages').scrollTop($('#messages')[0].scrollHeight);
    }
    // check for keypress on the chatbot input bar
    $('#input').on('keypress', function(e) { // When a key is pressed
        if(e.keyCode === 13 || e.which === 13) { // And the key is enter
            run();
        }
	});
});
function run(){
    var inputMessage = $('#input').val(); // Get the user's message
    inputMessage = inputMessage.trim();
    var notEmpty = inputMessage !== null && inputMessage.trim().length !== 0;

    if (notEmpty && (inputMessage === "change language" || inputMessage === "language") || action === "languageChange") {
        if (action !== "languageChange") {
            addMessage("user", inputMessage);
        }
        $('#input').val("");
        addMessage("bot", "Please enter a name (in english) of a language you would like to use");
        action = "languageChangePrompt";
        chatLog = document.getElementById("messages").innerHTML; // get the whole chatbot html
        sessionStorage['chat-log'] = chatLog; // save it as a session cookie
        $('#messages').scrollTop($('#messages')[0].scrollHeight); // Make sure the chat bot is scrolled to the bottom
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
        $('#messages').scrollTop($('#messages')[0].scrollHeight); // Make sure the chat box is scrolled to the bottom
        isDelayed = true; //switching on the delay from now on
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
function addMessage(id, message){
    var delay = (isDelayed) ? 3000 : 0;
    if (id === "bot") {
        var speechSetting = document.getElementById("speechControl").title;
        console.log("NEW MESSAGE: " + message); // used to test the text to speech javascript - logs the new message
        console.log("speech setting - " + speechSetting); // used to test text to speech - logs if the function is on or off
        if (sessionStorage.getItem("speechOn") === "true" ){
            if (document.getElementById("messageReceived").muted === false) { // only play if the chat bot is not muted
                if (!message.match("<")) {
                    setTimeout(function () {
                        responsiveVoice.speak(message);
                    },delay);
                    console.log("text to speech has played"); // used to test text to speech - logs whether the speech was played
                }
            }
        }
        else {
            console.log("text to speech has not played"); // used to test text to speech - logs if no speech was played
        }
        setTimeout(function () { // 3 seconds time delay
            if (document.getElementById("collapse").style.display === "block") { // if the chatbot is minimised
                $('#messageNote').fadeIn(); // display the notification
                setTimeout(function () { // fade out after 0.6 seconds
                    $('#messageNote').fadeOut(1000); // slow fade
                },600)
            }
            var sound = document.getElementById("messageReceived");
            sound.play(); // play the sound that indicates a message has been received
            messageInsert(id,message); // insert the message onto the chatbot
        },delay); // creates a time delay before displaying the message
    }
    else {
        messageInsert(id,message); // insert the message into the chatbot
    }
}
// function for displaying messages
function messageInsert(id, message){
    $('#messages').append("<div class=\"message " + id + "\"><div class=\"messagetext\" style='max-width: 200px'>" + message + "</div> " +
        "<p style='font-size: 10px; color: gray'>" + time() + "</p></div>"); // add time
    chatLog = document.getElementById("messages").innerHTML; // get the whole chat log
    sessionStorage['chat-log'] = chatLog; // save it as a session cookie
    $('#messages').scrollTop($('#messages')[0].scrollHeight); // Make sure the chatbot is scrolled to the bottom
}

function processing(inputMessage, lang) {
    var isEnglish = lang === "en";
    if (!isEnglish) { // translate the message if it is not english
        inputMessage = translate(inputMessage, lang, "en");
    }
    $.ajax({ // connect to /chatbot to get a response
        type: "POST",
        url: "chatbot",
        data: JSON.stringify({
            "message": inputMessage
        }),
        datatype: "json",
        contentType: "application/json",
        success: function(data) { // if the connection was successful
            var answerInEng = data.message;
            var answerToTheUser = answerInEng;
            if (!isEnglish) { // translate the answer if it is not english
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
                    ' London, SE1 2QG <br></p>'));
                generateMap("london",51.506198,-0.084903);

                addMessage("bot",answerToTheUser.replace(answerToTheUser,'<p> Leeds <br> 0113 331 5048 <br> No. 1 Whitehall Riverside <br> Leeds, West Yorkshire LS1 4BN <br></p>'));
                generateMap("leeds",53.794950,-1.553101);

                addMessage("bot",answerToTheUser.replace(answerToTheUser,'<p>Glasgow <br> 0141 218 3100 <br> 1 West Regent Street, 6th Floor <br> Glasgow, G2 1RW</p>'));
                generateMap("glasgow",55.862934,-4.255477);

            }
            else if (answerInEng.match("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}")) { // when the message is an email
                window.location.href = "mailto:" + answerToTheUser;
            }
            else if (answerInEng === "https://www.fdmgroup.com/careers/graduates/") { // when the message is a link to graduate careers
                var message = "Click here to view our graduate careers page:";
                if (!isEnglish) {
                    message = translate(message, "en", lang);
                }
                addMessage("bot", message);
                link("/gradCareers", "Graduate Careers Page");
                $('#messages').scrollTop($('#messages')[0].scrollHeight); // Make sure the chatbox is scrolled to the bottom
            }
            else if (answerInEng === "https://www.fdmgroup.com/careers/ex-forces/") { // when the message is a link to ex-forces careers
                var message = "Click here to view our ex-forces careers page:";
                if (!isEnglish) {
                    message = translate(message, "en", lang);
                }
                addMessage("bot", message);
                link("/exforcesCareers", "Ex-forces Careers Page");
                $('#messages').scrollTop($('#messages')[0].scrollHeight); // Make sure the chatbox is scrolled to the bottom
            }
            else if (answerInEng === "Taking you to admin panel") { // Taking the user to the admin page from the chatbot
                window.location.href = "/admin"
            }
            else if (answerInEng === "Click the link below for our FAQ page"){
                addMessage("bot",answerInEng);
                link("/faq", "FAQ Page");
            }
            else if(answerInEng === "I didn't get that. Can you say it again?" || answerInEng === "I missed what you said. Say it again?" || answerInEng === "Sorry, could you say that again?" || answerInEng === "Sorry, can you say that again?" || answerInEng === "Can you say that again?" || answerInEng === "Sorry, I didn't get that." || answerInEng === "Sorry, what was that?" || answerInEng === "One more time?" || answerInEng === "What was that?" || answerInEng === "Say that again?" || answerInEng === "I didn't get that." || answerInEng === "I missed that."){   // Taking the user to the admin page
                var message = answerInEng;
                if (!isEnglish) {
                    message = translate(message, "en", lang);
                }
                addMessage("bot",message + " Check out our FAQ page or rephrase your question.");
                link("/faq", "FAQ Page");
                $('#messages').scrollTop($('#messages')[0].scrollHeight); // Make sure the chatbox is scrolled to the bottom
            }
            else {
                addMessage("bot", answerToTheUser); // Display the response message in the chat box
            }
            sessionStorage['chat-log'] = document.getElementById("messages").innerHTML; // get the whole chatbot html and save it as a session cookie
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
    toReturn = hrs + ":" + mins;
    return toReturn;
}

function link(hrefLink, phrase){
    var messageDiv = document.getElementById("messages"); // get the message div to add the link to
    var link = document.createElement("a"); // create a link that leads to the page
    link.setAttribute("href", hrefLink); // link to the page provided in the parameter
    // style the link
    link.style.borderRadius = "15px";
    link.style.backgroundColor = "#aaaaaa";
    link.style.padding = "3px";
    link.innerText = phrase;
    link.style.marginLeft = "5px";
    link.style.marginBottom = "3px";
    link.style.textDecoration = "none"; // remove underline
    link.style.color = "darkslateblue";
    setTimeout(function () { // make the link display after the chatbot's message
        messageDiv.appendChild(link); // add the link to the chatbot
        messageDiv.appendChild(document.createElement("br"));
        messageDiv.appendChild(document.createElement("br"));
        $('#messages').scrollTop($('#messages')[0].scrollHeight); // scroll down
        sessionStorage['chat-log'] = document.getElementById("messages").innerHTML; // get the whole chatbot html and save it as a session cookie
    },3500); // 3.5 second delay

    return false;
}
function map(latitute,longitude,id) { // display google map
    var centre = new google.maps.LatLng(latitute, longitude); // centre of the map; co-ordinates of the centres
    var mapOptions = {
        center: centre,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP // display normal google map appearance
    };
    var map = new google.maps.Map(document.getElementById(id), mapOptions);// generate the new map
    var marker = new google.maps.Marker({position:centre}); // add the red marker on the map
    marker.setMap(map); // display the marker
}

function generateMap(location,lat,long) {
    setTimeout(function () {
        var maps = document.createElement("div"); // create a new div
        var date = new Date(); // date used to create unique id
        var ID = location + + date.toDateString() + date.toTimeString() + date.toISOString();
        ID = ID.replace(/\s/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()+]/g,"");
        maps.id = ID; // set the map id for london
        maps.style.width = "150px"; // set the dimensions
        maps.style.height = "150px";
        maps.style.backgroundColor = "#cccccc"; // set the background colour
        maps.style.marginLeft = "5px"; // add some white space to the left of the map
        var messages = document.getElementById("messages");
        messages.appendChild(maps); // add the map to the chat log
        messages.appendChild(document.createElement("br"));// add a space after the map has been inserted
        map(lat,long,ID);

        sessionStorage['chat-log'] = document.getElementById("messages").innerHTML; // get the whole chatbot html and save it as a session cookie
        if (sessionStorage.getItem("maps") === null) {
            sessionStorage['maps'] = ID;
        }
        else {
            sessionStorage['maps'] = sessionStorage.getItem("maps") + "#" + ID;
        }
        $('#messages').scrollTop($('#messages')[0].scrollHeight); // Make sure the chatbox is scrolled to the bottom
        console.log(sessionStorage.getItem('maps'));
    },3000);
}