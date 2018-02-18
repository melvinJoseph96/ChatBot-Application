package CO2015.group9.chatbot;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class IndexController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(){
        return "index.html";
    }

    @RequestMapping(value = "/admin", method = RequestMethod.GET)
    public String admin(){
        return "login.html";
    }

    @RequestMapping(value = "/controlpanel", method = RequestMethod.GET)
    public String controlPanel() { return "adminPage.html";}
}