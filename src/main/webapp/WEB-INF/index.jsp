<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Website</title>
        <script src="js/jquery-3.3.1.min.js"></script>
        <script src="js/chatbotLanguage.js"></script>
        <script src="js/chatbotMessages.js"></script>
        <script src="js/chatbotFunctions.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDJXmkKHkLX6HpgUiFEasCKUxszaLXNOSw&callback=initMap"></script>
        <link rel="stylesheet" href="css/reset.css">
        <link rel="stylesheet" href="css/chatbot.css">

    </head>
    <body>
    <div id="fdm">
        <div id="bar">
            <img src="media/fdm-logo-anim.gif" width="120" height="60">
            <h1  id="header">FDM Home</h1>
        </div>
        <!- video is here for demo purposes only ->
        <!- shows what the chatbot will look like a page similar to FDM's ->
        <div id="vid">
            <iframe id="fdmVid" width="100%" height="100%"
                    src="https://www.youtube.com/embed/u70RHFJyxws?autoplay=1&mute=1&loop=1&modestbranding=1&disablekb=1&cc_load_policy=1rel=0&amp;controls=0&amp;showinfo=0&playlist=u70RHFJyxws"
                    frameborder="0"
                    allowfullscreen="allowfullscreen">
            </iframe>
        </div>
        <div id="vidCover"></div>
        <div id="content">
            <h1 id="CareersTitle">Careers</h1>
            <div id="boxes">
                <div class="box">
                <h2> I am a graduate</h2> <br> Bridging the gap between university and the professional workplace <br><br><br>
                <button class="button-main" onclick="window.location.href='/gradCareers'">Find out more!</button>
                </div>
                <div class="box">
                <h2> I am returning to work</h2> <br> Opportunities for individuals who have taken an extended break in their career
                </div>
                <div class="box">
                <h2> I am ex-forces</h2> <br> Providing a smooth transition into the corporate world <br><br><br>
                    <button class="button-main" onclick="window.location.href='/exforcesCareers'">Find out more!</button>
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
                        <a class="close-X" onclick="minimise()"></a>
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
    <script src='//vws.responsivevoice.com/v/e?key=7muhKJWW'></script>
    </body>
</html>