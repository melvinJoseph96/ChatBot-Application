package CO2015.group9.chatbot;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class AdminLogic {


    private final String apiKey = "Bearer f6b365252ccc42ceaf7b5012e2945b68";


    public JSONObject getIntentDetails(String id) {
        JSONObject toReturn = new JSONObject();

        try {
            HttpResponse<JsonNode> httpResponse = Unirest.get("https://api.dialogflow.com/v1/intents/" + id)
                    .header("Authorization", apiKey)
                    .header("Content-Type", "application/json").asJson();
            toReturn = httpResponse.getBody().getObject();
        } catch (UnirestException e) {
            e.printStackTrace();
        }

        return toReturn;
    }


    public ArrayList<Intent> getIntents() {
        ArrayList<Intent> intents = new ArrayList<>();
        JSONArray JSONIntents = new JSONArray();

        try {
            HttpResponse<JsonNode> httpResponse = Unirest.get("https://api.dialogflow.com/v1/intents")
                    .header("Authorization", apiKey)
                    .header("Content-Type", "application/json").asJson();
            JSONIntents = httpResponse.getBody().getArray();
        } catch (UnirestException e) {
            e.printStackTrace();
        }


        for (int i = 0; i < JSONIntents.length(); i++) {
            String name = JSONIntents.getJSONObject(i).getString("name");
            ArrayList<String> userSays = new ArrayList<>();
            ArrayList<String> responses = new ArrayList<>();
            String intentId = JSONIntents.getJSONObject(i).getString("id");

            JSONObject intentDetails = getIntentDetails(intentId);
            JSONArray JSONUserSays = intentDetails.getJSONArray("userSays");
            JSONArray JSONResponses = intentDetails.getJSONArray("responses");

            int userSaysArrLength = 0;
            try {
                userSaysArrLength = JSONUserSays.length();
            } catch (JSONException e) {
                e.printStackTrace();
            }

            for (int j = 0; j < userSaysArrLength; j++) {

                try {

                    userSays.add(JSONUserSays
                            .getJSONObject(j)
                            .getJSONArray("data")
                            .getJSONObject(0)
                            .getString("text"));
                } catch (JSONException e) {
                    e.printStackTrace();
                    System.out.println("Intent has no prompts");
                }
            }


            JSONObject responsesObject = JSONResponses
                    .getJSONObject(0)
                    .getJSONArray("messages")
                    .getJSONObject(0);

            int responsesArrLength = 0;
            if (responsesObject.get("speech") instanceof JSONArray) {
                System.out.println("array");
                responsesArrLength = responsesObject
                        .getJSONArray("speech")
                        .length();
            } else {
                responses.add(responsesObject.getString("speech"));
            }

            for (int k = 0; k < responsesArrLength; k++) {
                responses.add(responsesObject
                        .getJSONArray("speech")
                        .getString(k));
            }
            intents.add(new Intent(intentId, name, userSays, responses));
        }

        System.out.println("qwerty" + intents);

        return intents;
    }

    public void addIntent(String name,ArrayList<String> userSays, ArrayList<String> responses) {
        try {
            String body = "{\"contexts\": [], \"events\": [], \"fallbackIntent\": false, \"name\": \"" +
                    name + "\",\"priority\": 500000,\"responses\": [{\"action\": \"\",\"affectedContexts\": []," +
                    "\"defaultResponsePlatforms\": {},\"messages\": [{\"speech\":[";
            // add response messages
            for(int i=0;i<responses.size();i++){
                if (i == responses.size()-1){
                    body = body + "\"" + responses.get(i) +"\"";
                }
                body = body + "\"" + responses.get(i) +"\",";
            }
            body = body + "],}],\"parameters\": []," +
                "\"resetContexts\": false}],\"templates\": [],\"userSays\": [";
            // get all userSays strings
            for(int i=0;i<userSays.size();i++){
                if (i == userSays.size()-1){
                    body = body + "{\"count\": 0," +
                            "\"data\": [ {\"text\":\""+ userSays.get(i)+"\"}],}";
                }
                body = body + "{\"count\": 0," +
                        "\"data\": [ {\"text\":\""+ userSays.get(i)+"\"}],},";
            }
            body = body + "],\"webhookForSlotFilling\": false,\"webhookUsed\": false}";
            HttpResponse<JsonNode> httpResponse = Unirest.post("https://api.dialogflow.com/v1/intents/")
                    .header("Authorization", apiKey)
                    .header("Content-Type", "application/json")
                    .body(body)
                    .asJson();
        } catch (UnirestException e) {
            e.printStackTrace();
        }
    }

    public void deleteIntent(String id) {
        try {
            HttpResponse<JsonNode> httpResponse = Unirest.delete("https://api.dialogflow.com/v1/intents/" + id)
                    .header("Authorization", apiKey)
                    .header("Content-Type", "application/json").asJson();
        } catch (UnirestException e) {
            e.printStackTrace();
        }

    }

    public void deleteIntent(Intent intent) {
        String id = intent.getId();

        try {
            HttpResponse<JsonNode> httpResponse = Unirest.delete("https://api.dialogflow.com/v1/intents/" + id)
                    .header("Authorization", apiKey)
                    .header("Content-Type", "application/json").asJson();
        } catch (UnirestException e) {
            e.printStackTrace();
        }
    }

    public void addResponse(String id, String newResponse) {
        ArrayList<Intent> intents = getIntents();
        Intent intent = intents.stream().filter(x -> x.getId().equals(id)).findAny().orElse(null);
        if (intent != null) {
            String intentName = intent.getName();
            String userSaysAsJSON = intent.getUserSaysAsJSON();
            String newResponseFormatted = ",\"" + newResponse + "\"";
            String responsesAsJSON = intent.getResponsesAsJSON();

            try {
                HttpResponse<JsonNode> httpResponse = Unirest.put("https://api.dialogflow.com/v1/intents/" + id)
                        .header("Authorization", apiKey)
                        .header("Content-Type", "application/json")
                        .body("{    \"name\": \"" + intentName + "\",\"responses\": [{\"messages\": [{\"type\": 0,\"speech\": [" +
                                responsesAsJSON + newResponseFormatted + "]}]}],\"userSays\": [" + userSaysAsJSON + "]}")
                        .asJson();
            } catch (UnirestException e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("AddResponse error: Intent is null");
        }
    }

    public void addUserSays(String id, String newUserSays) {
        ArrayList<Intent> intents = getIntents();
        Intent intent = intents.stream().filter(x -> x.getId().equals(id)).findAny().orElse(null);
        if (intent != null) {
            String intentName = intent.getName();
            String userSaysAsJSON = intent.getUserSaysAsJSON();
            String responsesAsJSON = intent.getResponsesAsJSON();
            String newUserSaysFormatted = ",{\"data\": [{\"text\": \"" + newUserSays + "\"}]}";

            try {
                HttpResponse<JsonNode> httpResponse = Unirest.put("https://api.dialogflow.com/v1/intents/" + id)
                        .header("Authorization", apiKey)
                        .header("Content-Type", "application/json")
                        .body("{    \"name\": \"" + intentName + "\",\"responses\": [{\"messages\": [{\"type\": 0,\"speech\": [" +
                                responsesAsJSON + "]}]}],\"userSays\": [" + userSaysAsJSON + newUserSaysFormatted + "]}")
                        .asJson();
            } catch (UnirestException e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("AddUserSays error: Intent is null");
        }
    }

    public ArrayList<String> toArrayList(String input){
        ArrayList<String> array = new ArrayList<>(); // Create new array
        StringBuilder sb = new StringBuilder();
        for (int i=0;i<input.length();i++){ // Go through each character in the input
            if (input.charAt(i) == ','){ // if the character is a comma
                array.add(sb.toString()); // the word is finished so add it to the array
                sb = new StringBuilder();
            }
            else {
                sb.append(input.charAt(i)); // if the char is not a comma, add the char to the string builder
            }
        }
        return array; // Return array of split strings
    }

    public static void main(String[] args) {
        AdminLogic test = new AdminLogic();
        test.getIntents();
        // test.addIntent("hbvdsafjhgfdfsghbd",new ArrayList<>(),new ArrayList<>());
        //    System.out.println(test.getIntentDetails("fa39fa7a-2737-41f9-9b72-7e26aa37ea3d"));
        // test.deleteIntent("c822f665-946c-47a1-b898-51d7351db821");
        // test.addResponse("8a043471-028d-4645-af0a-55a698385337", "nusr 7");
        // test.addUserSays("8a043471-028d-4645-af0a-55a698385337", "nubedsdr 5");
    }

}
