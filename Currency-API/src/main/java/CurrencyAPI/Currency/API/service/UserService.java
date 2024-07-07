package CurrencyAPI.Currency.API.service;

import CurrencyAPI.Currency.API.model.User;
import CurrencyAPI.Currency.API.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public void createUser(User user){
      repository.save(user);
    };

    public void deleteUser(User user){
        repository.delete(user);
    }

    public void depositUserTotalAmount(int id, float amount){
        User user = repository.findById(id).orElse(null);
        if (user != null) {
            user.setTotalAmount(user.getTotalAmount()+amount);
            repository.save(user);
        } ;
    }
    public void debitUserTotalAmount(int id, float amount){
        User user = repository.findById(id).orElse(null);
        if (user != null) {
            user.setTotalAmount(user.getTotalAmount()-amount);
            repository.save(user);
        } ;
    }
}
