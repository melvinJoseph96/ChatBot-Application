package CO2015.group9.chatbot;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Qualifier("dataSource")
    @Autowired
    DataSource dataSource;

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .formLogin()
                .loginPage("/admin")
                .loginProcessingUrl("/admin")
                .defaultSuccessUrl("/controlpanel")
                .failureUrl("/admin?error")
                .permitAll()
                .and()
                .logout()
                .invalidateHttpSession(true)
                .logoutSuccessUrl("/admin")
                .permitAll()
                .and()
                .authorizeRequests()
                .antMatchers("/controlpanel").hasAnyRole("ADMIN", "STAFF");
    }

}