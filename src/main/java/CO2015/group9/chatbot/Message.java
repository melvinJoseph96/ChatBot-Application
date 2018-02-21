package CO2015.group9.chatbot;

public class Message {
    private String message;
    private String timestamp;

    public Message() {
    }

    public Message(String message, String timestamp) {
        this.message = message;
        this.timestamp = timestamp;
    }

    public String getMessage() {
        return message;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
