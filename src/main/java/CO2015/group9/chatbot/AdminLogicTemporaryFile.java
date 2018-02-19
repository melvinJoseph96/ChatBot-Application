package CO2015.group9.chatbot;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class AdminLogicTemporaryFile {


    private final String apiKey = "Bearer f6b365252ccc42ceaf7b5012e2945b68";


    private JSONObject getIntentDetails(String id) {
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


    private ArrayList<Intent> getIntents() {
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

            int responsesArrLength = 0;
            try {
                responsesArrLength = JSONResponses
                        .getJSONObject(0)
                        .getJSONArray("messages")
                        .getJSONObject(0)
                        .getJSONArray("speech")
                        .length();
            } catch (JSONException e) {
                e.printStackTrace();
            }

            for (int k = 0; k < responsesArrLength; k++) {
                try {

                    responses.add(JSONResponses
                            .getJSONObject(0)
                            .getJSONArray("messages")
                            .getJSONObject(0)
                            .getJSONArray("speech")
                            .getString(k));
                } catch (JSONException e) {
                    e.printStackTrace();
                    System.out.println("Intent has no responses");
                }
            }
            intents.add(new Intent(intentId, name, userSays, responses));
        }
        System.out.println("");
        System.out.println("");
        System.out.println("qwerty" + intents);
        System.out.println("");

        System.out.println("");

        return intents;
    }

    private void addIntent(String name) {
        try {
            HttpResponse<JsonNode> httpResponse = Unirest.post("https://api.dialogflow.com/v1/intents/")
                    .header("Authorization", apiKey)
                    .header("Content-Type", "application/json")
                    .body("{" +
                            "  \"contexts\": []," +
                            "  \"events\": []," +
                            "  \"fallbackIntent\": false," +
                            "  \"name\": \"" + name + "\"," +
                            "  \"priority\": 500000," +
                            "  \"responses\": [" +
                            "    {" +
                            "      \"action\": \"\"," +
                            "      \"affectedContexts\": []," +
                            "      \"defaultResponsePlatforms\": {}," +
                            "      \"messages\": [" +
                            "        {" +
                            "        }" +
                            "      ]," +
                            "      \"parameters\": []," +
                            "      \"resetContexts\": false" +
                            "    }" +
                            "  ]," +
                            "  \"templates\": []," +
                            "  \"userSays\": [" +
                            "    {" +
                            "      \"count\": 0," +
                            "      \"data\": [" +
                            "        {" +
                            "        }" +
                            "      ]" +
                            "    }" +
                            "  ]," +
                            "  \"webhookForSlotFilling\": false," +
                            "  \"webhookUsed\": false" +
                            "}").asJson();
        } catch (UnirestException e) {
            e.printStackTrace();
        }
    }

    private void deleteIntent(String id) {

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
        String intentName = intent.getName();
        String userSaysAsJSON = intent.getUserSaysAsJSON();
        String newResponseFormatted = ",\"" + newResponse + "\"";
        String responsesAsJSON = intent.getReponsesAsJSON();

        try {
            HttpResponse<JsonNode> httpResponse = Unirest.put("https://api.dialogflow.com/v1/intents/" + id)
                    .header("Authorization", apiKey)
                    .header("Content-Type", "application/json")
                    .body("{" +
                            "    \"name\": \"" + intentName + "\"," +
                            "    \"responses\": [" +
                            "        {" +
                            "" +
                            "            \"messages\": [" +
                            "                {" +
                            "                    \"type\": 0," +
                            "                    \"speech\": [" +
                            responsesAsJSON +
                            newResponseFormatted +
                            "                    ]" +
                            "                }" +
                            "            ]" +
                            "        }" +
                            "    ]," +
                            "    \"userSays\": [" + userSaysAsJSON + "]}").asJson();
        } catch (UnirestException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        AdminLogicTemporaryFile test = new AdminLogicTemporaryFile();
        test.getIntents();
        // test.addIntent("hbvdsafjhgfdfsghbd");
        //System.out.println(test.getIntentDetails("fa39fa7a-2737-41f9-9b72-7e26aa37ea3d"));
        // test.deleteIntent("c822f665-946c-47a1-b898-51d7351db821");
        test.addResponse("8a043471-028d-4645-af0a-55a698385337", "number 7");
    }

}
