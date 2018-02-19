package CO2015.group9.chatbot;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

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

    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public String register(){
        return "register.html";
    }
    @RequestMapping(value = "/controlpanel", method = RequestMethod.GET)
    public String controlPanel(){
        return "adminPage.html";
    }
//    @RequestMapping(value = "/controlpanel", method = RequestMethod.POST)
//    public String controlPanel(@ModelAttribute("intent") Intent intent, @RequestParam(value="id", required=false, defaultValue="-1") int id) {
//       if (id>=0){
//
//       }
//        return "adminPage.html";
//    }

}