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
    public ArrayList<Intent> getIntents(HttpServletRequest request){
        try {
            HttpResponse<JsonNode> jsonResponse = Unirest.get("https://api.dialogflow.com/v1/intents")
                    .header("Authorization", "Bearer f6b365252ccc42ceaf7b5012e2945b68")
                    .header("Content-Type", "application/json")
                    .queryString("v", "20150910")
                    .asJson();
            JSONArray ids = jsonResponse.getBody().getObject().getJSONArray("id");
            List<String> idsString = new ArrayList<>();
//            for (int i=0;i<ids.length();i++){
//                idsString.add(ids[i]);
//            }
            return null;

        } catch (UnirestException e) {
            e.printStackTrace();
            return null;
        }
    }
}
