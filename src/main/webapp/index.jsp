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
    <div id="adminpanel" style="position:absolute;top:3%;right:3%;"><a href="adminPage.jsp">Admin Panel</a></div>
    <audio id="messageReceived" src="message.mp3"></audio>
        <div id="main">
            <div id="chatbot">
                <div id="titlebar">
                    <div id="green">&#8226;</div>
                    Chatbot
                    <div class="dialog">
                        <a href="#" class="close-X" onclick="minimise()"></a>
                    </div>
                </div>
                <div id="messages">

                </div>
                <input id="input" type="text" placeholder="Type a message and hit enter to send...">
            </div>
            <div id="collapse">
                <div id="greenA">&#8226;</div>
                Chat With Us
                <button onclick="reopen()" style='color: white; background-color: transparent;float: right;border:none;font-size: 20px'><b>-</b></button>
            </div>
        </div>
    </body>
</html>