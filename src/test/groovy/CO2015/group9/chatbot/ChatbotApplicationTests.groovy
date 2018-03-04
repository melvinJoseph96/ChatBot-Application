package CO2015.group9.chatbot

import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.ResultActions
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import org.springframework.test.context.web.WebAppConfiguration
import spock.lang.Specification
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view
import static org.junit.Assert.assertEquals;


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
        when: "I do a get '/intents'"
        result = this.mockMvc.perform(get('/intents'))
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
//    @Test
//    def "Response for HTTP request '/add'"() {
//        given: "the context of the controller is set up"
//        mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build()
//        data = new String[3]
//        data[0] = "a"
//        data[1] = "b"
//        data[2] = "c"
//        when: "I do a post '/add'"
//        result = this.mockMvc.perform(post('/add')
//                .contentType(MediaType.APPLICATION_JSON)
//                .content("{\"data\":" + "\""+data.toString() + "\"}"))
//        then: "The request should be successful"
//        result.andExpect(status().is2xxSuccessful())
//    }
    @Test
    def "test delete method"(){
        given: // new intent created
        AdminLogic admin = new AdminLogic()
        String name = "test"
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
}
