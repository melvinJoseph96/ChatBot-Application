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
        <div id="main">
            <div id="chatbot">
                <div id="titlebar">
                    Chatbot
                    <div class="dialog">
                        <a href="#" class="close-X" onclick="minimise()"></a>
                    </div>
                </div>
                <div id="messages">

                </div>
                <input id="input" type="text">
            </div>
            <div id="collapse">
                Chat With Us

            </div>
            <button class="button expand" onclick="reopen()">^</button>
        </div>
    </body>
</html>