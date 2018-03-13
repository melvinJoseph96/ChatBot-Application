<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Admin</title>
    <link rel="stylesheet" href="css/admin.css">
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/admin.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.4.0/Chart.min.js"></script>
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

        <ul id="menuItems">
            <li style="list-style-image: url('media/house.png')"><a href="" onclick="sessionStorage['current'] = 'dashboard'">Dashboard</a></li>
            <li style="list-style-image: url('media/control.png')"><a href="" onclick="sessionStorage['current'] = 'controlPanel'">Control Panel</a></li>
            <li style="list-style-image: url('media/question.png')"><a href="" onclick="sessionStorage['current'] = 'unansweredQuestions'">Unanswered Questions</a></li>
            <li style="list-style-image: url('media/computer.png')"><a href="" onclick="sessionStorage['current'] = 'chatbotSimulation'">Chatbot Simulator</a></li>
        </ul>

    </div>
    <div id="dashboard">
        <div id="titleBarDash">
            <h1>Dashboard</h1>
            <p>overview</p>
            <div id="refreshDash">
                <button id="refreshButtonDash" onclick="load()" title="Refresh the data"><img src="media/refresh.png" width="16" height="16"></button>
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
            <div id="answeredGraph">
                <canvas id="answered"></canvas>
                <div id="over"></div>
            </div>
            <div id="adminAnswers">
                <h3 id="tableTitle">Recent Answerers</h3>
                <table id="admins">
                    <tr>
                        <td id="zero"></td>
                        <td id="zerodata"></td>
                    </tr>
                    <tr>
                        <td id="first"></td>
                        <td id="firstdata"></td>
                    </tr>
                    <tr>
                        <td id="second"></td>
                        <td id="seconddata"></td>
                    </tr>
                    <tr>
                        <td id="third"></td>
                        <td id="thirddata"></td>
                    </tr>
                    <tr>
                        <td id="fourth"></td>
                        <td id="fourthdata"></td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <div id="controlPanel">

        <div id="titleBarControl">
            <h1>Control Panel</h1>
            <p>display and edit intents</p>
        </div>

        <div id="content">

            <div id="search">
                <input id="searchBar" type="text" placeholder="Search Intents" maxlength="200" size="100" height="30" onkeyup="search()">
            </div>

            <div id="allIntents">
                <div id="newIntent">
                    <div id="add">
                        <h2>Add Intent</h2>
                        <table id="intents">
                            <tr>
                                <td>
                                    <input type="text" id="name" placeholder="Enter the new name" size="45" required>
                                </td>
                                <td>
                                    <input type="text" id="userSays" placeholder="Enter a new keyword and press enter to be accepted" size="50">
                                </td>
                                <td>
                                    <input type="text" id="responses" placeholder="Enter a new response and press enter to be accepted" size="50">
                                </td>
                                <td>
                                    <button id="addButton" onclick="addRow(); return false;" style="font-size: 10px">Add</button>
                                    <button id="cancel" onclick="cancel();return false;" style="font-size: 10px">Cancel</button>
                                </td>
                            </tr>
                        </table>
                        <div id="userMin"><button id="one" onclick="expand1()"><img src="media/expand.png" width="12" height="12"></button></div>
                        <div id="respMin"><button id="two" onclick="expand2()"><img src="media/expand.png" width="12" height="12"></button></div>

                        <div id="addedUser">
                            <ul></ul>
                        </div>
                        <div id="addedResp">
                            <ul></ul>
                        </div>

                        <div id="nameError"><p>Name field cannot be empty</p></div>
                        <div id="userError"><p>Press enter to accept this keyword</p></div>
                        <div id="respError"><p>Press enter to accept this response</p></div>

                    </div>
                    <br>
                </div>
                <div id="displayIntents">
                    <h2>Intent Table</h2>
                    <table id="display" cellspacing="0" cellpadding="0"></table>
                </div>
                <br>
            </div>
        </div>
    </div>
    <div id="unansweredQuestions">

        <div id="titleBarQuest">
            <h1>Unanswered Questions</h1>
            <p>display and answer</p>
            <div id="refreshQuest">
                <button id="refreshButtonQuest" onclick="load()" title="Refresh the data"><img src="media/refresh.png" width="16" height="16"></button>
            </div>
        </div>

        <div id="unansweredTable">
            <table></table>
        </div>

    </div>

    <div id="chatbotSimulator">

        <div id="titleBarSim">
            <h1>Chatbot Simulator</h1>
            <p>preview</p>
            <div id="refreshSim">
                <button id="refreshButtonSim" onclick="l" title="Refresh the data"><img src="media/refresh.png" width="16" height="16"></button>
            </div>
        </div>
        <div id="sim">
        </div>
    </div>
</body>
</html>