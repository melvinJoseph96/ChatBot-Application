package CO2015.group9.chatbot;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.json.JSONArray;
import org.json.JSONException;

import java.util.ArrayList;

public class AdminLogicTemporaryFile {


    private ArrayList<Intent> getIntents() {
        HttpResponse<JsonNode> httpResponse = null;
        ArrayList<Intent> intents = new ArrayList<>();
        JSONArray JSONIntents;

        try {
            httpResponse = Unirest.get("https://api.dialogflow.com/v1/intents")
                .header("Authorization", "Bearer f6b365252ccc42ceaf7b5012e2945b68")
                .header("Content-Type", "application/json").asJson();
        } catch (UnirestException e) {
            e.printStackTrace();
        }

        JSONIntents = httpResponse.getBody().getArray();
        System.out.println(JSONIntents);

        for (int i = 0; i < JSONIntents.length(); i++) {
            String name = JSONIntents.getJSONObject(i).getString("name");
            ArrayList<String> userSays = new ArrayList<>();
            ArrayList<String> responses = new ArrayList<>();
            String intentId = JSONIntents.getJSONObject(i).getString("id");
            HttpResponse<JsonNode> httpResponseIntent = null;

            try {
                httpResponseIntent = Unirest.get("https://api.dialogflow.com/v1/intents/" + intentId)
                        .header("Authorization", "Bearer f6b365252ccc42ceaf7b5012e2945b68")
                        .header("Content-Type", "application/json").asJson();
            } catch (UnirestException e) {
                e.printStackTrace();
            }

            JSONArray JSONUserSays = httpResponseIntent
                    .getBody()
                    .getObject()
                    .getJSONArray("userSays");

            JSONArray JSONResponses = httpResponseIntent.getBody()
                    .getObject()
                    .getJSONArray("responses");

            for (int j = 0; j < JSONUserSays.length(); j++) {

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

            for (int k = 0; k < JSONResponses.length() ; k++) {
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
        System.out.println(intents);
        System.out.println("");

        System.out.println("");

        return intents;
    }

    private void addIntent(String name) {
        HttpResponse<JsonNode> httpResponse;

        try {
            httpResponse = Unirest.post("https://api.dialogflow.com/v1/intents/")
                    .header("Authorization", "Bearer f6b365252ccc42ceaf7b5012e2945b68")
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

    public void deleteIntent(String id) {

        HttpResponse<JsonNode> httpResponse;

        try {
            httpResponse = Unirest.delete("https://api.dialogflow.com/v1/intents/" + id)
                    .header("Authorization", "Bearer f6b365252ccc42ceaf7b5012e2945b68")
                    .header("Content-Type", "application/json").asJson();
        } catch (UnirestException e) {
            e.printStackTrace();
        }

    }

    public void deleteIntent(Intent intent) {
        String id = intent.getId();
        HttpResponse<JsonNode> httpResponse;

        try {
            httpResponse = Unirest.post("https://api.dialogflow.com/v1/intents/" + id)
                    .header("Authorization", "Bearer f6b365252ccc42ceaf7b5012e2945b68")
                    .header("Content-Type", "application/json").asJson();
        } catch (UnirestException e) {
            e.printStackTrace();
        }
    }
    
    public static void main(String[] args) {
        AdminLogicTemporaryFile test = new AdminLogicTemporaryFile();
        System.out.println(test.getIntents());
        //test.addIntent("hbvdsafjhbd");
        test.deleteIntent("dca75cbb-eca7-4a90-8789-2c178f0f857e");
    }

}
