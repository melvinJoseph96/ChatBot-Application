package CO2015.group9.chatbot

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ContextConfiguration
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.ResultActions
import org.springframework.test.web.servlet.setup.DefaultMockMvcBuilder
import org.springframework.test.web.servlet.setup.MockMvcBuilders
import org.springframework.web.context.WebApplicationContext
import org.springframework.test.context.web.WebAppConfiguration
import spock.lang.Specification;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

@ContextConfiguration
@RunWith(SpringJUnit4ClassRunner.class)
@WebMvcTest(controllers=[IndexController.class])
class ChatbotApplicationTests extends Specification {
	@Autowired
	WebApplicationContext wac

	MockMvc mockMvc
	ResultActions result



	public "smokeTest"() {
		expect:
		true == true
	}

//	@Test
//	def "Response for HTTP request '/'"() {
//		given: "the context of the controller is set up"
//		mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build()
//		when: "I do a get '/'"
//		result = this.mockMvc.perform(get('/'))
//		then: "I should see the view 'index'"
//		result.andExpect(view().name('index.html'))
//	}


}
