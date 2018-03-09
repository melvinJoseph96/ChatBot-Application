package CO2015.group9.chatbot.Repositories;

import CO2015.group9.chatbot.domain.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long>{
    User findByUsername(String username);
}