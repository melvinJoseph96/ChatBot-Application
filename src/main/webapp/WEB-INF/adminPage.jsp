<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Admin</title>
    <link rel="stylesheet" href="css/admin.css">
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/admin.js"></script>
</head>
<body onload="load()">

    <div id="bar">
        <div id="menuButton">
            <button onclick="menu()"><img src="media/menu.png" width="60" height="60" id="menuIcon"></button>
        </div>
        <img src="media/fdm-logo-anim.gif" width="120" height="60" id="logo">
        <h1>Admin Control Panel</h1>
    </div>

    <div id="menu">

        <ul>
            <li style="list-style-image: url('media/house.png')"><a href="">Dashboard</a></li>
            <li style="list-style-image: url('media/control.png')"><a href="">Control Panel</a></li>
            <li style="list-style-image: url('media/question.png')"><a href="">Unanswered Questions</a></li>
            <li style="list-style-image: url('media/computer.png')"><a href="">Chatbot Simulator</a></li>
        </ul>

    </div>
    <div id="popUp">
        <h1>Are you sure you wish to delete this intent?</h1>
        <button id="accept">Yes</button>
        <button id="reject">No</button>
    </div>
    <div id="content">
        <div id="search">
            <input id="searchBar" type="text" placeholder="Search" maxlength="200" size="100" height="30" onkeyup="search()">
        </div>
        <div id="allIntents">
            <div id="newIntent">
                <form id="add">
                    <table id="intents">
                        <tr>
                            <td>
                                <input type="text" id="name" placeholder="Enter the new name" size="35">
                            </td>
                            <td>
                                <input type="text" id="userSays" placeholder="Enter the new keywords" size="35">
                            </td>
                            <td>
                                <input type="text" id="responses" placeholder="Enter the new chatbot response" size="35">
                            </td>
                            <td>

                            </td>
                            <td>
                                <button type="submit" form="add" onclick="addRow(); return false;">+</button>
                            </td>
                        </tr>
                    </table>
                </form>
                <br>
            </div>
            <div id="displayIntents">
                <table id="display" cellpadding="0" cellspacing="0">

                </table>
            </div>
            <br>
        </div>
    </div>
</body>
</html>