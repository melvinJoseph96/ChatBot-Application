package CO2015.group9.chatbot.Repositories;

import CO2015.group9.chatbot.domain.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Long>{
    Role findByTitle(String title);
}