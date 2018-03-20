<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <script src="js/jquery-3.3.1.min.js"></script>
        <script src="js/chatbotMessages.js"></script>
        <script src="js/chatbotFunctions.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDJXmkKHkLX6HpgUiFEasCKUxszaLXNOSw&callback=myMap"></script>
        <link rel="stylesheet" href="css/reset.css">
        <link rel="stylesheet" href="css/chatbot.css">
        <script src="js/chatbotLanguage.js"></script>
        <title>FDM Graduate Careers</title>
    </head>
    <body>
    <div id="fdm">
        <div id="bar">
            <img src="media/fdm-logo-anim.gif" width="120" height="60">
            <h1 id="header">FDM Graduate Careers</h1>
        </div>
        <!- for demo purposes only ->
        <!- shows what the chatbot will look like a page similar to FDM's ->

        <div id="content">
            <div id="boxes">
                <h1 id="jobTitle">Graduates</h1>
                <div class="box">
                    <p>Information about graduate work</p>
                </div>
            </div>
        </div>
    </div>
    <!- END ->
    <audio id="messageReceived" src="media/message.mp3"></audio>
    <div id="main">
        <div id="chatbot">
            <div id="titlebar">
                <div id="green">&#8226;</div>
                Chatbot
                <div class="dialog">
                    <a href="#" class="close-X" onclick="minimise()"></a>
                </div>
                <img id="imageSoundOn" src="media/soundOff.png" title="mute" width="20" height="20" onclick="soundChangeOff()">
                <img id="imageSoundOff" src="media/soundOn.png" title="un-mute" width="20" height="20" onclick="soundChangeOn()">
                <img id="imageLang" src="media/lang.png" title="change language" width="20" height="20" onclick="changeLang()" >

            </div>
            <div id="messages">

            </div>
            <div id="inputBar">
                <img src="media/speech.png" id="speechControl" width="20px" height="20px" onclick="speech()" title="Turn chat bot speech on">
                <input id="input" type="text" placeholder="Type a message and hit enter">
                <img id="saveLog" src="media/email.png" width="20px" height="15px" onclick="save()" title="Email the chat log">
            </div>
        </div>
        <div id="collapse">
            <div id="greenA">&#8226;</div>
            Chat With Us
            <button id="max" onclick="reopen()"><b>-</b></button>
        </div>
    </div>
    <div id="messageNote">
        <h3>Message Received</h3>
    </div>
    <div id="emailPopUp">
        <div id="boxed">
            <button id="close" onclick="closeEmail()">X</button>
            <h1 id="EmailLog">Email Your Chat Log</h1>

            <label for="email">Enter Your Email:</label>
            <br>
            <input type="text" id="email">
            <button id="submitEmail" onclick="sendEmail()">Send</button>

        </div>
    </div>
    </body>
    <script src='//vws.responsivevoice.com/v/e?key=7muhKJWW'></script>
</html>