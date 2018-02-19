package CO2015.group9.chatbot;

import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Long>{
    public Role findByTitle(String title);
}