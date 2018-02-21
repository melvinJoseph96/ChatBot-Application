package CO2015.group9.chatbot;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
        AdminLogic admin = new AdminLogic();
        return admin.getIntents();
    }
}
