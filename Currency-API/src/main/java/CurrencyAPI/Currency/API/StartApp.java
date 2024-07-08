package CurrencyAPI.Currency.API;

import CurrencyAPI.Currency.API.model.User;
import CurrencyAPI.Currency.API.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class StartApp implements CommandLineRunner {

    @Autowired
    UserRepository repository;

    @Override
    public void run(String... args) throws Exception {
        User user = new User();
        user.setUserName("Testando o serv 263");
        user.setEmail("dasfda@email");
        user.setTotalAmount(4521);
        user.setPassword("saadf");
        user.setCountry("USA");
        repository.save(user);
    }
}
