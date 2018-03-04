<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/chatbot.js"></script>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/chatbot.css">
    <title>FDM Ex-Forces Careers</title>
</head>
<body>
<div id="fdm">
    <div id="bar">
        <img src="fdm-logo-anim.gif" width="120" height="60">
        <h1 style="font-size: 30px;padding: 5px">FDM Ex-forces Careers</h1>
    </div>
    <!- for demo purposes only ->
    <!- shows what the chatbot will look like a page similar to FDM's ->

    <div id="content">
        <div id="boxes">
            <h1 style="font-size: 50px; margin-top:20px;">Ex-forces</h1>
            <div class="box">
                <p>Information about ex-forces work</p>
            </div>
        </div>
    </div>
</div>
<!- END ->
<audio id="messageReceived" src="message.mp3"></audio>
<div id="main">
    <div id="chatbot">
        <div id="titlebar">
            <div id="green">&#8226;</div>
            Chatbot
            <div class="dialog">
                <a href="#" class="close-X" onclick="minimise()"></a>
            </div>
            <img id="imageSoundOn" src="soundOff.png" title="mute" width="20" height="20" onclick="soundChangeOff()">
            <img id="imageSoundOff" src="soundOn.png" title="un-mute" width="20" height="20" onclick="soundChangeOn()">
        </div>
        <div id="messages">

        </div>
        <input id="input" type="text" placeholder="Type a message and hit enter to send...">
        <img id="saveLog" src="email.png" width="20px" height="15px" onclick="save()" title="Email the chat log">
    </div>
    <div id="collapse">
        <div id="greenA">&#8226;</div>
        Chat With Us
        <button onclick="reopen()" style='color: white; background-color: transparent;float: right;border:none;font-size: 20px'><b>-</b></button>
    </div>
</div>
<div id="emailPopUp">
    <div id="boxed">
        <button id="close" onclick="closeEmail()">X</button>
        <h1 style="font-size: 40px;">Email Your Chat Log</h1>

        <label for="email">Enter Your Email:</label>
        <br>
        <input type="text" id="email">
        <button id="submitEmail" onclick="sendEmail()">Send</button>

    </div>
</div>
</body>
</html>