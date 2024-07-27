package CurrencyAPI.Currency.API.controller;

import CurrencyAPI.Currency.API.model.CreditCard;
import CurrencyAPI.Currency.API.service.CreditCardService;
import CurrencyAPI.Currency.API.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/{user_name}/cards")
public class CreditCardController {
    @Autowired
    private CreditCardService cardService;
    @Autowired
    private UserService userService;
    private final SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
    private final SimpleDateFormat outputFormat = new SimpleDateFormat("MM/yy");
    public Date convertStringToDate(String expirationDate) throws ParseException {
        return formatter.parse(expirationDate);
    }
    @GetMapping
    public List<CreditCard> getCards(@PathVariable("user_name") String userName){
        List<CreditCard> cardList = cardService.getAllCards(userService.getUserByName(userName));
        for(CreditCard card : cardList){
            card.setExpirationDate(outputFormat.format(card.getCardExpirationDate()));
        }
        return cardList;
    }
    @PostMapping("/new-card")
    public ResponseEntity<String> saveCard(@RequestBody CreditCard card){
        try {
            card.setCardExpirationDate(convertStringToDate(card.getExpirationDate()));
            cardService.createCard(card);
            return ResponseEntity.ok("Card saved successfully");
        } catch (ParseException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid expiration date format");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while saving the card");
        }
    }
    @DeleteMapping("/delete-card")
    public void deleteCard(@RequestBody CreditCard card){
        cardService.deleteCard(card);
    }
}
