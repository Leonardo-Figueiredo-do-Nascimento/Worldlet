package CurrencyAPI.Currency.API.repository;

import CurrencyAPI.Currency.API.model.Transaction;
import CurrencyAPI.Currency.API.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction,Integer>{
    List<Transaction> findAllBySenderUser(Optional<User> user);
    List<Transaction> findBySenderUserOrRecipientUser(Optional<User> userSender,Optional<User> userRecipient);
}
