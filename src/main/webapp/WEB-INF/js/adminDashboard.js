function displayDash(){
    console.log("display dashboard");
    var menu = document.getElementById("menuItems"); // get the menu items
    menu.style.marginTop = "5%";
    $('#dashboard').fadeIn(); //display the dashboard
    // first add data to the summary bar
    var today = document.getElementById("today"); // get the cell for today
    // value is the number of unanswered questions there have been today
    today.innerHTML = "<h4>Today</h4><p style='margin-top:-15px'>19</p><p style='font-size: 10px; margin-top: -13px'>Unanswered Questions</p>"; // 19 needs to be replaced with value from database

    var week = document.getElementById("week"); // get the cell for week
    // value is the number of unanswered questions there have been this week
    week.innerHTML = "<h4>This Week</h4><p style='margin-top:-15px'>20</p><p style='font-size: 10px; margin-top: -13px'>Unanswered Questions</p>"; // 20 needs to be replaced with value from database

    var month = document.getElementById("month"); // get the cell for month
    // value is the number of unanswered questions there have been this month
    month.innerHTML = "<h4>This Month</h4><p style='margin-top:-15px'>30</p><p style='font-size: 10px; margin-top: -13px'>Unanswered Questions</p>"; // 30 needs to be replaced with value from database

    var year = document.getElementById("year"); // get the cell for year
    // value is the number of unanswered questions there have been this year
    year.innerHTML = "<h4>This Year</h4><p style='margin-top:-15px'>50</p><p style='font-size: 10px; margin-top: -13px'>Unanswered Questions</p>"; // 50 needs to be replaced with value from database

    var unanswered = document.getElementById("needs"); // get the cell for need
    // value is the number of questions answered
    unanswered.innerHTML = "<h4>Require Answers</h4><p style='margin-top:-15px;color: red'><b>17</b></p>"; // 17 needs to be replaced with value from database

    //display graph of answered questions
    displayAnswered();

    //display answered question number on graph
    document.getElementById("over").innerHTML = "<h3 style='font-size: 16px; margin-top: 3px'>Total</h3><p style='font-size: 12px;margin-top: -15px;color: green'><b>7</b></p>"; // get value from the database

    //display the most recent answers table
    var zero = document.getElementById("zero");
    zero.innerHTML = "<p style='color: #1d1641'>admin</p>"; // most recent admin to answer a question, needs to get data from the database
    var zerodata = document.getElementById("zerodata"); // box the time goes into
    zerodata.innerHTML = "<p>12:24</p>"; // get data from the database

    var first = document.getElementById("first");
    first.innerHTML = "<p style='color: #1d1641'>hs355</p>"; // second most recent admin to answer a question, needs to get data from the database
    var firstdata = document.getElementById("firstdata"); // box the time goes into
    firstdata.innerHTML = "<p>12:04</p>"; // get data from the database

    var second = document.getElementById("second");
    second.innerHTML = "<p style='color: #1d1641'>admin</p>"; // third most recent admin to answer a question, needs to get data from the database
    var seconddata = document.getElementById("seconddata"); // box the time goes into
    seconddata.innerHTML = "<p>11.45</p>"; // get data from the database

    var third = document.getElementById("third");
    third.innerHTML = "<p style='color: #1d1641'>gd542</p>"; // fourth most recent admin to answer a question, needs to get data from the database
    var thirddata = document.getElementById("thirddata"); // box the time goes into
    thirddata.innerHTML = "<p>11:34</p>"; // get data from the database

    var fourth = document.getElementById("fourth");
    fourth.innerHTML = "<p style='color: #1d1641'>tr253</p>"; // fifth most recent admin to answer a question, needs to get data from the database
    var fourthdata = document.getElementById("fourthdata"); // box the time goes into
    fourthdata.innerHTML = "<p>10:19</p>"; // get data from the database
}
function displayAnswered(){
    var ctx = document.getElementById('answered').getContext('2d'); // data for the answered questions
    var chart = new Chart(ctx, {
        // The type of chart is line
        type: 'line',

        // The data for our data set
        data: {
            labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            datasets: [{
                label: "Answered Questions",
                backgroundColor: 'paleturquoise',
                borderColor: 'lightblue',
                data: [0, 10, 5, 11, 12, 13, 6]
            }]
        },

        // Configuration options
        options: {
            title: { // chart title
                display: true,
                text: 'The Number of Answered Questions By Admins This Week'
            },
            label :{
                display: false
            }
        }
    });
}