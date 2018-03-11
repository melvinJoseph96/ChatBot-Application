package CO2015.group9.chatbot.Controllers;

import CO2015.group9.chatbot.AdminLogic;
import CO2015.group9.chatbot.domain.Intent;
import CO2015.group9.chatbot.domain.Message;
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

    @RequestMapping(value = "/translate", method = RequestMethod.POST)
    public String translate(@RequestBody String data) {
        JSONObject obj = new JSONObject(data);
        AdminLogic admin = new AdminLogic();
        return admin.translate(obj.getString("query"), obj.getString("source"), obj.getString("target"));
    }

    @RequestMapping(value = "/detect", method = RequestMethod.POST)
    public String detectLang(@RequestBody String message) {
        AdminLogic admin = new AdminLogic();
        return admin.detectUserLang(message);
    }

    @RequestMapping(value = "/admin/intents", method = RequestMethod.GET)
    public List<Intent> getIntents(){
        AdminLogic admin = new AdminLogic();
        return admin.getIntents();
    }

    @RequestMapping(value = "/admin/add", method = RequestMethod.POST)
    public Intent addIntent(@RequestBody String[][] data){
        AdminLogic admin = new AdminLogic();
        // put the admin inputs into arrays
        ArrayList<String> userSays = new ArrayList<>();
        for (String i : data[1]){
            userSays.add(i);
        }
        ArrayList<String> responses = new ArrayList<>();
        for (String i : data[2]){
            responses.add(i);
        }
        admin.addIntent(data[0][0],userSays,responses);
        // create a new intent from the data given by the admin
        return new Intent(data[0][0],userSays,responses);
    }

    @RequestMapping(value = "/admin/delete", method = RequestMethod.POST)
    public void deleteIntent(@RequestBody String id) {
        AdminLogic admin = new AdminLogic();
        admin.deleteIntent(id);
    }

    @RequestMapping(value = "/admin/update", method = RequestMethod.POST)
    public void updateIntent(@RequestBody String[] data ) {
        AdminLogic admin = new AdminLogic();
        String id = data[0];
        String name = data[1];
        ArrayList<String> userSays = admin.toArrayList(data[2]);
        ArrayList<String> responses = admin.toArrayList(data[3]);
        admin.updateIntent(id, name, userSays, responses);

    }
}
