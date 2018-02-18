package CO2015.group9.chatbot;

import java.util.ArrayList;

public class Intent {

    private String name;
    private ArrayList<String> userSays;
    private ArrayList<String> responses;

    public Intent(String name, ArrayList<String> userSays, ArrayList<String> responses) {
        this.name = name;
        this.userSays = userSays;
        this.responses = responses;
    }

    @Override
    public String toString(){
        return name + " " + userSays + " " + responses;
    }

}
