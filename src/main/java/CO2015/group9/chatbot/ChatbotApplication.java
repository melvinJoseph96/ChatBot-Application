package CO2015.group9.chatbot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class ChatbotApplication extends WebMvcConfigurerAdapter implements CommandLineRunner {
	@Autowired UserRepository uRepo;
	@Autowired RoleRepository rRepo;
	public static void main(String[] args) {
		SpringApplication.run(ChatbotApplication.class, args);
	}

	public void run(String... args){
		rRepo.save(new Role("System Administrator"));
		rRepo.save(new Role("FDM Staff"));
		uRepo.save(new User("admin", "passwordhash", rRepo.findByTitle("System Administrator")));
	}
}
