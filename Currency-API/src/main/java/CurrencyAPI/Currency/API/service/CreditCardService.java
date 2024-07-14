package CurrencyAPI.Currency.API.service;

import CurrencyAPI.Currency.API.model.CreditCard;
import CurrencyAPI.Currency.API.repository.CreditCardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class CreditCardService {

    @Autowired
    private CreditCardRepository repository;
    public CreditCard createCard(CreditCard card){
        return repository.save(card);
    }
    public void deleteCard(CreditCard card){
        repository.delete(card);
    }
}
