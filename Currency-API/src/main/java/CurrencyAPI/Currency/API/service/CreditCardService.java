package CurrencyAPI.Currency.API.service;

import CurrencyAPI.Currency.API.model.CreditCard;
import CurrencyAPI.Currency.API.model.User;
import CurrencyAPI.Currency.API.repository.CreditCardRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CreditCardService {
    @Autowired
    private CreditCardRepository repository;
    public CreditCard createCard(CreditCard card){
        return repository.save(card);
    }
    @Transactional
    public void deleteCard(String cardNumber){
        repository.deleteByCardNumber(cardNumber);
    }
    public List<CreditCard> getAllCards(Optional<User> user){
        return repository.findAllByCardUser(user);
    }
}
