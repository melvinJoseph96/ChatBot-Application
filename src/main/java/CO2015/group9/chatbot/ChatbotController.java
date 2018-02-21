package CO2015.group9.chatbot;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class ChatbotController {
    @RequestMapping(value = "/chatbot", method = RequestMethod.POST)
    public Message RetrieveMessage(@RequestBody Message m, HttpServletRequest request){
        try {
            HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.dialogflow.com/v1/query")
                    .header("Authorization", "Bearer 9f76e1d51fb84e159bff6de5bf1506dd")
                    .header("Content-Type", "application/json")
                    .queryString("v", "20150910")
                    .body("{\"lang\": \"en\",\"query\": \"" + m.getMessage() + "\",\"sessionId\": \"" + request.getSession().getId() + "\"}")
                    .asJson();
            JSONObject fulfillment = jsonResponse.getBody().getObject().getJSONObject("result").getJSONObject("fulfillment");
            String reply = fulfillment.getString("speech");
            return new Message(reply, LocalDateTime.now().toString());
        } catch (UnirestException e) {
            e.printStackTrace();
            return null;
        }
    }

    @RequestMapping(value = "/intents", method = RequestMethod.GET)
    public List<Intent> getIntents(HttpServletRequest request){
        List<Intent> intentsList = new ArrayList<>();
        try {
            HttpResponse<JsonNode> jsonResponse = Unirest.get("https://api.dialogflow.com/v1/intents")
                    .header("Authorization", "Bearer f6b365252ccc42ceaf7b5012e2945b68")
                    .header("Content-Type", "application/json")
                    .queryString("v", "20150910")
                    .asJson();
            JSONArray ids = jsonResponse.getBody().getArray();
            List<String> idsString = new ArrayList<>();
            for (int i=0;i<ids.length();i++){
                if (ids.getJSONObject(i)!=null){
                    JSONObject obj = ids.getJSONObject(i);
                    idsString.add(obj.getString("id"));
                }
            }
            for (String id: idsString){
                HttpResponse<JsonNode> responseJSON = Unirest.get("https://api.dialogflow.com/v1/intents/" + id)
                        .header("Authorization", "Bearer f6b365252ccc42ceaf7b5012e2945b68")
                        .header("Content-Type", "application/json")
                        .queryString("v", "20150910")
                        .asJson();
                JSONObject obj = responseJSON.getBody().getObject();
                String name = obj.getString("name");
                JSONArray userSays1 = obj.getJSONArray("userSays");
                ArrayList<String> userSays = new ArrayList<>();
                for (int i=0;i<userSays1.length();i++){
                    if(userSays1.getJSONObject(i)!=null){
                        JSONObject ob1 = userSays1.getJSONObject(i);
                        JSONArray arr1 = ob1.getJSONArray("data");
                        for (int j=0;j<arr1.length();j++){
                            if(arr1.getJSONObject(j)!=null){
                                JSONObject ob2 = arr1.getJSONObject(j);
                                String text = ob2.getString("text");
                                userSays.add(text);
                            }
                        }
                    }
                }
                JSONArray responses1 = obj.getJSONArray("responses");
                ArrayList<String> responses = new ArrayList<>();
                for (int j=0;j<responses1.length();j++){
                    if(responses1.getJSONObject(j)!=null){
                        JSONObject ob3 = responses1.getJSONObject(j);
                        JSONArray resp = ob3.getJSONArray("messages");
                        for (int i=0;i<resp.length();i++){
                            if(resp.getJSONObject(i)!=null){
                                JSONObject ob4 = resp.getJSONObject(i);
                                if (ob4.has("speech")){
                                    Object p = ob4.get("speech");
                                    responses.add(p.toString());
                                }
                            }
                        }
                    }
                }
                Intent intent = new Intent(name, userSays, responses);
                intentsList.add(intent);
            }
            return intentsList;

        } catch (UnirestException e) {
            e.printStackTrace();
            return null;
        }
    }
}
