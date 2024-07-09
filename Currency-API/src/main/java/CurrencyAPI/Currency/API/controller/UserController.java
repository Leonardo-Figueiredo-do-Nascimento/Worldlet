package CurrencyAPI.Currency.API.controller;

import CurrencyAPI.Currency.API.model.User;
import CurrencyAPI.Currency.API.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{user_name}")
    public User getUserData(@PathVariable("user_name") String userName){
        return userService.getUserByName(userName);
    };

    @PostMapping
    public void saveUser(@RequestBody User user){
        userService.createUser(user);
    }
}
