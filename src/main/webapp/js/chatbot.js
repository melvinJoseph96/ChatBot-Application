$(function() {
    console.log("loaded chatbot.js");
    $('#input').on('keypress', function(e) { // When a key is pressed
	    if(e.keyCode === 13 || e.which === 13){ // And the key is enter
	        var inputMessage = $('#input'); // Get the user's message
	        if(inputMessage.val() !== null && inputMessage.val() !== ""){ // Make sure it's not empty
	        	if(inputMessage.val().length !== 0 && inputMessage.val().trim()){
	        		addMessage("user", inputMessage.val()); // Display the sent message in the chat box
                    //addMessage("bot", "") // Display the chatbot's reply
                    inputMessage.val("") // Clear the message text box ready for another message
	        	}
	    	}
	    }
	});
});

function addMessage(id, message){
	$('#messages').append("<div class=\"message " + id + "\"><div class=\"messagetext\">" + message + "</div></div>")
}