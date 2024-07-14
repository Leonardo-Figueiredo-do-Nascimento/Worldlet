package CurrencyAPI.Currency.API.controller;

import CurrencyAPI.Currency.API.model.CreditCard;
import CurrencyAPI.Currency.API.service.CreditCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/{user_name}/cards")
public class CreditCardController {
    @Autowired
    private CreditCardService cardService;
    private final SimpleDateFormat formatter = new SimpleDateFormat("MM/yy");
    public Date convertStringToDate(String expirationDate) throws ParseException {
        return formatter.parse(expirationDate);
    }
    @PostMapping("/new-card")
    public void saveCard(@RequestBody CreditCard card){
        cardService.createCard(card);
    }
}
