package CO2015.group9.chatbot;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.json.JSONArray;
import java.util.ArrayList;

public class AdminLogicTemporaryFile {


    // Function returns an ArrayList populated with Intents
    private ArrayList<Intent> getIntents() {
        HttpResponse<JsonNode> httpResponse = null;
        ArrayList<Intent> intents = new ArrayList<>();
        ArrayList<String> names = new ArrayList<>();
        JSONArray JSONIntents;

        try {
            httpResponse = Unirest.get("https://api.dialogflow.com/v1/intents")
                .header("Authorization", "Bearer f6b365252ccc42ceaf7b5012e2945b68")
                .header("Content-Type", "application/json").asJson();
        } catch (UnirestException e) {
            System.out.println(e);
        }

        JSONIntents = httpResponse.getBody().getArray();

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
                System.out.println(e);
            }

            JSONArray JSONUserSays = httpResponseIntent
                    .getBody()
                    .getObject()
                    .getJSONArray("userSays");

            JSONArray JSONResponses = httpResponseIntent.getBody()
                    .getObject()
                    .getJSONArray("responses");

            for (int j = 0; j < JSONUserSays.length(); j++) {
                userSays.add(JSONUserSays
                        .getJSONObject(j)
                        .getJSONArray("data")
                        .getJSONObject(0)
                        .getString("text"));
            }

            for (int k = 0; k < JSONResponses.length() ; k++) {
                responses.add(httpResponseIntent
                        .getBody()
                        .getObject()
                        .getJSONArray("responses")
                        .getJSONObject(0)
                        .getJSONArray("messages")
                        .getJSONObject(0)
                        .getJSONArray("speech")
                        .getString(k));
            }

            intents.add(new Intent(name, userSays, responses));

        }
        System.out.println("");
        System.out.println("");
        return intents;
    }

    public static void main(String[] args) {
        AdminLogicTemporaryFile test = new AdminLogicTemporaryFile();
        System.out.println(test.getIntents());
    }

}
