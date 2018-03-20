package CO2015.group9.chatbot

import CO2015.group9.chatbot.Controllers.ChatbotController
import CO2015.group9.chatbot.Controllers.IndexController
import CO2015.group9.chatbot.domain.Intent
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.http.MediaType
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.ResultActions
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import spock.lang.Specification

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.*;


@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(controllers=[IndexController.class,ChatbotController.class])
@ContextConfiguration
class ChatbotApplicationTests extends Specification {
    @Autowired
    WebApplicationContext wac

    MockMvc mockMvc
    ResultActions result

    @Test
    def "Response for HTTP request '/'"() {
        given: "the context of the controller is set up"
        mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build()
        when: "I do a get '/'"
        result = this.mockMvc.perform(get('/'))
        then: "I should see the view 'index'"
        result.andExpect(status().isOk()).andExpect(view().name('index.jsp'))
    }

    @Test
    def "Response for HTTP request '/chatbot'"() {
        given: "The context of the controller is set up"
        mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build()
        when: "I do a post '/chatbot' with valid json message data"
        result = this.mockMvc.perform(post('/chatbot')
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"message\":\"test message\"}"))
        then: "The request should be successful"
        result.andExpect(status().is2xxSuccessful())
    }

    @Test
    def "Response for HTTP request '/admin'"() {
        given: "the context of the controller is set up"
        mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build()
        when: "I do a get '/admin'"
        result = this.mockMvc.perform(get('/admin'))
        then: "I should see the view 'login'"
        result.andExpect(status().isOk()).andExpect(view().name('login.jsp'))
    }

    @Test
    def "Response for HTTP request '/controlpanel'"() {
        given: "the context of the controller is set up"
        mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build()
        when: "I do a get '/controlpanel'"
        result = this.mockMvc.perform(get('/controlpanel'))
        then: "I should see the view 'adminPage'"
        result.andExpect(status().isOk()).andExpect(view().name('adminPage.jsp'))
    }
    @Test
    def "Response for HTTP request '/intents'"() {
        given: "The context of the controller is set up"
        mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build()
        when: "I do a get '/admin/intents'"
        result = this.mockMvc.perform(get('/admin/intents'))
        then: "The request should be successful"
        result.andExpect(status().is2xxSuccessful())
    }
    @Test
    def "Response for HTTP request '/gradCareers'"() {
        given: "the context of the controller is set up"
        mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build()
        when: "I do a get '/gradCareers'"
        result = this.mockMvc.perform(get('/gradCareers'))
        then: "I should see the view 'gradCareers'"
        result.andExpect(status().isOk()).andExpect(view().name('gradCareers.jsp'))
    }
    @Test
    def "Response for HTTP request '/exforcesCareers'"() {
        given: "the context of the controller is set up"
        mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build()
        when: "I do a get '/exforcesCareers'"
        result = this.mockMvc.perform(get('/exforcesCareers'))
        then: "I should see the view 'exforcesCareers'"
        result.andExpect(status().isOk()).andExpect(view().name('exforcesCareers.jsp'))
    }
    @Test
    def "Response for HTTP request '/faq'"() {
        given: "the context of the controller is set up"
        mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build()
        when: "I do a get '/faq'"
        result = this.mockMvc.perform(get('/faq'))
        then: "I should see the view 'faq'"
        result.andExpect(status().isOk()).andExpect(view().name('faq.jsp'))
    }

    @Test
    def "test delete method"(){
        given: // new intent created
        AdminLogic admin = new AdminLogic()
        String name = UUID.randomUUID()
        ArrayList<String> userSays = new ArrayList<>()
        ArrayList<String> responses = new ArrayList<>()
        admin.addIntent(name, userSays,responses)
        when:
        String id
        // find the intent  by getting all intents
        ArrayList<Intent> intentsbefore = admin.getIntents()
        for (int i=0;i<intentsbefore.size();i++){
            // retrieve the id
            if (intentsbefore.get(i).name == name && intentsbefore.get(i).userSays == userSays && intentsbefore.get(i).responses == responses){
                id = intentsbefore.get(i).id
            }
        }
        // delete the intent
        admin.deleteIntent(id)
        ArrayList<Intent> intentsafter = admin.getIntents()
        then: // there should be one less intent in after list
        intentsafter.size() == intentsbefore.size() - 1
    }

    @Test
    def "test add intent method"(){
        given: // given some intent details
        AdminLogic admin = new AdminLogic()
        String name = "testing"
        ArrayList<String> usersays = new ArrayList<>()
        usersays.add("test")
        ArrayList<String> responses = new ArrayList<>()
        responses.add("test")
        when: // you add a new intent
        ArrayList<Intent> before = admin.getIntents()
        admin.addIntent(name,usersays,responses)
        ArrayList<Intent> after = admin.getIntents()
        String id
        for (int i=0;i<after.size();i++){
            // retrieve the id
            if (after.get(i).name == name){
                id = after.get(i).id
            }
        }
        admin.deleteIntent(id) // make sure to remove the test intent
        then: // length of before should be one less than after
        before.size() == after.size() - 1
    }

    @Test
    @WithMockUser(roles="")
    def "Admin page without logging in"() {
        given: "the context of the controller is set up"
        mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).apply(springSecurity()).build()
        when: "I do a get '/controlpanel' as an unregistered user"
        result = this.mockMvc.perform(get('/controlpanel'))
        then: "I should not be able to access the 'adminPage.jsp' view"
        result.andExpect(status().is(403))
    }

    @Test
    @WithMockUser(roles="ADMIN")
    def "Admin page as admin"() {
        given: "the context of the controller is set up"
        mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build()
        when: "I do a get '/controlpanel'"
        result = this.mockMvc.perform(get('/controlpanel'))
        then: "I should see the view 'adminPage.jsp'"
        result.andExpect(status().isOk()).andExpect(view().name('adminPage.jsp'))
    }
    @Test
    def "testing update function for updating the userSays"(){
        given: // set up damin logic instance and set the data for the intent
        AdminLogic admin = new AdminLogic()
        String name = "test12rr"
        ArrayList<String> userSaysOld = new ArrayList<>()
        userSaysOld.add("aaa")
        ArrayList<String> responses = new ArrayList<>()
        responses.add("bbb")
        when:
        admin.addIntent(name,userSaysOld,responses)//create a new intent to manipulate
        String id
        // get the id and other details of the intent that has been stored
        ArrayList<Intent> intentsbefore = admin.getIntents()
        for (int i=0;i<intentsbefore.size();i++){
            // retrieve the id
            if (intentsbefore.get(i).name == name && intentsbefore.get(i).userSays == userSaysOld && intentsbefore.get(i).responses == responses){
                id = intentsbefore.get(i).id
            }
        }
        ArrayList<String> userSaysNew = new ArrayList<>() //change the userSays details
        userSaysNew.add("zzz")
        admin.updateIntent(id, name, userSaysNew, responses) // update the intent
        ArrayList<Intent> intentsafter = admin.getIntents()
        Intent changed
        for (int i=0; i<intentsafter.size();i++){
            if (intentsafter.get(i).name == name && intentsafter.get(i).responses == responses){
                changed = intentsafter.get(i)
            }
        }
        admin.deleteIntent(changed.id)
        then:
        changed.userSays == userSaysNew
    }

    @Test
    def "testing update function for updating the responses"(){
        given: // set up damin logic instance and set the data for the intent
        AdminLogic admin = new AdminLogic()
        String name = "test12rr"
        ArrayList<String> userSays = new ArrayList<>()
        userSays.add("aaa")
        ArrayList<String> responsesOld = new ArrayList<>()
        responsesOld.add("bbb")
        when:
        admin.addIntent(name,userSays,responsesOld)//create a new intent to manipulate
        String id
        // get the id and other details of the intent that has been stored
        ArrayList<Intent> intentsbefore = admin.getIntents()
        for (int i=0;i<intentsbefore.size();i++){
            // retrieve the id
            if (intentsbefore.get(i).name == name && intentsbefore.get(i).userSays == userSays && intentsbefore.get(i).responses == responsesOld){
                id = intentsbefore.get(i).id
            }
        }
        ArrayList<String> responsesNew = new ArrayList<>() //change the userSays details
        responsesNew.add("zzz")
        admin.updateIntent(id, name, userSays, responsesNew) // update the intent
        ArrayList<Intent> intentsafter = admin.getIntents()
        Intent changed
        for (int i=0; i<intentsafter.size();i++){
            if (intentsafter.get(i).name == name && intentsafter.get(i).userSays == userSays){
                changed = intentsafter.get(i)
            }
        }
        admin.deleteIntent(changed.id)
        then:
        changed.responses == responsesNew
    }
    @Test
    def "testing update function for updating the responses and userSays"(){
        given: // set up admin logic instance and set the data for the intent
        AdminLogic admin = new AdminLogic()
        String name = "test12rrtt"
        ArrayList<String> userSaysOld = new ArrayList<>()
        userSaysOld.add("aaa")
        ArrayList<String> responsesOld = new ArrayList<>()
        responsesOld.add("bbb")
        when:
        admin.addIntent(name,userSaysOld,responsesOld)//create a new intent to manipulate
        String id
        // get the id and other details of the intent that has been stored
        ArrayList<Intent> intentsbefore = admin.getIntents()
        for (int i=0;i<intentsbefore.size();i++){
            // retrieve the id
            if (intentsbefore.get(i).name == name && intentsbefore.get(i).userSays == userSaysOld && intentsbefore.get(i).responses == responsesOld){
                id = intentsbefore.get(i).id
            }
        }
        ArrayList<String> responsesNew = new ArrayList<>() //change the userSays details
        responsesNew.add("zzz")
        ArrayList<String> userSaysNew = new ArrayList<>() //change the userSays details
        userSaysNew.add("yyy")
        admin.updateIntent(id, name, userSaysNew, responsesNew) // update the intent
        ArrayList<Intent> intentsafter = admin.getIntents()
        Intent changed
        for (int i=0; i<intentsafter.size();i++){
            if (intentsafter.get(i).name == name){
                changed = intentsafter.get(i)
            }
        }
        admin.deleteIntent(changed.id)
        then:
        (changed.responses == responsesNew) && (changed.userSays == userSaysNew)
    }

    @Test
    def "check setId() works for an intent"(){
        given: // the data to create an intent
        String name = "test534t3"
        ArrayList<String> userSays = new ArrayList<>()
        // add some data to the userSays
        userSays.add("why work for fdm")
        ArrayList<String> responses = new ArrayList<>()
        // add some responses
        responses.add("because fdm are great")
        when:
        // create a new intent without an id
        Intent intent = new Intent(name,userSays,responses)
        intent.setId("newId") // set the id to "newId"
        then: // the id of the intent should now be "newId"
        intent.id.equals("newId")
    }

    @Test
    def "check the result of getId() returns the correct value"(){
        given:
        String id = "id111"
        String name = "test534t3"
        ArrayList<String> userSays = new ArrayList<>()
        // add some data to the userSays
        userSays.add("why work for fdm")
        ArrayList<String> responses = new ArrayList<>()
        // add some responses
        responses.add("because fdm are great")
        when:
        Intent testIntent = new Intent(id,name,userSays,responses)
        then:
        testIntent.getId().equals(id);
    }

    @Test
    def "test intent's getName() function"(){
        given:
        String id = "id132"
        String name = "nameTest"
        ArrayList<String> userSays = new ArrayList<>()
        // add some data to the userSays
        userSays.add("why work for fdm")
        ArrayList<String> responses = new ArrayList<>()
        // add some responses
        responses.add("because fdm are great")
        when: // create an intent from the data
        Intent intent = new Intent(id,name,userSays,responses)
        then: // the getName function should return the name set earlier
        intent.getName().equals(name)
    }
}
