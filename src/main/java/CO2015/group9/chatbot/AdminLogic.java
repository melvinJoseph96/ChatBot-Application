package CO2015.group9.chatbot;

import CO2015.group9.chatbot.domain.Intent;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class AdminLogic {


    private final String dialogFlowApiKey = "Bearer f6b365252ccc42ceaf7b5012e2945b68";
    private final String translationApiKey = "AIzaSyC14FnMKS7uEzFh1nwO7YbiydCd8H8_A00";



    public JSONObject getIntentDetails(String id) {
        JSONObject toReturn = new JSONObject();

        try {
            HttpResponse<JsonNode> httpResponse = Unirest.get("https://api.dialogflow.com/v1/intents/" + id)
                    .header("Authorization", dialogFlowApiKey)
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
                    .header("Authorization", dialogFlowApiKey)
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
        System.out.println("Intent list: " + intents);
        return intents;
    }

    public Intent addIntent(String name,ArrayList<String> userSays, ArrayList<String> responses) {
        try {
            // original body code, creates intent with just name
            String bodyOriginal = "{\"contexts\": [], \"events\": [], \"fallbackIntent\": false, \"name\": \"" +
                    name + "\",\"priority\": 500000,\"responses\": [{\"action\": \"\",\"affectedContexts\": []," +
                    "\"defaultResponsePlatforms\": {},\"messages\": [{}],\"parameters\": []," +
                    "\"resetContexts\": false}],\"templates\": [],\"userSays\": [{\"count\": 0," +
                    "\"data\": [ {}]}],\"webhookForSlotFilling\": false,\"webhookUsed\": false}";
            // body for the HTTP response
            JSONObject body = new JSONObject();
            // add the name to the body
            body.put("name",name);
            // create JsonArray for user says data
            JSONArray userSaysArray = new JSONArray();

            // add each user says to the userSaysArray
            for (String userSay : userSays) {
                // create the object that the data goes into
                JSONObject dataObject = new JSONObject();
                // this is where the text goes for the user says object
                JSONArray dataArray = new JSONArray();
                // where we specify the "text" value
                JSONObject dataText = new JSONObject();

                // add the user says to text
                dataText.put("text", userSay);
                //add this text to the array
                dataArray.put(dataText);
                // add to the data object
                dataObject.put("data", dataArray);
                // finally add it to the array of userSays
                userSaysArray.put(dataObject);
            }
            // add the user says data to the body
            body.put("userSays",userSaysArray);

            // array of responses
            JSONArray responsesArray = new JSONArray();
            // iterate through each response and add to JsonArray of strings
            JSONArray responesText = new JSONArray();
            for (String response : responses) {
                responesText.put(response);
            }
            // add this list to messages object
            JSONObject messagesOb = new JSONObject();
            messagesOb.put("speech",responesText);
            messagesOb.put("type",0);
            // add to the messageArray
            JSONArray messageArray = new JSONArray();
            messageArray.put(messagesOb);
            // add to responses object
            JSONObject respOb = new JSONObject();
            respOb.put("messages",messageArray);
            //add to the array
            responsesArray.put(respOb);
            // finally add to the body
            body.put("responses",responsesArray);

            // carry out the http response to dialogflow
            HttpResponse<JsonNode> httpResponse = Unirest.post("https://api.dialogflow.com/v1/intents/")
                    .header("Authorization", dialogFlowApiKey)
                    .header("Content-Type", "application/json")
                    .body(body)
                    .asJson();
        } catch (UnirestException e) {
            e.printStackTrace();
        }
        return new Intent(name,userSays,responses);
    }

    public void deleteIntent(String id) {
        try {
            HttpResponse<JsonNode> httpResponse = Unirest.delete("https://api.dialogflow.com/v1/intents/" + id)
                    .header("Authorization", dialogFlowApiKey)
                    .header("Content-Type", "application/json").asJson();
        } catch (UnirestException e) {
            e.printStackTrace();
        }

    }

    public void deleteIntent(Intent intent) {
        String id = intent.getId();

        try {
            HttpResponse<JsonNode> httpResponse = Unirest.delete("https://api.dialogflow.com/v1/intents/" + id)
                    .header("Authorization", dialogFlowApiKey)
                    .header("Content-Type", "application/json").asJson();
        } catch (UnirestException e) {
            e.printStackTrace();
        }
    }

    public void updateIntent(String id, String name, ArrayList<String> userSays, ArrayList<String> responses) {
        String userSaysFormatted = userSaysFormatting(userSays);
        String responsesFormatted = responsesFormatting(responses);

            try {
                HttpResponse<JsonNode> httpResponse = Unirest.put("https://api.dialogflow.com/v1/intents/" + id)
                        .header("Authorization", dialogFlowApiKey)
                        .header("Content-Type", "application/json")
                        .body("{    \"name\": \"" + name + "\",\"responses\": [{\"messages\": [{\"type\": 0,\"speech\": [" +
                                responsesFormatted + "]}]}],\"userSays\": [" + userSaysFormatted + "]}")
                        .asJson();
            } catch (UnirestException e) {
                e.printStackTrace();
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
            else if (i == input.length()-1){ // if this is the final character
                sb.append(input.charAt(i));
                array.add(sb.toString());
            }
            else {
                sb.append(input.charAt(i)); // if the char is not a comma, add the char to the string builder
            }
        }
        return array; // Return array of split strings
    }

    //translating function with defined source language
    public String translate(String query, String source, String target) { //source and target of the format of ISO-639-1 Code
        String toReturn = query;
        String bodySpam = "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"";
        try {
            HttpResponse<JsonNode> httpResponse = Unirest.post("https://translation.googleapis.com/language/translate/v2")
                    .header("Content-Type", "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW")
                    .body(bodySpam + "key\"\r\n\r\n" + translationApiKey +
                            "\r\n" + bodySpam + "q\"\r\n\r\n" + query +
                            "\r\n" + bodySpam + "source\"\r\n\r\n" + source +
                            "\r\n" + bodySpam + "target\"\r\n\r\n" + target +
                            "\r\n" + bodySpam + "format\"\r\n\r\ntext\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--")
                    .asJson();
            toReturn = httpResponse
                    .getBody()
                    .getObject()
                    .getJSONObject("data")
                    .getJSONArray("translations")
                    .getJSONObject(0)
                    .getString("translatedText");
        } catch (UnirestException e) {
            e.printStackTrace();
        }
        return toReturn;
    }


    //translating function which detects source language and then translates
    public String translate(String query, String target) {
        String toReturn = query;
        String bodySpam = "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"";
        try {
            HttpResponse<JsonNode> httpResponse = Unirest.post("https://translation.googleapis.com/language/translate/v2")
                    .header("Content-Type", "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW")
                    .body(bodySpam + "key\"\r\n\r\n" + translationApiKey +
                            "\r\n" + bodySpam + "q\"\r\n\r\n" + query +
                            "\r\n" + bodySpam + "target\"\r\n\r\n" + target +
                            "\r\n" + bodySpam + "format\"\r\n\r\ntext\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--")
                    .asJson();
            toReturn = httpResponse
                    .getBody()
                    .getObject()
                    .getJSONObject("data")
                    .getJSONArray("translations")
                    .getJSONObject(0)
                    .getString("translatedText");
        } catch (UnirestException e) {
            e.printStackTrace();
        }
        return toReturn;
    }

    //I will finish this later
    public String detectUserLang(String query) {
        String toReturn = null;
        String bodySpam = "------WebKitFormBoundary7MA4YWxkTrZu0gW\r\nContent-Disposition: form-data; name=\"";
        try {
            HttpResponse<JsonNode> httpResponse = Unirest.post("https://translation.googleapis.com/language/translate/v2/detect")
                    .header("Content-Type", "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW")
                    .body(bodySpam +
                            "key\"\r\n\r\nAIzaSyC14FnMKS7uEzFh1nwO7YbiydCd8H8_A00\r\n"
                            + bodySpam +
                            "q\"\r\n\r\n"
                            + query +
                            "\r\n------WebKitFormBoundary7MA4YWxkTrZu0gW--")
                    .asJson();
            toReturn = httpResponse
                    .getBody()
                    .getObject()
                    .getJSONObject("data")
                    .getJSONArray("detections")
                    .getJSONArray(0)
                    .getJSONObject(0)
                    .getString("language");
        } catch (UnirestException e) {
            e.printStackTrace();
        }
        return toReturn;
    }

    String userSaysFormatting(ArrayList<String> userSays) {
        StringBuilder str = new StringBuilder();
        for (String x : userSays) {
            str
                    .append("{\"data\": [{\"text\": \"")
                    .append(x)
                    .append("\"}]},");
        }
        str.setLength(str.length() - 1);
        System.out.println("JSONuser" + str.toString());
        return str.toString();
    }

    String responsesFormatting(ArrayList<String> responses) {
        StringBuilder str = new StringBuilder();
        for (String x : responses) {
            str
                    .append("\"")
                    .append(x)
                    .append("\",");
        }
        str.setLength(str.length() - 1);
        System.out.println("JSONres" + str.toString());
        return str.toString();
    }

}
