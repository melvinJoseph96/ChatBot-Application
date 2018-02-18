package CO2015.group9.chatbot;

import java.util.ArrayList;

public class Intent {

    private String id;
    private String name;
    private ArrayList<String> userSays;
    private ArrayList<String> responses;

    public Intent(String id, String name, ArrayList<String> userSays, ArrayList<String> responses) {
        this.id = id;
        this.name = name;
        this.userSays = userSays;
        this.responses = responses;
    }

    public Intent(String name, ArrayList<String> userSays, ArrayList<String> responses) {
        this.name = name;
        this.userSays = userSays;
        this.responses = responses;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public ArrayList<String> getUserSays() {
        return userSays;
    }

    public ArrayList<String> getResponses() {
        return responses;
    }

    @Override
    public String toString(){
        return name + " " + userSays + " " + responses;
    }

}
