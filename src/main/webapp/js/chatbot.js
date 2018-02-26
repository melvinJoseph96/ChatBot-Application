$(function() { // On page load
    console.log("loaded chatbot.js");
    var greetingMessage = "Hello!";

    setTimeout(function () {
        $("#main").fadeIn(); // display main div that contains chatbot after 5000ms
        addMessage("bot", greetingMessage);
    }, 5000);

    $('#input').on('keypress', function(e) { // When a key is pressed
	    if(e.keyCode === 13 || e.which === 13){ // And the key is enter
	        var inputMessage = $('#input').val(); // Get the user's message
	        if(inputMessage !== null && inputMessage !== ""){ // Make sure it's not empty
	        	if(inputMessage.length !== 0 && inputMessage.trim()){
	        		addMessage("user", inputMessage); // Display the sent message in the chat box
                    $('#input').val(""); // Clear the message text box ready for another message
                    processing(inputMessage)
	        	}
	    	}
	    }
	});
});

function addMessage(id, message){
	$('#messages').append("<div class=\"message " + id + "\"><div class=\"messagetext\">" + message + "</div></div>")
}
function minimise(){
    $('#titlebar').fadeOut(); //Remove titlebar from screen
    $('#input').fadeOut(); //Remove text box from screen
    $('#messages').fadeOut(); //Remove messages from screen
    $('#collapse').fadeIn(); //Display collapsed chatbot
    $('.expand').fadeIn(); //Expand button appears
}

function reopen(){
    $('#collapse').fadeOut(); //Remove collapsed title bar from screen
    $('.expand').fadeOut(); //Remove button from screen
    $('#titlebar').fadeIn(); //Add titlebar to screen
    $('#input').fadeIn(); //Add text box to screen
    $('#messages').fadeIn(); //Add messages to screen
}


function processing(inputMessage){
    $.ajax({
        type: "POST",
        url: "chatbot",
        data: JSON.stringify({
            "message": inputMessage
        }),
        datatype: "json",
        contentType: "application/json",
        success: function(data) {

            var sound = document.getElementById("messageReceived");
            sound.play()

            if (data.message == "Which team you want to send an email to?"){
                addMessage("bot",data.message )
                addMessage("bot", data.message.replace(data.message,'<button type="button" onclick="location.href=\'mailto:sales@example.com\'"> Sales </button>' +
                    ' <button type="button" onclick="location.href=\'mailto:marketing@example.com\'"> Marketing</button>'+
                    ' <button type="button" onclick="location.href=\'mailto:finance@example.com\'"> Finance</button>' +
                    ' <button type="button" onclick="location.href=\'mailto:it@example.com\'"> IT </button>' +
                    ' <button type="button" onclick="location.href=\'mailto:hr@example.com\'"> HR</button>'+
                    ' <button type="button" onclick="location.href=\'mailto:recruitment@example.com\'"> Recruitment</button>'+
                    ' <button type="button" onclick="location.href=\'mailto:other@example.com\'"> Other</button>' ))

            }
            else if (data.message == "How do you want to contact us?"){
                addMessage("bot", data.message)
                addMessage("bot",data.message.replace(data.message,'<button type="button" onclick= "email()" > Email </button>' +
                    ' <button type="button" onclick="other()"> Other.. </button>'))
            }
            else if (data.message == "Here is our contact details:"){
                addMessage("bot", data.message)
                addMessage("bot",data.message.replace(data.message,'<p>London <br> 020 3056 8240 <br> Cottons Centre, Cottons Lane <br>' +
                    ' London, SE1 2QG <br> <br> Leeds <br> 0113 331 5048 <br> No. 1 Whitehall Riverside <br> Leeds, West Yorkshire LS1 4BN <br> <br>' +
                    ' Glasgow <br> 0141 218 3100 <br> 1 West Regent Street, 6th Floor <br> Glasgow, G2 1RW</p>'))
            }
            else
                addMessage("bot", data.message) // Display the response message in the chat box
            $('#messages').scrollTop($('#messages')[0].scrollHeight); // Make sure the chatbox is scrolled to the bottom
        }
    });
}

function email() {
    var inputMessage = "email"
    processing(inputMessage)
}

function other() {
    var inputMessage = "phone"
    processing(inputMessage)
}