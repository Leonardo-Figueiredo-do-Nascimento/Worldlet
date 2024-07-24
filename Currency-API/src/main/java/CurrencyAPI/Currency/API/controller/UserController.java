package CurrencyAPI.Currency.API.controller;

import CurrencyAPI.Currency.API.model.User;
import CurrencyAPI.Currency.API.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
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
        if(userService.getUserByEmail(user.getEmail()).isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists with this email");
        }
        return ResponseEntity.ok(userService.createUser(user));
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> existingUser = userService.getUserByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            User storedUser = existingUser.get();
            boolean passwordMatch = storedUser.getPassword().equals(user.getPassword());
            if(passwordMatch){
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Login successful");
                response.put("user", storedUser);
                return ResponseEntity.ok(response);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
    }
}
