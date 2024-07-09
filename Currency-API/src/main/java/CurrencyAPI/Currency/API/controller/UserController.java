package CurrencyAPI.Currency.API.controller;

import CurrencyAPI.Currency.API.model.User;
import CurrencyAPI.Currency.API.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/{user_name}")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public Optional<User> getUserData(@PathVariable("user_name") String userName){
        return userService.getUserByName(userName);
    };

}
