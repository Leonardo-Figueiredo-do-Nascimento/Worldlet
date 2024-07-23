package CurrencyAPI.Currency.API.controller;

import CurrencyAPI.Currency.API.model.CreditCard;
import CurrencyAPI.Currency.API.service.CreditCardService;
import CurrencyAPI.Currency.API.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/{user_name}/cards")
public class CreditCardController {
    @Autowired
    private CreditCardService cardService;
    @Autowired
    private UserService userService;
    private final SimpleDateFormat formatter = new SimpleDateFormat("MM/yy");
    public Date convertStringToDate(String expirationDate) throws ParseException {
        return formatter.parse(expirationDate);
    }
    @GetMapping
    public List<CreditCard> getCards(@PathVariable("user_name") String userName){
        return cardService.getAllCards(userService.getUserByName(userName));
    }
    @PostMapping("/new-card")
    public void saveCard(@RequestBody CreditCard card){
        cardService.createCard(card);
    }
    @DeleteMapping("/delete-card")
    public void deleteCard(@RequestBody CreditCard card){
        cardService.deleteCard(card);
    }
}
