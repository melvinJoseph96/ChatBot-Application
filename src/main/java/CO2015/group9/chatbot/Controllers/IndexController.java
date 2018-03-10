package CO2015.group9.chatbot.Controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class IndexController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(){
        return "index.jsp";
    }

    @RequestMapping(value = "/admin", method = RequestMethod.GET)
    public String admin(Model model, String error){
        if(error != null){
            model.addAttribute("error", "Username or password incorrect");
        }
        return "login.jsp";
    }

    @RequestMapping(value = "/register", method = RequestMethod.GET)
    public String register(){
        return "register.jsp";
    }

    @RequestMapping(value = "/controlpanel", method = RequestMethod.GET)
    public String controlPanel() { return "adminPage.jsp";}

    @RequestMapping(value = "/gradCareers", method = RequestMethod.GET)
    public String displayGradCareers() { return "gradCareers.jsp";}

    @RequestMapping(value = "/exforcesCareers", method = RequestMethod.GET)
    public String displayExForcesCareers() { return "exforcesCareers.jsp";}

}