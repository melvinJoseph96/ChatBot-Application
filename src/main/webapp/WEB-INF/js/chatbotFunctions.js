function minimise(){ // function for minimising the chatbot
    sessionStorage['isMinimised'] = "true"; // store that the chatbot is minimised
    $('#chatbot').fadeOut(); //Remove the chatbot
    $('#collapse').fadeIn(); //Display collapsed chatbot
}
function reopen(){ // function for expanding the chatbot
    sessionStorage['isMinimised'] = "false"; // indicate that the chatbot is open
    $('#collapse').fadeOut(); //Remove collapsed title bar from screen
    $('#chatbot').fadeIn(); //Display the chatbot
}
function soundChangeOff(){
    sessionStorage['isMuted'] = "true";
    document.getElementById("imageSoundOn").style.display = "none";
    // fade the mute icon out and volume in
    $('#imageSoundOff').fadeIn();

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
function soundChangeOn(){ // sound is on
    sessionStorage['isMuted'] = "false"; // muted = false cookie
    document.getElementById("imageSoundOff").style.display = "none";
    $('#imageSoundOn').fadeIn();
    // return sound to chatbot
    var msgRec = document.getElementById("messageReceived");
    msgRec.muted = false;
}

function save(){ // display pop up when icon clicked
    $('#emailPopUp').fadeIn();
}

function sendEmail(){ // sending chatbot log
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
function closeEmail(){ // close the email pop up
    $('#emailPopUp').fadeOut();
}

function speech(){ // function for text to speech
    var speechSetting = document.getElementById("speechControl").title;
    if (speechSetting === "Turn chat bot speech on"){
        document.getElementById("speechControl").title = "Turn chat bot speech off";
        sessionStorage['speechOn'] = "true";
    }
    else {
        document.getElementById("speechControl").title = "Turn chat bot speech on";
        sessionStorage['speechOn'] = "false";
    }
}
