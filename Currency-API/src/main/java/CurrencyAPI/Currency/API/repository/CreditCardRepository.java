package CurrencyAPI.Currency.API.repository;

import CurrencyAPI.Currency.API.model.CreditCard;
import CurrencyAPI.Currency.API.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CreditCardRepository extends JpaRepository<CreditCard,Integer> {
    List<CreditCard> findAllByCardUser(Optional<User> user);
    Optional<CreditCard> findAllByCardNumber(String cardNumber);
    void deleteByCardNumber(String cardNumber);
}
