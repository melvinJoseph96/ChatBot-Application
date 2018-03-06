<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Website</title>
        <script src="js/jquery-3.3.1.min.js"></script>
        <script src="js/chatbot.js"></script>
        <link rel="stylesheet" href="css/reset.css">
        <link rel="stylesheet" href="css/chatbot.css">

    </head>
    <body>
    <div id="fdm">
        <div id="bar">
            <img src="media/fdm-logo-anim.gif" width="120" height="60">
            <h1 style="font-size: 30px;padding: 5px">FDM Home</h1>
        </div>
        <!- video is here for demo purposes only ->
        <!- shows what the chatbot will look like a page similar to FDM's ->
        <div id="vid">
            <iframe id="fdmVid" width="100%" height="100%"
                    src="https://www.youtube.com/embed/u70RHFJyxws?autoplay=1&mute=1&loop=1&cc_load_policy=1rel=0&amp;controls=0&amp;showinfo=0&playlist=u70RHFJyxws"
                    frameborder="0"
                    allowfullscreen>
            </iframe>
        </div>
        <div id="content">
            <h1 style="font-size: 50px">Careers</h1>
            <div id="boxes">
                <p class="box">Grad</p>
                <p class="box">Worker</p>
                <p class="box">Ex-Forces</p>
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
    <script src='//vws.responsivevoice.com/v/e?key=7muhKJWW'></script>
    </body>
</html>