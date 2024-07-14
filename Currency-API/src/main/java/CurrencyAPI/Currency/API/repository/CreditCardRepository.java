package CurrencyAPI.Currency.API.repository;

import CurrencyAPI.Currency.API.model.CreditCard;
import CurrencyAPI.Currency.API.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CreditCardRepository extends JpaRepository<CreditCard,Integer> {
    List<CreditCard> findAllByUserCard(Optional<User> user);
}
