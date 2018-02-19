package CO2015.group9.chatbot;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class IndexController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(){
        return "index.jsp";
    }

    @RequestMapping(value = "/admin", method = RequestMethod.GET)
    public String admin(Model model, String error){
        return "login.jsp";
    }

    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public String register(){
        return "register.jsp";
    }

    @RequestMapping(value = "/controlpanel", method = RequestMethod.GET)
    public String controlPanel() { return "adminPage.jsp";}

}