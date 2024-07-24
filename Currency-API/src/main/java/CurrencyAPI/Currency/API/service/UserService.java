package CurrencyAPI.Currency.API.service;

import CurrencyAPI.Currency.API.model.User;
import CurrencyAPI.Currency.API.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository repository;
    public User createUser(User user){
      return repository.save(user);
    };

    public Optional<User> getUserByName(String username){
      return repository.findByUserName(username);
    };

    public Optional<User> getUserByEmail(String email){
        return repository.findByEmail(email);
    };

    public void deleteUser(User user){
        repository.delete(user);
    }
}
