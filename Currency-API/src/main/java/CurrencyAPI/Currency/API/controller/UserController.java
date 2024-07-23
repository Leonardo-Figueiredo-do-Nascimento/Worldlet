package CurrencyAPI.Currency.API.controller;

import CurrencyAPI.Currency.API.model.User;
import CurrencyAPI.Currency.API.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{user_name}")
    public Optional<User> getUserData(@PathVariable("user_name") String userName){
        return userService.getUserByName(userName);
    };

    @PostMapping("/signup")
    public ResponseEntity<?> saveUser(@RequestBody User user){
        if(userService.getUserByName(user.getUserName()).isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already exists");
        }
        return ResponseEntity.ok(userService.createUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> existingUser = userService.getUserByName(user.getUserName());
        if (existingUser.isPresent()) {
            return ResponseEntity.ok("Login successful");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }
}
