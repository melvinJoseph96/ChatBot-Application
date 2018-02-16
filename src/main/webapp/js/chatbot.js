$(function() { // On page load
    console.log("loaded chatbot.js");
    var greetingMessage = "Hello!";

    setTimeout(function () {
        $("#main").fadeIn(); // display main div that contains chatbot after 5000ms
        addMessage("user", greetingMessage);
    }, 5000);

    $('#input').on('keypress', function(e) { // When a key is pressed
	    if(e.keyCode === 13 || e.which === 13){ // And the key is enter
	        var inputMessage = $('#input').val(); // Get the user's message
	        if(inputMessage !== null && inputMessage !== ""){ // Make sure it's not empty
	        	if(inputMessage.length !== 0 && inputMessage.trim()){
	        		addMessage("user", inputMessage); // Display the sent message in the chat box
                    $('#input').val(""); // Clear the message text box ready for another message
                    $.ajax({ // Send the message to spring for processing
                        type: "POST",
                        url: "chatbot",
                        data: JSON.stringify({
                            "message": inputMessage
                        }),
                        datatype: "json",
                        contentType: "application/json",
                        success: function(data) {
                            addMessage("bot", data.message) // Display the response message in the chat box
                            $('#messages').scrollTop($('#messages')[0].scrollHeight); // Make sure the chatbox is scrolled to the bottom
                        }
                    });
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