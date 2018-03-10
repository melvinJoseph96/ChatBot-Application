package CO2015.group9.chatbot.domain;

import java.util.ArrayList;

public class Intent {

    private String id = "";
    private String name = "";
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

//    String getUserSaysAsJSON() {
//        StringBuilder str = new StringBuilder();
//        for (String x : userSays) {
//            str
//                    .append("{\"data\": [{\"text\": \"")
//                    .append(x)
//                    .append("\"}]},");
//        }
//        str.setLength(str.length() - 1);
//        System.out.println("JSONuser" + str.toString());
//        return str.toString();
//    }
//
//    String getResponsesAsJSON() {
//        StringBuilder str = new StringBuilder();
//        for (String x : responses) {
//            str
//                    .append("\"")
//                    .append(x)
//                    .append("\",");
//        }
//        str.setLength(str.length() - 1);
//        System.out.println("JSONres" + str.toString());
//        return str.toString();
//    }

    @Override
    public String toString(){
        return id + " " + name + " " + userSays + " " + responses;
    }

}
