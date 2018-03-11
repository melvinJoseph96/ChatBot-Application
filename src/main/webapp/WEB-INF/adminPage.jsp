<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Admin</title>
    <link rel="stylesheet" href="css/admin.css">
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/admin.js"></script>
</head>
<body onload="load()" style="background-color: #eae9e6;">

    <div id="bar">
        <div id="menuButton">
            <button onclick="menu()"><img src="media/menu.png" width="60" height="60" id="menuIcon"></button>
        </div>
        <img src="media/fdm-logo-anim.gif" width="120" height="60" id="logo">
        <h1>Admin</h1>
    </div>

    <div id="menu">

        <ul>
            <li style="list-style-image: url('media/house.png')"><a href="" onclick="sessionStorage['current'] = 'dashboard'">Dashboard</a></li>
            <li style="list-style-image: url('media/control.png')"><a href="" onclick="sessionStorage['current'] = 'controlPanel'">Control Panel</a></li>
            <li style="list-style-image: url('media/question.png')"><a href="" onclick="sessionStorage['current'] = 'unansweredQuestions'">Unanswered Questions</a></li>
            <li style="list-style-image: url('media/computer.png')"><a href="" onclick="sessionStorage['current'] = 'chatbotSimulation'">Chatbot Simulator</a></li>
        </ul>

    </div>
    <div id="dashboard">
        <div id="titleBar">
            <h1>Dashboard</h1>
            <p>overview</p>
            <div id="refresh">
                <button id="refreshButton" title="Refresh the data"><img src="media/refresh.png" width="16" height="16"></button>
            </div>
        </div>

        <div id="dataBar">
            <table id="data">
                <tr>
                    <td id="today"></td>
                    <td id="week"></td>
                    <td id="month"></td>
                    <td id="year"></td>
                    <td id="needs"></td>
                </tr>
            </table>
        </div>

        <div id="data2">

        </div>
        <div id="answeredSection">

        </div>
    </div>
    <div id="controlPanel">
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
    </div>
    <div id="unansweredQuestions">
        <p>questions</p>
    </div>
    <div id="chatbotSimulator">
        <p>Sim</p>
    </div>
</body>
</html>